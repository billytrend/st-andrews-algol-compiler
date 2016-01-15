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
import {proc_decl} from "../../../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";

export default class PredictionTable {
    //static firstMemoize: Map<string, ParseSymbol[]> = new Map<string, ParseSymbol[]>();
    static stack: ParseSymbol[] = [];

    static generatePredictionTable(grammar: Grammar) {
        var table: {} = {};
        for (let nonTerminalName in grammar.productions) {
            table[nonTerminalName] = {};

            for (var productionIndex in grammar.productions[nonTerminalName]) {
                let production =  grammar.productions[nonTerminalName][productionIndex];
                this.stack = [];
                this.getFirstSet(grammar.productions, production.sequence[0]);
                for (let term of this.stack) {
                    if (table[nonTerminalName][term.value] != undefined && table[nonTerminalName][term.value] != parseInt(productionIndex)) {
                        console.log('!!!!', nonTerminalName, term.value, productionIndex, "seen at", table[nonTerminalName][term.value]);
                    }
                    table[nonTerminalName][term.value] = parseInt(productionIndex);
                }
            }
        }

        return table;
    }

    static getFirstSet(productions: {}, entry: ParseSymbol) {

        if (entry instanceof Terminal) {
            this.stack.push(entry);
            return;
        }

        else if (entry instanceof NonTerminal) {
            let correspondingProductions: Production[] = productions[entry.prettyValue];

            for (var production of correspondingProductions) {
                this.getFirstSet(productions, production.sequence[0]);
            }

            let out: ParseSymbol[] = [];
            for (var item of this.stack) {
                out.push(item);
            }
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