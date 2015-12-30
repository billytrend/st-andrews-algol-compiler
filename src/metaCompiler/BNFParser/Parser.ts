import * as Lexer from './Lexer';
import * as Parser from './Parser';

export class GrammarFeature {}

export class Grammar extends GrammarFeature {
    private _entry: string;
    productions: {} = {};

    get entry():string {
        return this._entry;
    }

    set entry(value:string) {
        this._entry = value;
    }

    addProduction(name: string, production: Production) {
        if (this.productions[name] === undefined) {
            this.productions[name] = [];
        }
        this.productions[name].push(production);
    }
}

export class Production extends GrammarFeature {
    private _sequence: GrammarFeature[];

    set sequence(value: GrammarFeature[]) {
        this._sequence = value;
    }

    get sequence():GrammarFeature[] {
        return this._sequence;
    }
}

export class MaybeObject extends Production {
    private _many: boolean = false;

    get many():boolean {
        return this._many;
    }

    set many(value:boolean) {
        this._many = value;
    }
}
export class ParseSymbol extends GrammarFeature {}

export class Terminal extends ParseSymbol {
    private _value: string;

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }
}

export class NonTerminal extends ParseSymbol {
    value: string;
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
            grammar.addProduction(productionName.value, production(input));

            let next: Lexer.LexedSymbol = input.shift();
            if (accept(next, Lexer.SymbolType.BAR)) continue;
            else if (!expect(next, Lexer.SymbolType.SC)) return null;
            else break;
        }
    }

    return grammar;
}

function production(input: Lexer.LexedSymbol[]): Production {
    let production: Production = new Production();
    production.sequence = grammarFeature(input);
    return production;
}

function grammarFeature(input: Lexer.LexedSymbol[]): GrammarFeature[] {
    let grammarFeatures: GrammarFeature[] = [];
    while (true) {
        switch (input[0].type) {
            case Lexer.SymbolType.LAB :
                grammarFeatures.push(nonTerminal(input));
                continue;
            case Lexer.SymbolType.RSB :
                return grammarFeatures;
            case Lexer.SymbolType.LSB :
                grammarFeatures.push(maybeObject(input));
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

function maybeObject(input: Lexer.LexedSymbol[]): MaybeObject {
    let maybeObject: MaybeObject = new MaybeObject();

    if (!expect(input.shift(), Lexer.SymbolType.LSB)) return null;
    maybeObject.sequence = grammarFeature(input);

    if (!expect(input.shift(), Lexer.SymbolType.RSB)) {
        return null;
    }
    if (accept(input[0], Lexer.SymbolType.STAR)) {
        input.shift();
        maybeObject.many = true;
    }
    return maybeObject;
}

function escapeSequence(input: Lexer.LexedSymbol[]): Terminal {
    if (!expect(input.shift(), Lexer.SymbolType.ESC)) return null;
    let terminal: Terminal = new Terminal();
    terminal.value = input.shift().value;

    if (!expect(input.shift(), Lexer.SymbolType.ESC)) return null;
    return terminal;
}