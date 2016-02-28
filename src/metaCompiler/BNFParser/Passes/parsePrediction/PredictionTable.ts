/// <reference path="../../../../../typings/tsd.d.ts" />

import {AbstractVisitor} from "../../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../../Parser";
import {Terminal} from "../../Parser";
import {GrammarFeature} from "../../Parser";
import {compile} from "../../Compiler";
import {grammar} from "../../../../meta/grammar";
import {Map} from "../../../../assorted/Map";
import {Set} from "../../../../assorted/Set";
import {ParseSymbol} from "../../Parser";
import {NonTerminal} from "../../Parser";
import {Empty} from "../../Parser";
import {Production} from "../../Parser";
import _ = require('lodash');
import {Constants} from "../../Constants";

export default class PredictionTable {

    static generatePredictionTable(grammar: Grammar) {
        var table: {} = {};
        for (let nonTerminalName in grammar.productions) {
            table[nonTerminalName] = {};

            let latestMapping = this.doGetFirstSet(grammar.productions, ParseSymbol.build(nonTerminalName));
            _.extend(table, latestMapping);
        }

        return table;
    }

    static allowEmpty(productions: {}, nonTerm: NonTerminal):boolean {
        let productions: Production[] = productions[nonTerm.prettyValue];
        for (let production of productions) {
            if (production.sequence.length === 1 && production.sequence[0] instanceof Empty) {
                return true;
            }
        }
        return false;
    }

    static firstNonMaybeEmptyIndex(productions: {}, production: Production):number {
        for (let index in production.sequence) {
            let item = production.sequence[index];

            if (item instanceof Terminal) {
                return parseInt(index, 10) + 1;
            } else if (item instanceof NonTerminal && !PredictionTable.allowEmpty(productions, item)) {
                return parseInt(index, 10) + 1;
            }
        }
        return 1;
    }

    //static firstMemoize: Map<string, ParseSymbol[]> = new Map<string, ParseSymbol[]>();
    static stack: ParseSymbol[] = [];
    static alreadyExploredInThisRecursion = {};

    static doGetFirstSet(productions: {}, entry: NonTerminal): {} {
        let result = {};

        for (let productionIndex in productions[entry.prettyValue]) {
            PredictionTable.stack = [];
            PredictionTable.alreadyExploredInThisRecursion = {};

            let production: Production = productions[entry.prettyValue][productionIndex];
            PredictionTable.getProductionFirstSet(productions, production);

            for (let item of PredictionTable.stack) {
                result[Constants.getEnumFromTerminal(item.prettyValue)] = parseInt(productionIndex);
            }
        }

        return {
            [entry.prettyValue]: result
        };

    }

    static getFirstSet(productions: {}, entry: ParseSymbol): void {
        if (this.alreadyExploredInThisRecursion.hasOwnProperty(entry.prettyValue)) {
            return;
        } else {
            this.alreadyExploredInThisRecursion[entry.prettyValue] = true;
        }

        if (entry instanceof Terminal) {
            return this.getFirstSetTerminal(entry);
        }

        else if (entry instanceof NonTerminal) {
            return this.getFirstSetNonTerminal(productions, entry);
        }
    }

    static getFirstSetTerminal(entry: Terminal): void {
        this.stack.push(entry);
        return;
    }

    static getFirstSetNonTerminal(productions: {}, entry: ParseSymbol): void {
        let correspondingProductions:Production[] = productions[entry.prettyValue];

        for (let production of correspondingProductions) {
            this.getProductionFirstSet(productions, production);
        }
    }

    static getProductionFirstSet(productions:{}, production:Production) {
        let shouldExploreUpTo = PredictionTable.firstNonMaybeEmptyIndex(productions, production);
        for (let cur = 0; cur < shouldExploreUpTo; cur++) {
            this.getFirstSet(productions, production.sequence[cur]);
        }
    }
}



//var syntaxTree = compile(grammar);
//
//var productionNames = Object.keys(syntaxTree.productions);
//
//for (var i = 0; i < productionNames.length; i++) {
//    stack = [];
//    var productionName = productionNames[i];
//    var lol = new NonTerminal();
//    lol.prettyValue = productionName;
//    var items = getFirstSet(syntaxTree.productions, lol);
//    console.log(productionName, " : ", firstMemoize.get(productionName));
//}