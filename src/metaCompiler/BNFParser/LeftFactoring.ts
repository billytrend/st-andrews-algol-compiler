/// <reference path="../../../typings/tsd.d.ts" />

import {ParseSymbol} from "./Parser";
import {NonTerminal} from "./Parser";
import * as _ from 'lodash';
import {Grammar} from "./Parser";

export default class LeftFactoring {
    static insertSequence(nextTreeHead: TreeNode, sequence: ParseSymbol[]) {
        for (let sym of sequence) {
            nextTreeHead = nextTreeHead.addChild(sym);
        }
    }

    static isAmbiguous(nextTreeHead: TreeNode): boolean {
        for (let symbolValue in nextTreeHead.followingNodes) {
            let following: TreeNode[] = nextTreeHead.followingNodes[symbolValue];
            if (following.length > 1 || this.isAmbiguous(following[0])) {
                return true;
            }
        }
        return false;
    }

    static disambiguate(name: string, nextTreeHead: TreeNode): {} {
        let disambiguated: {} = {
            [name]: [nextTreeHead]
        };

        for (let symbolValue in nextTreeHead.followingNodes) {
            let following: TreeNode[] = nextTreeHead.followingNodes[symbolValue];

            if (following.length > 1) {
                let replacementNonTerm = new NonTerminal("disambiguated_" + symbolValue);
                let replacementNonTermNode = new TreeNode();
                let tailTree:TreeNode = new TreeNode();
                tailTree.inheritChildren(following);

                replacementNonTermNode.addChild(replacementNonTerm);
                nextTreeHead.followingNodes[symbolValue] = [replacementNonTermNode];

                let recursiveDisambiguation = this.disambiguate(replacementNonTerm.value, tailTree);
                _.extend(disambiguated, recursiveDisambiguation);
            }
        }
        return disambiguated;
    }
}

export class TreeNode {
    private _followingNodes: {} = {};
    private nodeSymbol: ParseSymbol;

    addChild(val: ParseSymbol): TreeNode {
        return this.addChildStr(val.value);
    }

    private addChildStr(str: string): TreeNode {
        return this.addChildWithNext(str, new TreeNode());
    }

    private addChildWithNext(str: string, next: (TreeNode|TreeNode[])): any {
        if (!this.followingNodes.hasOwnProperty(str)) {
            this.followingNodes[str] = [];
        }

        this.followingNodes[str] = this.followingNodes[str].concat(next);
        return next;
    }

    inheritChildren(children: TreeNode[]) {
        for (let child of children) {
            for (let childKey in child.followingNodes) {
                this.addChildWithNext(childKey, child.followingNodes[childKey]);
            }
        }
    }

    get followingNodes():{} {
        return this._followingNodes;
    }
}

