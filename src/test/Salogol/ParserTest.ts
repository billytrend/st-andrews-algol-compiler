/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
var expect = chai.expect;
import escodegen = require('escodegen');
import acorn = require('acorn');
import {compile} from "../../sAlgolCompiler/Compiler";

describe('Salgol Parser', () => {
    describe('parse', () => {

        it('should build sequence', (done) => {
            let gram = compileDefault();

            //let grammar = LeftFactoring.leftFactorGrammar(gram);
            console.log(compile([ "write 1, 1, 1?" ]));
            //     [
            //     //"forward console.log(int);",
            //     //"console.log(1)?",
            //     // "procedure lol(int x); {let b = x+1; b}; lol(1)?"
            //     // "forward console.log(int); console.log(1); procedure lol(int a); a?"
            //     // "forward console.log(int); console.log(if ~true then {let a = 1; a} else 2)?"
            //     // "true?"
            //     // "let a = if true then {let a = 34; a} else 2?"
            //     // "procedure sin(int x ); {x}; sin(1)?",
            // ]

            // var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
            // let obj = parser.parse();
            // let flat = flatten(<program_sequence_question_mark>obj);
            // visit(flat, new ScopeChecking());
            // visit(flat, new TypeChecking());
            // visit(flat, new ErrorOutputting());
            // //noinspection TypeScriptUnresolvedFunction
            // console.log("\n\n\n",escodegen.generate(flat.compile()));
            done();
        });


        // it('should build sequence', (done) => {
        //    let gram = compileDefault();
        //    //let grammar = LeftFactoring.leftFactorGrammar(gram);
        //    let input = [
        //
        //        new SalgolSymbol(SalgolTerminal.let),
        //        new SalgolSymbol(SalgolTerminal.a),
        //        new SalgolSymbol(SalgolTerminal.equals),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.plus),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.hyphen),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.hyphen),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.asterisk),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.forward_slash),
        //        new SalgolSymbol(SalgolTerminal.one),
        //        new SalgolSymbol(SalgolTerminal.semi_colon),
        //
        //        new SalgolSymbol(SalgolTerminal.question_mark)
        //
        //    var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
        //    let obj = parser.parse();
        //    let flat = program(<program_sequence_question_mark>obj);
        //     //noinspection TypeScriptUnresolvedFunction
        //     console.log(escodegen.generate(flat.compile()));
        //    done();
        // });
        //
        // it('should build sequence', (done) => {
        //     let gram = compileDefault();
        //     //let grammar = LeftFactoring.leftFactorGrammar(gram);
        //     let input = [
        //
        //         new SalgolSymbol(SalgolTerminal.structure),
        //         new SalgolSymbol(SalgolTerminal.s),
        //         new SalgolSymbol(SalgolTerminal.open_parenthesis),
        //         new SalgolSymbol(SalgolTerminal.int),
        //         new SalgolSymbol(SalgolTerminal.t),
        //         new SalgolSymbol(SalgolTerminal.comma),
        //         new SalgolSymbol(SalgolTerminal.u),
        //         new SalgolSymbol(SalgolTerminal.comma),
        //         new SalgolSymbol(SalgolTerminal.z),
        //         new SalgolSymbol(SalgolTerminal.semi_colon),
        //         new SalgolSymbol(SalgolTerminal.int),
        //         new SalgolSymbol(SalgolTerminal.v),
        //         new SalgolSymbol(SalgolTerminal.close_parenthesis),
        //         new SalgolSymbol(SalgolTerminal.semi_colon),
        //
        //         new SalgolSymbol(SalgolTerminal.question_mark)
        //
        //     var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
        //     let obj = parser.parse();
        //     let flat = program(<program_sequence_question_mark>obj);
        //     //noinspection TypeScriptUnresolvedFunction
        //     console.log(escodegen.generate(flat.compile()));
        //     done();
        // });

        // it('should build sequence', (done) => {
        //     let gram = compileDefault();
        //     //let grammar = LeftFactoring.leftFactorGrammar(gram);
        //     let input = [
        //
        //
        //         new SalgolSymbol(SalgolTerminal.procedure),
        //         new SalgolSymbol(SalgolTerminal.p),
        //         new SalgolSymbol(SalgolTerminal.open_parenthesis),
        //         new SalgolSymbol(SalgolTerminal.int),
        //         new SalgolSymbol(SalgolTerminal.n),
        //         new SalgolSymbol(SalgolTerminal.comma),
        //         new SalgolSymbol(SalgolTerminal.o),
        //         new SalgolSymbol(SalgolTerminal.hyphen),
        //         new SalgolSymbol(SalgolTerminal.greater_than),
        //         new SalgolSymbol(SalgolTerminal.int),
        //         new SalgolSymbol(SalgolTerminal.close_parenthesis),
        //         new SalgolSymbol(SalgolTerminal.semi_colon),
        //         new SalgolSymbol(SalgolTerminal.n),
        //
        //         new SalgolSymbol(SalgolTerminal.question_mark)
        //
        //     var parser: Parser<SalgolSymbol> = new Parser<SalgolSymbol>(input, gram);
        //     let obj = parser.parse();
        //     let flat = program(<program_sequence_question_mark>obj);
        //     //noinspection TypeScriptUnresolvedFunction
        //     console.log(escodegen.generate(flat.compile()));
        //     done();
        // });
    });
});