/// <reference path="../../../typings/tsd.d.ts" />
import path = require('path');
import {ASCII} from "../../assorted/ASCII";
import {Production} from "./Parser";
import stringHash = require('string-hash');

export class Constants {
    static compilerRoot: string = '../';

    static helperFiles: string = path.join(Constants.compilerRoot, 'GeneratedFileHelpers');
    static parserHelper: string = path.join(Constants.helperFiles, 'Parser');

    static compilerClassesModuleName: string = "SalgolTypes";
    static lexerEnumName: string = "SalgolTerminal";

    static productionToString(production: Production) {
        return production.sequence.map(it =>
            this.getEnumFromTerminal(it.value, /([ -/:-@[-`{-~]|^[0-9])/g)).join("_");
    }

    static className(name: string, index: number, curProduction: Production) {
        return name.replace(/<|>/g, "") + "_" + this.productionToString(curProduction);
    }

    static  superClassName(name: string) {
        return this.strip(name);
    }

    static  terminalName(name: string, index: number) {
        return name + index;
    }

    static nonTerminalFieldName(name: string, index: number) {
        return this.strip(name) + "_" + index;
    }

    static hashProductions(productions: Production[]) {
        let productionString = productions.map(prod => prod.sequence.map(it => it.value)).join("");
        return stringHash(productionString).toString(36);
    }

    static getMaybeName(productions: Production[]) {
        return "maybe_" + this.hashProductions(productions);
    }

    static getEnumFromTerminal(symbol: string, regex?: RegExp) {
        regex = regex ? regex : /[ -@[-`{-~]/g;
        let symbol = symbol.replace(regex, function (substring) {
            return "_" + ASCII[substring] + "_";
        });

        symbol = symbol.replace('true', '_true_val_');
        symbol = symbol.replace('false', '_false_val_');


        symbol = symbol.replace(/(_(?=_)|^_|_$)/g, "");

        return symbol.toLowerCase();
    }

    static strip(input: string): string {
        input = input.replace(/<|>/g, "")
        return input.replace(/-/g, "_")
    }
}