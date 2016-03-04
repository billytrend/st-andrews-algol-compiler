import * as Lexer from './Lexer';
import * as Parser from './Parser';
import {grammar} from '../../meta/grammar';
import LeftFactoring from "./LeftFactoring";

function compiler(input: string): Parser.Grammar {
    var tokens: Lexer.LexedSymbol[] = Lexer.lex(input);
    return Parser.grammar(tokens);
}

export function compile(input: string): Parser.Grammar {
    return LeftFactoring.leftFactorGrammar(compiler(input));
};

export function compileDefault(): Parser.Grammar {
    return compile(grammar);
};
