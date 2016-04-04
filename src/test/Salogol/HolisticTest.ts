/// <reference path="../../../typings/main.d.ts" />

import chai = require('chai');
var expect = chai.expect;
import {compile} from "../../sAlgolCompiler/Compiler";
import * as _ from 'lodash';
import {testCases} from "./TestPrograms";
import {errorCases} from "./TestPrograms";


describe('Compiler', function() {
    let oldLog = console.log;

    testCases.forEach(function(test) {
        it("'" + test.input + "' executes correctly.", function() {
            let output = [];
            let program = compile([test.input]);
            console.log = function () {
                output = output.concat(_.values(arguments).map(x => x.toString()));
            };
            if (program.errors && program.errors.length > 0) {
                program.errors.map(console.error)
            }
            eval(program.generatedCode);
            console.log = oldLog;
            expect(program);
            expect(output).to.eql(test.output);
        });
    });

    errorCases.forEach(function(test) {
        it("'" + test.input + "' detects errors correctly.", function() {
            let output = [];
            let program = compile([test.input]);
            console.log = function () {
                output = output.concat(_.values(arguments).map(x => x.toString()));
            };
            expect(program.errors.length > 0).to.be.true;
        });
    });

});
