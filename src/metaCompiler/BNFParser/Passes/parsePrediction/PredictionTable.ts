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
import {getPossibleNonTerminals} from "../../../ResolveNonTerminal";
import {extractType} from "../../../ResolveNonTerminal";
import {shouldConstrainTypes} from "../../../ResolveNonTerminal";
import {isConcrete} from "../../../TypeClasses";
import {ltEqClass} from "../../../TypeClasses";

export default class PredictionTable {

    static tried = {};
    static currentType;


    static memoize(possible: string): boolean {
        if (this.tried[possible]) {
            return true;
        } else {
            this.tried[possible] = true;
            return false;
        }
    }

    static recogniseTypeClassed(symbol: Terminal, expected: NonTerminal, table: {}, type?: string) {
        type = type ? type : extractType(expected);
        let possibles = table[expected.prettyValue];
        for (let possible in possibles) {
            let sym = ParseSymbol.build(possible);

            if (sym instanceof Terminal) {
                if (possible === symbol.value) {
                    return true;
                }
            } else if (sym instanceof NonTerminal && extractType(sym)) {
                let maybeConstrainType = ltEqClass(extractType(sym), type) ? extractType(sym) : type;
                if (this.recogniseTypeClassed(symbol, sym, table, maybeConstrainType)) {
                    return true;
                }
            } else if (sym instanceof NonTerminal && !extractType(sym)) {
                if (this.recogniseTypeClassed(symbol, sym, table)) {
                    return true;
                }
            }
        }
        return false;
    }

    static getFirstSets(productions: {}): {} {
        let out = {};
        for (let key of productions) {
            this.getFirstSet(productions, NonTerminal.build(key), out);
        }
        for (let entry in productions) {
            for (let production of productions[entry]) {
                for (let sym of production.sequence) {
                    if (sym instanceof NonTerminal && !out[sym.prettyValue]) {
                        this.getFirstSet(productions, sym, out);
                    }

                }
            }
        }
        return out;
    }

    static getFirstSet(productions: {}, entry: NonTerminal, collection: {}): void {
        let possibleNonTerminals = getPossibleNonTerminals(entry, extractType(entry));
        collection[entry.prettyValue] = this.getFirstSetIfExists(productions, possibleNonTerminals);
    }

    static getFirstSetIfExists(productions: {}, entries: NonTerminal[]): {} {
        let all: ParseSymbol[] = [];
        for (let entry of entries) {
            let theseProductions = productions[entry.prettyValue];
            if (!theseProductions) {
                continue;
            }
            all = all.concat(this.getAllMaybeFirstParseSymbols(productions, theseProductions));
        }

        let obj = {};
        for (let i of all) {
            obj[i] = true;
        }
        return obj;
    }

    static getAllMaybeFirstParseSymbols(productions: {}, productions: Production[]): ParseSymbol[] {
        let all: ParseSymbol[] = [];
        for (let prod of productions) {
            let shouldExploreUpTo = PredictionTable.firstNonMaybeEmptyIndex(productions, prod);
            let prodSeq: ParseSymbol[] = prod.sequence;
            all = all.concat(prodSeq.slice(0, shouldExploreUpTo));
        }
        return all;
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

    static allowEmpty(productions: {}, nonTerm: NonTerminal):boolean {
        let nonTerminals: NonTerminal[] = getPossibleNonTerminals(nonTerm, extractType(nonTerm));
        for (let nonTerm of nonTerminals) {
            if (!productions[nonTerm]) {
                break;
            }

            for (let production of productions[nonTerm]) {
                if (production.sequence.length === 1 && production.sequence[0] instanceof Empty) {
                    return true;
                }
            }
        }
        return false;
    }


    //static generatePredictionTable(grammar: Grammar) {
    //    var table: {} = {};
    //    for (let nonTerminalName in grammar.productions) {
    //        table[nonTerminalName] = {};
    //
    //        let latestMapping = this.doGetFirstSet(grammar.productions, ParseSymbol.build(nonTerminalName));
    //        _.extend(table, latestMapping);
    //    }
    //
    //    return table;
    //}
    //
    //
    //static stack: ParseSymbol[] = [];
    //static typeConstraintsStack: string[] = [];
    //static alreadyExploredInThisRecursion = {};
    //
    //static doGetFirstSet(productions: {}, entry: NonTerminal): {} {
    //    let result = {};
    //
    //    for (let productionIndex in productions[entry.prettyValue]) {
    //        PredictionTable.stack = [];
    //        PredictionTable.alreadyExploredInThisRecursion = {};
    //        this.typeConstraintsStack = [];
    //
    //        let production: Production = productions[entry.prettyValue][productionIndex];
    //        PredictionTable.getProductionFirstSet(productions, production);
    //
    //        for (let item of PredictionTable.stack) {
    //            if (result[item.prettyValue] ) {
    //                console.log("collision: ", item.prettyValue, productionIndex, result[item.prettyValue])
    //            }
    //            result[item.prettyValue] = productions[entry.prettyValue][productionIndex];
    //        }
    //    }
    //
    //    return {
    //        [entry.prettyValue]: result
    //    };
    //
    //}
    //
    //static getFirstSet(productions: {}, entry: NonTerminal): {} {
    //    let firstSet = {};
    //
    //    if (this.alreadyExploredInThisRecursion.hasOwnProperty(entry.prettyValue)) {
    //        return this.alreadyExploredInThisRecursion[entry.prettyValue];
    //    } else {
    //        this.alreadyExploredInThisRecursion[entry.prettyValue] = firstSet;
    //    }
    //
    //    firstSet = this.getFirstSetNonTerminal(productions, entry);
    //}
    //
    //static getFirstSetTerminal(entry: Terminal): void {
    //    this.stack.push(entry);
    //    return;
    //}
    //
    //static getFirstSetNonTerminal(productions: {}, entry: NonTerminal): {} {
    //    let shouldConstrain = shouldConstrainTypes(typeConstraint, extractType(entry));
    //
    //    if (shouldConstrain) {
    //        this.typeConstraintsStack.push(extractType(entry));
    //    }
    //
    //    let maybeTypeConstraint = this.typeConstraintsStack[this.typeConstraintsStack.length - 1];
    //    let typeConstraint = maybeTypeConstraint ? maybeTypeConstraint : extractType(entry);
    //
    //    let allNonTerms: NonTerminal[] = getPossibleNonTerminals(entry, typeConstraint);
    //
    //    for (let nonTerm of allNonTerms) {
    //        let prods = productions[nonTerm.prettyValue];
    //        if (prods) {
    //
    //            for (let prod of prods){
    //                this.getProductionFirstSet(productions, prod);
    //            }
    //
    //        }
    //    }
    //
    //    if (shouldConstrain) {
    //        this.typeConstraintsStack.pop();
    //    }
    //}
    //
    //static getProductionFirstSet(productions:{}, production:Production) {
    //}
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