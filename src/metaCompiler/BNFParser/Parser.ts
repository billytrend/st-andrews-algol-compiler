import * as Lexer from './Lexer';
import * as Parser from './Parser';

export class GrammarFeature {}

export class Grammar extends GrammarFeature {
    private _entry: string;
    private _maybeIndex: number = 0;
    private _productions: {} = {};

    get maybeIndex():number {
        return this._maybeIndex;
    }

    set maybeIndex(value:number) {
        this._maybeIndex = value;
    }

    get productions():{} {
        return this._productions;
    }

    set productions(value:{}) {
        this._productions = value;
    }

    get entry():string {
        return this._entry;
    }

    set entry(value:string) {
        this._entry = value;
    }

    addProduction(name: string, production: Production) {
        if (this._productions[name] === undefined) {
            this._productions[name] = [];
        }
        this._productions[name].push(production);
    }
}

export class Production extends GrammarFeature {
    private _sequence: ParseSymbol[] = [];

    set sequence(value: ParseSymbol[]) {
        this._sequence = value;
    }

    get sequence(): ParseSymbol[] {
        return this._sequence;
    }
}

export class ParseSymbol extends GrammarFeature {
    private _value: string;

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }
}

export class Terminal extends ParseSymbol {
}

export class Empty extends ParseSymbol {
}

export class NonTerminal extends ParseSymbol {
}

function err(symbol: Lexer.LexedSymbol) {
    console.log("Unexpected: ", Lexer.symmap[symbol.type]);
}

function expect(symbol: Lexer.LexedSymbol, toBe: Lexer.SymbolType): boolean {
    if (symbol.type != toBe) {
        console.log("Expected ", Lexer.symmap[symbol.type], " to be ", Lexer.symmap[toBe], ".");
        return false;
    }
    return true;
}

function accept(symbol: Lexer.LexedSymbol, toBe: Lexer.SymbolType): boolean {
    if (symbol.type != toBe) {
        return false;
    }
    return true;
}

export function grammar(input: Lexer.LexedSymbol[]): Grammar {
    let grammar: Grammar = new Grammar();

    while (true) {
        if (input.length == 0) break;

        let productionName: NonTerminal = nonTerminal(input);

        if (grammar.entry === undefined) {
            grammar.entry = productionName.value;
        }

        if (!expect(input.shift(), Lexer.SymbolType.EQ)) {
            return null;
        }

        while (true) {
            grammar.addProduction(productionName.value, production(input, grammar));

            let next: Lexer.LexedSymbol = input.shift();
            if (accept(next, Lexer.SymbolType.BAR)) continue;
            else if (!expect(next, Lexer.SymbolType.SC)) return null;
            else break;
        }
    }

    return grammar;
}

function production(input: Lexer.LexedSymbol[], grammar: Grammar): Production {
    let production: Production = new Production();
    production.sequence = grammarFeature(input, grammar);
    return production;
}

function grammarFeature(input: Lexer.LexedSymbol[], grammar: Grammar): ParseSymbol[] {
    let grammarFeatures: ParseSymbol[] = [];
    while (true) {
        switch (input[0].type) {
            case Lexer.SymbolType.LAB :
                grammarFeatures.push(nonTerminal(input));
                continue;
            case Lexer.SymbolType.RSB :
                return grammarFeatures;
            case Lexer.SymbolType.LSB :
                grammarFeatures.push(maybeObject(input, grammar));
                continue;
            case Lexer.SymbolType.ESC:
                grammarFeatures.push(escapeSequence(input));
                continue;
            case Lexer.SymbolType.ID:
            case Lexer.SymbolType.STAR:
                grammarFeatures.push(terminal(input));
                continue;
            case Lexer.SymbolType.BAR :
            case Lexer.SymbolType.SC  :
                return grammarFeatures;
            default:
                err(input[0]);
                return null;
        }
    }
}

function terminal(input: Lexer.LexedSymbol[]): Terminal {
    //if (!expect(input[0], Lexer.SymbolType.ID)) return null;
    let term: Terminal = new Terminal();
    term.value = input.shift().value;
    return term;
}

function nonTerminal(input: Lexer.LexedSymbol[]): NonTerminal {
    let nonTerm: NonTerminal = new NonTerminal();

    if (!expect(input.shift(), Lexer.SymbolType.LAB)) return null;

    if (!expect(input[0], Lexer.SymbolType.ID)) return null;
    nonTerm.value = input.shift().value;

    if (!expect(input.shift(), Lexer.SymbolType.RAB)) return null;
    return nonTerm;
}

function maybeObject(input: Lexer.LexedSymbol[], grammar: Grammar): NonTerminal {
    let maybeReference: NonTerminal = new NonTerminal();
    maybeReference.value = "maybe" + grammar.maybeIndex;
    grammar.maybeIndex++;

    let emptyProduction: Production = new Production();
    emptyProduction.sequence.push(new Empty());
    grammar.productions[maybeReference.value] = [];
    grammar.productions[maybeReference.value].push(emptyProduction);

    let regularProduction: Production = new Production();
    if (!expect(input.shift(), Lexer.SymbolType.LSB)) return null;
    regularProduction.sequence = grammarFeature(input, grammar);

    if (!expect(input.shift(), Lexer.SymbolType.RSB)) {
        return null;
    }

    if (accept(input[0], Lexer.SymbolType.STAR)) {
        input.shift();
        regularProduction.sequence.push(maybeReference);
    }

    grammar.productions[maybeReference.value].push(regularProduction);
    console.log(grammar.productions[maybeReference.value])
    return maybeReference;
}

function escapeSequence(input: Lexer.LexedSymbol[]): Terminal {
    if (!expect(input.shift(), Lexer.SymbolType.ESC)) return null;
    let terminal: Terminal = new Terminal();
    terminal.value = input.shift().value;

    if (!expect(input.shift(), Lexer.SymbolType.ESC)) return null;
    return terminal;
}