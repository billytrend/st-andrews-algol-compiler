/// <reference path="../../../typings/tsd.d.ts" />

import chai = require('chai');
var expect = chai.expect;
import escodegen = require('escodegen');
import {compile} from "../../sAlgolCompiler/Compiler";
import * as _ from 'lodash';

let tests = [
    { input: "write 2?", output: ['2'] },
    { input: "if true then write 1 else write 2?", output: ['1'] },
    { input: "if false then write 1 else write 2?", output: ['2'] },
    { input: "let a = 4; a := a + 1; write a?", output: ['5'] },
    { input: "let a = 4; repeat a := a + 1 while a < 10; write a?", output: ['10'] },
    { input: "let a = 4; while a < 10 do a := a + 1; write a?", output: ['10'] },
    { input: "let a = 0; repeat {write 1; a := a + 1} while a < 2 do write 2?", output: ['1', '2', '1'] },
    { input: "let a = 0; begin let a = 4; write a end; write a?", output: ['4', '0'] },
    { input: "let a = 0; { let a = 4; write a }; write a?", output: ['4', '0'] },
    { input: "let a = @ 0 of int[1,2,3,4]; write a(3)?", output: ['4'] }
];

describe('Compiler', function() {
    let oldLog = console.log;

    tests.forEach(function(test) {
        it("'" + test.input + "' executes correctly.", function() {
            let output = [];
            let program = compile([test.input]);
            console.log = function () {
                output = output.concat(_.values(arguments).map(x => x.toString()));
            };
            eval(program);
            console.log = oldLog;
            expect(program);
            expect(output).to.eql(test.output);
        });
    });
});
