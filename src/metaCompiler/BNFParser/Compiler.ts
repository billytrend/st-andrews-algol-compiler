import * as Lexer from './Lexer';
import * as Parser from './Parser';
import {grammar} from '../../meta/grammar';

function compiler(input: string): Parser.Grammar {
    var tokens: Lexer.LexedSymbol[] = Lexer.lex(input);
    return Parser.grammar(tokens);
}

export function compile(input: string): Parser.Grammar {
    return compiler(input);
};

export function compileDefault(): Parser.Grammar {
    return compile(grammar);
};
