/// <reference path="../../../typings/tsd.d.ts" />
import path = require('path');

export class Constants {
    static compilerRoot: string = '../';

    static helperFiles: string = path.join(Constants.compilerRoot, 'GeneratedFileHelpers');
    static parserHelper: string = path.join(Constants.helperFiles, 'Parser');

    static compilerClassesModuleName: string = "SalgolTypes";
    static lexerEnumName: string = "SalgolTerminal";

    static  className(name: string, index: number) {
        return name + index;
    }

    static  superClassName(name: string) {
        return name;
    }

    static  terminalName(name: string, index: number) {
        return name + index;
    }

    static nonTerminalFieldName(name: string, index: number) {
        return name + index;
    }
}