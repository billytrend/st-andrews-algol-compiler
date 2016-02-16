import * as ConcreteSyntax from "./GeneratedFileHelpers/CompilationOverrides";
import {Grammar} from "../metaCompiler/BNFParser/Parser";
import {Terminal} from "../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../metaCompiler/BNFParser/Parser";
import {SalgolSymbol} from "./Lexer";
import PredictionTable from "../metaCompiler/BNFParser/Passes/parsePrediction/PredictionTable";
import {ParseSymbol} from "../metaCompiler/BNFParser/Parser";
import {Production} from "../metaCompiler/BNFParser/Parser";
import {SalgolTerminal} from "./GeneratedFiles/SalgolTerminal";
import {Empty} from "../metaCompiler/BNFParser/Parser";
import {Constants} from "../metaCompiler/BNFParser/Constants";
import {program} from "./GeneratedFiles/ConcreteSyntax";
import {SalgolParseSymbol, SalgolTerminalClass} from "./GeneratedFileHelpers/SalgolParseSymbol"

export default class Parser<SalgolSymbol> {
    private _input: SalgolSymbol[];
    private _grammar: Grammar;
    private _parseTable: {};

    get parseTable():{} {
        return this._parseTable;
    }

    set parseTable(value:{}) {
        this._parseTable = value;
    }

    get grammar():Grammar {
        return this._grammar;
    }

    set grammar(value:Grammar) {
        this._grammar = value;
    }

    get input(): SalgolSymbol[] {
        return this._input;
    }

    set input(input: SalgolSymbol[]) {
        this._input = input;
    }

    constructor(input: SalgolSymbol[], grammar: Grammar) {
        this.input = input;
        this.grammar = grammar;
        this.parseTable = PredictionTable.generatePredictionTable(grammar);
    }

    expect(expected: Terminal, next: SalgolSymbol): boolean {
        if (!next) {
            console.log("[ERROR] Reached end of input.");
            return;
        } else if (!this.accept(expected, next)) {
            console.log("Could not understand", next.value, "maybe you  meant ", expected.value, ".");
            return false;
        }
        return true;
    }

    accept(symbol: Terminal, toBe: SalgolSymbol): boolean {
        if (SalgolTerminal[Constants.getEnumFromTerminal(symbol.value)] === toBe.type) {
            return true;
        }
        return false;
    }

    private recognise(expected:NonTerminal, symbol:ParseSymbol): number {
        return this.parseTable[expected.prettyValue][symbol.value];
    }

    parse(): program {

        return <program>this.recogniseAndParseNonTerminal(ParseSymbol.build("<program>"));
    }

    parseObj(entry: NonTerminal, index: number): {} {
        let encountered = 0;
        let production: Production = this.grammar.productions[entry.prettyValue][index];
        let className = Constants.className(entry.value, index, production);
        let obj: SalgolParseSymbol = new ConcreteSyntax[className]();
        for (let expected of production.sequence) {
            if (expected instanceof Terminal) {
                let next = this.input[0];
                if (!this.acceptTerminal(expected)) {
                    return null;
                }
                let variableToBeFilled = Constants.nonTerminalFieldName(Constants.getEnumFromTerminal(expected.value), encountered);
                obj[variableToBeFilled] = new SalgolTerminalClass(next);

            } else if (expected instanceof NonTerminal) {
                let variableToBeFilled = Constants.nonTerminalFieldName(expected.value, encountered);
                obj[variableToBeFilled] = this.recogniseAndParseNonTerminal(expected);
            }
            encountered++;
        }
        return obj;
    }

    acceptTerminal(expected: Terminal) {
        let next: SalgolSymbol = this.input.shift();
        if (!this.expect(expected, next)) {
            return false;
        }
        return true;
    }

    allowEmpty(nonTerm: NonTerminal):boolean {
        let productions: Production[] = this.grammar.productions[nonTerm.prettyValue];
        for (let production of productions) {
            if (production.sequence.length === 1 && production.sequence[0] instanceof Empty) {
                return true;
            }
        }
        return false;
    }

    /**
     * Takes the NonTerminal that is expected, looks up the index of the production that the next
     * symbol in input represents and parses that production.
     * @param expected
     * @returns {any}
     */
    recogniseAndParseNonTerminal(expected: NonTerminal) {
        let next: SalgolSymbol = this.input[0];
        if (!next) {
            console.log("[ERROR] Reached end of input.");
            return null;
        }
        let productionIndex: number = this.recognise(expected, next);
        if (productionIndex === undefined && this.allowEmpty(expected)) {
            return undefined;
        } else if (productionIndex === undefined) {
            console.log("error on " + expected.prettyValue);
            return null;
        }
        return this.parseObj(expected, productionIndex);
    }
}