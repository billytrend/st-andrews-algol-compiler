
import {Grammar} from "./Parser";
import {NonTerminal} from "./Parser";
import {Production} from "./Parser";
import {ParseSymbol} from "./Parser";
import PredictionTable from "./Passes/parsePrediction/PredictionTable";
import {Empty} from "./Parser";

export class GrammarHoisting {

    static alreadyExploredInThisRecursion = {};
    static result: ParseSymbol[][] = [];

    static hoistGrammar(grammar: Grammar): void {
        let entries: string[] = Object.keys(grammar.productions);
        for (let entry of entries) {
            this.alreadyExploredInThisRecursion = {};
            this.result = [];
            let entryNonTerm: NonTerminal = NonTerminal.build(entry);
            GrammarHoisting.searchGrammar(grammar, entryNonTerm, entryNonTerm);
            GrammarHoisting.doHoist(grammar, this.result, entryNonTerm);
        }
    }

    static searchGrammar(grammar: Grammar, currentEntry: NonTerminal, initialEntry: NonTerminal): void {
        let productions: Production[] = grammar.productions[currentEntry.prettyValue];
        let toBeHoisted: ParseSymbol[][] = [];

        if (this.alreadyExploredInThisRecursion.hasOwnProperty(currentEntry.prettyValue)) {
            return;
        } else {
            this.alreadyExploredInThisRecursion[currentEntry.prettyValue] = true;
        }

        for (let productionIndex in productions) {
            let production = productions[productionIndex];
            let shouldExploreUpTo = PredictionTable.firstNonMaybeEmptyIndex(grammar.productions, production);

            if (production.sequence[shouldExploreUpTo - 1].prettyValue === initialEntry.prettyValue) {
                grammar.productions[currentEntry.prettyValue].splice(productionIndex, 1);
                production.sequence.shift();
                let newSequence = production.sequence;
                toBeHoisted.push(newSequence);

            } else if (production.sequence[shouldExploreUpTo - 1] instanceof NonTerminal) {
                GrammarHoisting.searchGrammar(grammar, production.sequence[shouldExploreUpTo - 1], initialEntry);

            }
        }
    }

    static doHoist(grammar: Grammar, sequences: ParseSymbol[][], entry: NonTerminal): void {
        let hoistEntry = new NonTerminal(entry.value + "_hoist");
        for (let production of grammar.productions[entry.prettyValue]) {
            production.sequence.splice(1, 0, hoistEntry);
        }

        for (let seq of sequences) {
            let newProduction = new Production(seq);
            grammar.addProduction(hoistEntry.prettyValue, newProduction);
        }
        grammar.addProduction(hoistEntry.prettyValue, new Production([new Empty()]));
    }
}