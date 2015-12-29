import * as Lexer from './Lexer';
import * as Parser from './Parser';

function compiler(input: string): Parser.Grammar {
    var tokens: Lexer.Symbol[] = Lexer.lex(input);
    return Parser.grammar(tokens);
}

export function compile(input: string): Parser.Grammar {
    return compiler(input);
};
