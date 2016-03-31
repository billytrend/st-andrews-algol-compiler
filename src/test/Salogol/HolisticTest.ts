/// <reference path="../../../typings/main.d.ts" />

import chai = require('chai');
var expect = chai.expect;
import {compile} from "../../sAlgolCompiler/Compiler";
import * as _ from 'lodash';
import {testCases} from "./TestPrograms";


describe('Compiler', function() {
    let oldLog = console.log;

    testCases.forEach(function(test) {
        it("'" + test.input + "' executes correctly.", function() {
            let output = [];
            let program = compile([test.input]);
            console.log = function () {
                output = output.concat(_.values(arguments).map(x => x.toString()));
            };
            eval(program.generatedCode);
            console.log = oldLog;
            expect(program);
            expect(output).to.eql(test.output);
        });
    });
});
