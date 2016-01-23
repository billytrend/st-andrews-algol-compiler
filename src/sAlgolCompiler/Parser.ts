import * as ConcreteSyntax from "./GeneratedFiles/ConcreteSyntax";
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
import {resolve} from "../metaCompiler/ResolveNonTerminal";
import {getPossibleProductions} from "../metaCompiler/ResolveNonTerminal";

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

    expect(symbol: Terminal, toBe: SalgolSymbol): boolean {
        if (!this.accept(symbol, toBe)) {
            console.log("Expected", symbol, "to be of type", toBe, ".");
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

    private whichProduction(expected:NonTerminal, symbol:ParseSymbol):Production {
        let possibleEntrys: NonTerminal[] = resolve(expected);
        for (let entry of possibleEntrys) {
            if (this.parseTable[entry.prettyValue] && this.parseTable[entry.prettyValue][symbol.value]) {
                return this.parseTable[entry.prettyValue][symbol.value];
            }

        }
        return undefined;
    }

    parse(): {} {

        return this.recogniseAndParseNonTerminal(ParseSymbol.build("<void-program>"));
    }

    parseObj(entry: NonTerminal, production: Production): {} {
        let encountered = 0;
        let className = Constants.className(entry.value, production.index);
        let obj: {} = {};
        for (let expected of production.sequence) {
            if (expected instanceof Terminal) {
                if (!this.acceptTerminal(expected)) {
                    return null;
                }
            } else if (expected instanceof NonTerminal) {
                let variableToBeFilled = Constants.nonTerminalFieldName(expected.value, encountered);
                obj[variableToBeFilled] = this.recogniseAndParseNonTerminal(expected);
                encountered++;
            }
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
        let productions: Production[] = getPossibleProductions(this.grammar.productions, nonTerm);
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
        let production: Production = this.whichProduction(expected, next);
        if (production === undefined && this.allowEmpty(expected)) {
            return {};
        }
        return this.parseObj(expected, production);
    }
}