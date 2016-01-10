/// <reference path="../../../typings/tsd.d.ts" />

import {ParseSymbol} from "./Parser";
import {NonTerminal} from "./Parser";
import * as _ from 'lodash';
import {Grammar} from "./Parser";
import {Production} from "./Parser";
import {sequence} from "../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";

export default class LeftFactoring {
    static insertSequence(head: {}, sequence: ParseSymbol[]) {
        let nextHead = head;
        for (let sym of sequence) {
            if (!nextHead.hasOwnProperty(sym.value)) {
                nextHead[sym.value] = {};
            }
            nextHead = nextHead[sym.value];

        }
        return head;
    }

    static isAmbiguous(head: {}): boolean {
        for (let symbolValue in head) {
            if (Object.keys(head[symbolValue]).length > 1 || this.isAmbiguous(head[symbolValue])) {
                console.log(JSON.stringify(head[symbolValue]))

                return true;
            }
        }
        return false;
    }

    static leftFactor(name: string, head: {}): {} {

        var disambiguated: {} = {
            [name]: {}
        };

        for (let symbolValue in head) {
            let following: string[] = Object.keys(head[symbolValue]);

            if (following.length > 1) {
                var replacementNonTerm = new NonTerminal("disambiguated_" + symbolValue);
                var brokenBranch = head[symbolValue];

                head[symbolValue] = {
                    [replacementNonTerm.value]: {}
                };

                debugger;
                _.extend(disambiguated, this.leftFactor(replacementNonTerm.value, brokenBranch));
            }

            let recursiveDisambiguation = this.leftFactor(symbolValue, head[symbolValue]);
            _.extend(disambiguated[name], recursiveDisambiguation);
        }

        return disambiguated;
    }

    static convertToGrammar(head: {}): Grammar {
        let newGrammar = new Grammar();
        for (var key in head) {
            let sequences: ParseSymbol[][] = this.generateSequences(head[key]);
            let productions: Production[] = sequences.map((seq) => new Production(seq));
            productions.forEach((prod) => newGrammar.addProduction(key, prod));
        }
        return newGrammar;
    }

    static convertToTree(grammar: Grammar): {} {
        let tree = {};
        for (var key in grammar.productions) {
            let root: {} = {};
            for (var production of grammar.productions[key]) {
                this.insertSequence(root, production.sequence);
            }
            tree[key] = root;
        }
        return tree;
    }

    static generateSequences(head: {}): ParseSymbol[][] {
        let out: ParseSymbol[][] = [];
        let followingSyms: string[] = Object.keys(head);

        if (followingSyms.length == 0) {
            return [[]];
        } else {
            for (let sym of followingSyms) {
                var thisSymbol: ParseSymbol = ParseSymbol.build(sym);
                let sequences: ParseSymbol[][] = LeftFactoring.generateSequences(head[sym]);
                sequences.forEach((arr) => arr.unshift(thisSymbol));
                out = out.concat(sequences);
            }
        }
        return out;
    }

    static leftFactorGrammar(grammar: Grammar): Grammar {
        let tree: {} = this.convertToTree(grammar);
        let leftFactored: {} = {};
        for (var key in grammar.productions) {
            _.extend(leftFactored, this.leftFactor(key, tree[key]));
        }
        return this.convertToGrammar(leftFactored);
    }

    static grammarIsAmbiguous(grammar: Grammar): boolean {
        let tree: {} = this.convertToTree(grammar);
        for (var key in tree) {
            if (this.isAmbiguous(tree[key])) {
                return true;
            }
        }
        return false;
    }
}