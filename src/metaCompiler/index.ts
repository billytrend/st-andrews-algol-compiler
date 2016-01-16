/// <reference path="../../typings/tsd.d.ts" />
import {VisitorPass} from "./BNFParser/AbstractManipulators/VisitorPass";
import {buildVisitor} from './BNFParser/Passes/passIndex';
import {compile} from './BNFParser/Compiler';
import {grammar} from '../meta/grammar';

var curInput = "";
var argv = {};

for (var i = 2; i < process.argv.length; i++) {
    let val = process.argv[i];
    if (/^-/.test(val)) {
        curInput = val.substring(1, val.length);
        argv[curInput] = [];
    } else {
        argv[curInput].push(val);
    }
}

if (argv.hasOwnProperty('pass')) {
    doPass(argv['pass'][0]);
}

export function logArray(arr: string[]) {
    for (var a of arr) {
        console.log(a);
    }
}

export function doPass(name: string) {
    var syntaxTree = compile(grammar);
    let visitor = buildVisitor(name);
    let visitorPass = new VisitorPass(visitor);
    visitorPass.visit(syntaxTree);
    logArray(visitor.output);
}

doPass("MakeLexerEnum");