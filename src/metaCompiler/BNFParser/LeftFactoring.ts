import {ParseSymbol} from "./Parser";
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
}

export class TreeNode {
    private _followingNodes: {} = {};

    addChild(val: ParseSymbol): TreeNode {
        if (!this.followingNodes.hasOwnProperty(val.value)) {
            this.followingNodes[val.value] = [];
        }

        let next = new TreeNode();
        this.followingNodes[val.value].push(next);
        return next;
    }

    get followingNodes():{} {
        return this._followingNodes;
    }
}

