/// <reference path="../../../typings/tsd.d.ts" />

import chai = require('chai');
import {SalgolSymbol, lex} from "../../sAlgolCompiler/Lexer";
import {SalgolTerminal} from "../../sAlgolCompiler/GeneratedFiles/SalgolTerminal";
var expect = chai.expect;
import escodegen = require('escodegen');

function checkLexed(lexed: SalgolSymbol[], expected: SalgolTerminal[]) {
    for (let i = 0; i < expected.length; i++) {
        if (expected[i] != lexed[i].type) {
            console.log("Expected", SalgolTerminal[expected[i]], "but got", SalgolTerminal[lexed[i].type]);
            return false;
        }
    }
    return true;
}

describe('Salgol Lexer', () => {

    let lexable = "let leti = 1;";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
            SalgolTerminal.let,
            SalgolTerminal.l,
            SalgolTerminal.e,
            SalgolTerminal.t,
            SalgolTerminal.i,
            SalgolTerminal.equals,
            SalgolTerminal.one,
            SalgolTerminal.semi_colon
        ])).to.be.true;
    });

    lexable = "\"abc\" ++ \"def\""
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
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
        ])).to.be.true;
    });

    lexable = "let b = on & off & off & on";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
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
        ])).to.be.true;
    });

    lexable = "discriminant := b * b - 4.0 * a * c";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
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
        ])).to.be.true;
    });

    lexable = "6 div 4 rem 2";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
            SalgolTerminal.six,
            SalgolTerminal.div,
            SalgolTerminal.four,
            SalgolTerminal.rem,
            SalgolTerminal.two
        ])).to.be.true;
    });

    lexable = "forward sin";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
            SalgolTerminal.forward,
            SalgolTerminal.s,
            SalgolTerminal.i,
            SalgolTerminal.n
        ])).to.be.true;
    });

    lexable = "c*c#pixel";
    describe('lex ${lexable}', () => {
        let res = lex([lexable]);
        expect(checkLexed(res, [
            SalgolTerminal.c,
            SalgolTerminal.asterisk,
            SalgolTerminal.c,
            SalgolTerminal.number_pixel
        ])).to.be.true;
    });

});