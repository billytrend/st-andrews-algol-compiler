/// <reference path="../../../typings/main.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>
import chai = require('chai');
import {ParseSymbol} from "../../metaCompiler/BNFParser/Parser";
import {Terminal} from "../../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {Grammar} from "../../metaCompiler/BNFParser/Parser";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {VisitorPass} from "../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass";
import {ReformatBNF} from "../../metaCompiler/BNFParser/Passes/ReformatBNF";
import PredictionTable from "../../metaCompiler/BNFParser/Passes/parsePrediction/PredictionTable";
var expect = chai.expect;

describe('Prediction table tests:', () => {

    describe('table', () => {
        var g: Grammar = compileDefault();
        let lFac = LeftFactoring.leftFactorGrammar(g);

        it('should generate prediction table', (done) => {
            let table = PredictionTable.generatePredictionTable(lFac);
            done();
        });

    });
});
