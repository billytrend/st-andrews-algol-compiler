/// <reference path="../../../typings/main.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
var expect = chai.expect;
let escodegen = require('escodegen');
let acorn = require('acorn');
import {compile} from "../../sAlgolCompiler/Compiler";
import {simpleCompile} from "../../sAlgolCompiler/Compiler";

describe('Salgol Parser', () => {
    describe('parse', () => {

        it('should build sequence', (done) => {
            let gram = compileDefault();

            //let grammar = LeftFactoring.leftFactorGrammar(gram);
            console.log(simpleCompile([ "procedure fibpair( int n -> *int );\nif n = 1 then @1 of int[ 1,0 ] else\nif n = 2 then @1 of int[ 1,1 ] else\nif n rem 2 = 0 then\nbegin\n     let fg = fibpair( n div 2 );\n     let f = fg( 1 );\n     let g = fg( 2 );\n     let s = f * f;\n     let t = g * g;\n     @1 of int[ s + 2 * f * g,s + t ]\nend else\nbegin\n     let fg = fibpair( n - 1 );\n     @1 of int[ fg( 1 ) + fg( 2 ),fg( 1 ) ]\nend;\nprocedure fib( int n -> int );\nif n = 0 then 0 else fibpair( n )( 1 );\nfor i = 0 to 5 do write i,fib( i ),\"'n\"?" ]));



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