/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {ParseSymbol, Terminal, NonTerminal, Grammar} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {VisitorPass} from "../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass";
import {ReformatBNF} from "../../metaCompiler/BNFParser/Passes/ReformatBNF";
import {GrammarHoisting} from "../../metaCompiler/BNFParser/GrammarHoisting";
import {grammar} from "../../meta/grammar";
import * as Parser from "../../metaCompiler/BNFParser/Parser";
import {lex} from "../../metaCompiler/BNFParser/Lexer";
var expect = chai.expect;

describe('New compiler test:', () => {

    describe('new', () => {

        it('should do', (done) => {
            let gram = new Grammar();

            for (let key in grammar) {
                console.log(key);
                let a = Parser.production(lex(grammar[key]), gram);
                gram.addProduction(key, a);
            }
            done();
        });
    });
});
