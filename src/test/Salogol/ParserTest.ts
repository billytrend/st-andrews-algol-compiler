/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {SalgolSymbol} from "../../sAlgolCompiler/Lexer";
import Parser from "../../sAlgolCompiler/Parser";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {SalgolTerminal} from "../../sAlgolCompiler/GeneratedFiles/SalgolTerminal";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
var expect = chai.expect;

describe('Salgol Parser', () => {

    describe('parse', () => {
        it('should build sequence', (done) => {
            let gram = compileDefault();
            let grammar = LeftFactoring.leftFactorGrammar(gram);
            let input = [
                new SalgolSymbol(SalgolTerminal.let, "let"),
                new SalgolSymbol(SalgolTerminal.a, "a"),
                new SalgolSymbol(SalgolTerminal.equals, "="),
                new SalgolSymbol(SalgolTerminal.one, "1"),
                new SalgolSymbol(SalgolTerminal.question_mark, "?")
            ];
            var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, grammar);
            expect(parser.parse()).to.be.not.null;
            done();
        });
    });
});
