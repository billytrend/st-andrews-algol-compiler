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
import {Production} from "../../Parser";
import {MaybeObject} from "../../Parser";
import {NonTerminal} from "../../Parser";

export function generatePredictionTable(grammar: Grammar) {
    var tes: Map<String, Set<string>> = new Map<String,  Set<string>>();

    for (let nonTerminalName in grammar.productions) {
        for (let productionIndex in grammar.productions[nonTerminalName]) {

        }
    }
}

let firstMemoize: Map<string, Set<string>> = new Map<string, Set<string>>();

function getFirstSet(productions: {}, entry: (MaybeObject|ParseSymbol)): Set<string> {

    if (entry instanceof NonTerminal && firstMemoize.contains(entry.value)) {
        return firstMemoize.get(entry.value);
    }

    var maybeSet: Set<string> = new Set<string>();

    if (entry instanceof Terminal) {
        let theSet = new Set<string>();
        theSet.add(entry.value);
        return theSet;
    }

    else if (entry instanceof NonTerminal && productions[entry.value] !== undefined) {
        let firstSets: (production: Production) =>  Set<string>;
        firstSets = function(production: Production): Set<string> {
            let pos = 0;
            let newEntry: (ParseSymbol|MaybeObject) = production.sequence[pos];

            while (newEntry instanceof MaybeObject) {
                pos += 1;
                maybeSet = getFirstSet(productions, (<MaybeObject>newEntry).sequence[0]);
                newEntry = production.sequence[pos];
            }

            return Set.union([maybeSet, getFirstSet(productions, <ParseSymbol>newEntry)]);
        };

        let entryFirstSet: Set<string> =  Set.union((<Production[]>productions[entry.value]).map(firstSets));
        firstMemoize.put(entry.value, entryFirstSet);
        console.log(entry.value, entryFirstSet);
        return entryFirstSet;
    }
}

var syntaxTree = compile(grammar);

var lol = new NonTerminal();

for (var productionName in syntaxTree.productions) {
    var lol = new NonTerminal();
    lol.value = productionName;
    var items = getFirstSet(syntaxTree.productions, lol).items();
    console.log(productionName, " : ", items);
}
