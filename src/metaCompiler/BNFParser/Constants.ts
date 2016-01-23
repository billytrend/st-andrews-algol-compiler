/// <reference path="../../../typings/tsd.d.ts" />
import path = require('path');
import {ASCII} from "../../assorted/ASCII";

export class Constants {
    static compilerRoot: string = '../';

    static helperFiles: string = path.join(Constants.compilerRoot, 'GeneratedFileHelpers');
    static parserHelper: string = path.join(Constants.helperFiles, 'Parser');

    static compilerClassesModuleName: string = "SalgolTypes";
    static lexerEnumName: string = "SalgolTerminal";

    static className(name: string, index: number) {
        return this.strip(name) + index;
    }

    static  superClassName(name: string) {
        return this.strip(name);
    }

    static  terminalName(name: string, index: number) {
        return name + index;
    }

    static nonTerminalFieldName(name: string, index: number) {
        return this.strip(name) + index;
    }

    static getEnumFromTerminal(symbol: string) {
        let symbol = symbol.replace(/[ -@[-`{-~]/g, function (substring) {
            return "_" + ASCII[substring] + "_";
        });

        symbol = symbol.replace(/(_(?=_)|^_|_$)/g, "");

        return symbol.toLowerCase();
    }

    static strip(input: string): string {
        input = input.replace(/<|>/g, "")
        return input.replace(/-/g, "_")
    }
}