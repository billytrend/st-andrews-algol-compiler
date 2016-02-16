/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {SalgolSymbol} from "../../sAlgolCompiler/Lexer";
import Parser from "../../sAlgolCompiler/Parser";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {SalgolTerminal} from "../../sAlgolCompiler/GeneratedFiles/SalgolTerminal";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {program} from "../../sAlgolCompiler/MakeAbstract";
import {program} from "../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";
import {program_sequence_question_mark} from "../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";
import {program} from "../../sAlgolCompiler/MakeAbstract";
var expect = chai.expect;
import escodegen = require('escodegen');

describe('Salgol Parser', () => {

    describe('parse', () => {
        it('should build sequence', (done) => {
           let gram = compileDefault();
           //let grammar = LeftFactoring.leftFactorGrammar(gram);
           let input = [

               new SalgolSymbol(SalgolTerminal.let, "let"),
               new SalgolSymbol(SalgolTerminal.a, "a"),
               new SalgolSymbol(SalgolTerminal.equals, "="),
               new SalgolSymbol(SalgolTerminal.one, "1"),
               new SalgolSymbol(SalgolTerminal.and, "and"),
               new SalgolSymbol(SalgolTerminal.one, "1"),
               new SalgolSymbol(SalgolTerminal.semi_colon, ";"),

               new SalgolSymbol(SalgolTerminal.question_mark, "?")];

           var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
           let obj = parser.parse();
           let flat = program(<program_sequence_question_mark>obj);
            //noinspection TypeScriptUnresolvedFunction
            console.log(escodegen.generate(flat.compile()));
           done();
        });

        // it('should build sequence', (done) => {
        //     let gram = compileDefault();
        //     //let grammar = LeftFactoring.leftFactorGrammar(gram);
        //     let input = [
        //
        //         new SalgolSymbol(SalgolTerminal.structure, "structure"),
        //         new SalgolSymbol(SalgolTerminal.s, "s"),
        //         new SalgolSymbol(SalgolTerminal.open_parenthesis, "("),
        //         new SalgolSymbol(SalgolTerminal.int, "int"),
        //         new SalgolSymbol(SalgolTerminal.t, "t"),
        //         new SalgolSymbol(SalgolTerminal.comma, ","),
        //         new SalgolSymbol(SalgolTerminal.u, "u"),
        //         new SalgolSymbol(SalgolTerminal.semi_colon, ";"),
        //         new SalgolSymbol(SalgolTerminal.int, "int"),
        //         new SalgolSymbol(SalgolTerminal.v, "v"),
        //         new SalgolSymbol(SalgolTerminal.close_parenthesis, ")"),
        //         new SalgolSymbol(SalgolTerminal.semi_colon, ";"),
        //
        //         new SalgolSymbol(SalgolTerminal.question_mark, "?")];
        //
        //     var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
        //     let obj = parser.parse();
        //     let flat = program(<program_sequence_question_mark>obj);
        //     done();
        // });
        //
        // it('should build sequence', (done) => {
        //     let gram = compileDefault();
        //     //let grammar = LeftFactoring.leftFactorGrammar(gram);
        //     let input = [
        //
        //
        //         new SalgolSymbol(SalgolTerminal.procedure, "procedure"),
        //         new SalgolSymbol(SalgolTerminal.p, "p"),
        //         new SalgolSymbol(SalgolTerminal.open_parenthesis, "("),
        //         new SalgolSymbol(SalgolTerminal.int, "int"),
        //         new SalgolSymbol(SalgolTerminal.n, "n"),
        //         new SalgolSymbol(SalgolTerminal.comma, ","),
        //         new SalgolSymbol(SalgolTerminal.o, "o"),
        //         new SalgolSymbol(SalgolTerminal.hyphen, "-"),
        //         new SalgolSymbol(SalgolTerminal.greater_than, ">"),
        //         new SalgolSymbol(SalgolTerminal.int, "int"),
        //         new SalgolSymbol(SalgolTerminal.close_parenthesis, ")"),
        //         new SalgolSymbol(SalgolTerminal.semi_colon, ";"),
        //         new SalgolSymbol(SalgolTerminal.n, "n"),
        //
        //         new SalgolSymbol(SalgolTerminal.question_mark, "?")];
        //
        //     var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
        //     let obj = parser.parse();
        //     let flat = program(<program_sequence_question_mark>obj);
        //     done();
        // });
    });
});