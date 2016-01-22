/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {ParseSymbol, Terminal, NonTerminal, Grammar} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {VisitorPass} from "../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass";
import {ReformatBNF} from "../../metaCompiler/BNFParser/Passes/ReformatBNF";
import {GrammarHoisting} from "../../metaCompiler/BNFParser/GrammarHoisting";
var expect = chai.expect;

describe('Grammar hoisting test:', () => {

    describe('GrammarHoisting', () => {

        it('should hoist', (done) => {
            let grammar = compileDefault();
            GrammarHoisting.hoistGrammar(grammar);
            expect(grammar.productions).to.have.key('<expression_hoist>');
            expect(grammar.productions['<expression_hoist>']).to.have.lengthOf(2);
            done();
        });
    });
});
