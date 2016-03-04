/// <reference path="../../../typings/tsd.d.ts" />

import chai = require('chai');
import {SalgolSymbol, SalgolLexer} from "../../sAlgolCompiler/Lexer";
import {SalgolTerminal} from "../../sAlgolCompiler/GeneratedFiles/SalgolTerminal";
var expect = chai.expect;
import escodegen = require('escodegen');
import {compile} from "../../sAlgolCompiler/Compiler";
import * as _ from 'lodash';

let tests = [
    // { input: "forward console.log(int); console.log(1)?", output: ['1'] },
    // { input: "write 2?", output: ['2'] },
    // { input: "if true then write 1 else write 2?", output: ['1'] },
    // { input: "if false then write 1 else write 2?", output: ['2'] },
    // { input: "let a = 4; a := a + 1; write a?", output: ['5'] },
    { input: "let a = 4; repeat a := a + 1 while a < 10; write a?", output: ['10'] }
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
