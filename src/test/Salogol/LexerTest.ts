/// <reference path="../../../typings/main.d.ts" />

import chai = require('chai');
import {SalgolSymbol, SalgolLexer} from "../../sAlgolCompiler/Lexer";
import {SalgolTerminal} from "../../sAlgolCompiler/generatedFiles/SalgolTerminal";
var expect = chai.expect;

let tests = [{ input: "1?", output: [
    SalgolTerminal.one,
    SalgolTerminal.question_mark
]},
    { input: "let leti = 1;", output: [
        SalgolTerminal.let,
        SalgolTerminal.l,
        SalgolTerminal.e,
        SalgolTerminal.t,
        SalgolTerminal.i,
        SalgolTerminal.equals,
        SalgolTerminal.one,
        SalgolTerminal.semi_colon
    ]},
    { input: "\"abc\" ++ \"def\"", output: [
        SalgolTerminal.double_quote_mark,
        SalgolTerminal.a,
        SalgolTerminal.b,
        SalgolTerminal.c,
        SalgolTerminal.double_quote_mark,
        SalgolTerminal.plus_plus,
        SalgolTerminal.double_quote_mark,
        SalgolTerminal.d,
        SalgolTerminal.e,
        SalgolTerminal.f,
        SalgolTerminal.double_quote_mark,
    ]},
    { input: "let b = on & off & off & on", output: [
        SalgolTerminal.let,
        SalgolTerminal.b,
        SalgolTerminal.equals,
        SalgolTerminal.on,
        SalgolTerminal.ampersand,
        SalgolTerminal.off,
        SalgolTerminal.ampersand,
        SalgolTerminal.off,
        SalgolTerminal.ampersand,
        SalgolTerminal.on,
    ]},
    { input: "discriminant := b * b - 4.0 * a * c", output: [
        SalgolTerminal.d,
        SalgolTerminal.i,
        SalgolTerminal.s,
        SalgolTerminal.c,
        SalgolTerminal.r,
        SalgolTerminal.i,
        SalgolTerminal.m,
        SalgolTerminal.i,
        SalgolTerminal.n,
        SalgolTerminal.a,
        SalgolTerminal.n,
        SalgolTerminal.t,
        SalgolTerminal.colon_equals,
        SalgolTerminal.b,
        SalgolTerminal.asterisk,
        SalgolTerminal.b,
        SalgolTerminal.hyphen,
        SalgolTerminal.four,
        SalgolTerminal.period,
        SalgolTerminal.zero,
        SalgolTerminal.asterisk,
        SalgolTerminal.a,
        SalgolTerminal.asterisk,
        SalgolTerminal.c,
    ]},
    { input: "6 div 4 rem 2", output: [
        SalgolTerminal.six,
        SalgolTerminal.div,
        SalgolTerminal.four,
        SalgolTerminal.rem,
        SalgolTerminal.two
    ]},
    { input: "forward sin", output: [
        SalgolTerminal.forward,
        SalgolTerminal.s,
        SalgolTerminal.i,
        SalgolTerminal.n
    ]},
    { input: "c*c#pixel", output: [
        SalgolTerminal.c,
        SalgolTerminal.asterisk,
        SalgolTerminal.c,
        SalgolTerminal.number_pixel
    ]}];

describe('Lexer', function() {
    tests.forEach(function(test) {
        it("Correctly lexes " + test.input + "'", function() {
            let lexer = new SalgolLexer([test.input]);
            let lexed = lexer.lex();
            for (let i = 0; i < test.output.length; i++) {
                if (test.output[i] != lexed[i].type) {
                    expect(SalgolTerminal[lexed[i].type]).to.equal(SalgolTerminal[test.output[i]]);
                }
            }
        });
    });
});
