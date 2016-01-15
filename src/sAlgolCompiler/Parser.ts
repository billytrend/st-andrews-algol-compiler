import * as ConcreteSyntax from "./GeneratedFiles/ConcreteSyntax";
import {Grammar} from "../metaCompiler/BNFParser/Parser";
import {Constants} from "../metaCompiler/BNFParser/Constants";
import {Terminal} from "../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../metaCompiler/BNFParser/Parser";
import {SalgolSymbol} from "./Lexer";
import PredictionTable from "../metaCompiler/BNFParser/Passes/parsePrediction/PredictionTable";

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

    expect(symbol: any, toBe: any): boolean {
        if (!this.accept(symbol, toBe)) {
            console.log("Expected", symbol, "to be of type", toBe, ".");
            return false;
        }
        return true;
    }

    accept(symbol: any, toBe: any): boolean {
        if (symbol.type === toBe) {
            return true;
        }
        return false;
    }

    private recognise(expected:NonTerminal, symbol: any): number {
        return this.parseTable[expected.prettyValue][symbol.prettyValue];
    }

    parse(): {} {

        return {};
    }

    parseObj(productionName: string, index: number): {} {
        let encountered = 0;
        let obj: {} = new ConcreteSyntax[Constants.className(productionName, index)]();
        let productionSequence = this.grammar.productions[productionName][index];
        for (let expected of productionSequence) {
            if (expected instanceof Terminal) {
                if (!this.parseTerminal(expected)) {
                    return null;
                }
            } else if (expected instanceof NonTerminal) {

            }
        }
        return {};
    }

    parseTerminal(expected: Terminal) {
        let next: SalgolSymbol = this.input.shift();
        if (!this.expect(expected, next.symbolType)) {
            return false;
        }
        return true;
    }

    parseNonTerminal(expected: NonTerminal) {
        let next: SalgolSymbol = this.input.shift();
        if (!this.expect(expected, next.symbolType)) {
            return false;
        }
        let productionIndex: number = this.recognise(expected, next);
        return this.parseObj(expected.prettyValue, productionIndex);
    }
}