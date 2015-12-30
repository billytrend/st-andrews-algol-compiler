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
import {Production} from "../../Parser";
import {Empty} from "../../Parser";
import {Production} from "../../Parser";
import {proc_decl} from "../../../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";

export function generatePredictionTable(grammar: Grammar) {
    var tes: Map<String, Set<string>> = new Map<String,  Set<string>>();

    for (let nonTerminalName in grammar.productions) {
        for (let productionIndex in grammar.productions[nonTerminalName]) {

        }
    }
}

let firstMemoize: Map<string, ParseSymbol[]> = new Map<string, ParseSymbol[]>();
let stack: ParseSymbol[] = [];

function getFirstSet(productions: {}, entry: ParseSymbol) {
    let thisStackStart: number = stack.length;

    if (entry instanceof NonTerminal && firstMemoize.contains(entry.value)) {
        return firstMemoize.get(entry.value);
    }

    else if (entry instanceof Terminal) {
        stack.push(entry);
        return;
    }

    else if (entry instanceof NonTerminal) {
        let correspondingProductions: Production[] = productions[entry.value];

        for (var production of correspondingProductions) {
            getFirstSet(productions, production.sequence[0]);
        }

        let out: ParseSymbol[] = [];
        for (var item of stack) {
            out.push(item);
        }
        firstMemoize.put(entry.value, out);
    }

}
var syntaxTree = compile(grammar);

var productionNames = Object.keys(syntaxTree.productions);

for (var i = 0; i < productionNames.length; i++) {
    stack = [];
    var productionName = productionNames[i];
    var lol = new NonTerminal();
    lol.value = productionName;
    var items = getFirstSet(syntaxTree.productions, lol);
    console.log(productionName, " : ", firstMemoize.get(productionName));
}