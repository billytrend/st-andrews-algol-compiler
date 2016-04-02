import * as ConcreteSyntax from "./generatedFileHelpers/CompilationOverrides";
import {Grammar} from "../metaCompiler/BNFParser/Parser";
import {Terminal} from "../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../metaCompiler/BNFParser/Parser";
import {SalgolSymbol} from "./Lexer";
import PredictionTable from "../metaCompiler/BNFParser/Passes/parsePrediction/PredictionTable";
import {ParseSymbol} from "../metaCompiler/BNFParser/Parser";
import {Production} from "../metaCompiler/BNFParser/Parser";
import {SalgolTerminal} from "./generatedFiles/SalgolTerminal";
import {Empty} from "../metaCompiler/BNFParser/Parser";
import {Constants} from "../metaCompiler/BNFParser/Constants";
import {program} from "./generatedFiles/ConcreteSyntax";
import {SalgolParseSymbol, SalgolTerminalClass} from "./generatedFileHelpers/SalgolParseSymbol"

export default class Parser {
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

    reachedEndOfInput() {
        throw `The input program is not complete.`
    }

    expect(expected: Terminal, next: SalgolSymbol): boolean {
        if (!next) {
            this.reachedEndOfInput();
        } else if (!this.accept(expected, next)) {
            throw `Line ${JSON.stringify(next.loc.start.line)}: Unexpected symbol of type '${SalgolTerminal[next.type]}', maybe you  meant ${expected.value}`;
        }
        return true;
    }

    accept(symbol: Terminal, toBe: SalgolSymbol): boolean {
        if (SalgolTerminal[Constants.getEnumFromTerminal(symbol.value)] === toBe.type) {
            return true;
        }
        return false;
    }

    private recognise(expected:NonTerminal, symbol: SalgolSymbol): number {
        return this.parseTable[expected.prettyValue][SalgolTerminal[symbol.type]];
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
            let next = this.input[0];

            if (expected instanceof Terminal) {
                this.acceptTerminal(expected);
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
            this.reachedEndOfInput();
        }
        let productionIndex: number = this.recognise(expected, next);
        if (productionIndex === undefined && this.allowEmpty(expected)) {
            return undefined;
        } else if (productionIndex === undefined) {
            throw `Line ${JSON.stringify(next.loc.start.line)}: '${SalgolTerminal[next.type]}' is not a recognisable way of starting a ${expected.prettyValue} production.`
        }
        return this.parseObj(expected, productionIndex);
    }
}