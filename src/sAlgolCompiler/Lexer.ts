/// <reference path="../../typings/tsd.d.ts" />

import {SalgolTerminal} from './GeneratedFiles/SalgolTerminal';
import {
    concreteTerminals, keywords, idTerminals, LexType,
    terminalType, punctuation, sort
} from "./GeneratedFiles/SalgolConcreteTerminals";
import {Constants} from "../metaCompiler/BNFParser/Constants";
import escape = require('escape-string-regexp');
import E = ESTree;

export class SalgolSymbol {
    public type: SalgolTerminal;
    public loc: E.SourceLocation;

    constructor(symbol:SalgolTerminal, loc: E.SourceLocation) {
        this.type = symbol;
        this.loc = loc;
    }

}

var input: string[];
var lexed: SalgolSymbol[];
var curLine: number;
var curColumn: number;
var lastSeen: LexType = LexType.space;

let identifierRegex = /^[a-zA-Z][a-zA-Z0-9\.]*/;
let number = /^(\+|-)?[0-9]+(\.[0-9]+)?(e[0-9]+)?/;
let punc = new RegExp(
    `^(${Object.keys(punctuation).sort(sort).map(escape).join('|')})`
);
let keyword = new RegExp(
    `^(${Object.keys(keywords).sort(sort).map(escape).join('|')})(?![a-zA-Z0-9\.])`
);
let types = "(int|real|bool|string|pixel|pic|pntr|file|#pixel|#cpixel)(?![a-zA-Z0-9\.])";
let concType = new RegExp(types);
let augTypeReg = new RegExp(`^[\\*c]*${types}`);

let whiteSpace = /\s*/

function getLoc(begin: number): E.SourceLocation {
    return <E.SourceLocation>{
        source: "test",
        start: { line: curLine, column: begin },
        end:  { line: curLine, column: curColumn }
    }
}
export function consumeStringFromHead(expression: RegExp): string {
    let match = input[curLine].match(expression);
    if (match === null) {
        return null;
    }
    curColumn += match[0].length;
    input[curLine] = input[curLine].slice(match[0].length);
    return match[0];
}

export function lexTerminal(): boolean {
    let str;
    let begin = curColumn;
    if (str = (consumeStringFromHead(keyword)||consumeStringFromHead(punc))) {
        lexed.push(new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(str)], getLoc(begin)));
    } else if (str = consumeStringFromHead(augTypeReg)) {
        let concrete = str.match(concType);
        let prefix = str.slice(0, concrete.index);
        lexed = lexed.concat(prefix.split('').map(item => {
            return new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(item[0])], getLoc(begin));
        }));
        lexed.push(new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(concrete[0])], getLoc(begin)));
    } else if (str = (consumeStringFromHead(number) || consumeStringFromHead(identifierRegex))) {
        lexed = lexed.concat(str.split('').map(item => {
            return new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(item)], getLoc(begin));
        }));
    } else {
        return false;
    }

    return true;
}

export function lexLine(): boolean {
    while (input[curLine].length > 0) {
        consumeStringFromHead(whiteSpace);
        if (!lexTerminal()) {
            console.log("Couldn't lex the head of " + input[curLine]);
            return false;
        }
    }
    return true;
};

export function lex(lines: string[]): SalgolSymbol[] {
    input = lines;
    lexed = [];
    curLine = 0;
    for (; curLine < input.length; curLine++) {
        curColumn = 0;
        lexLine();
    }
    return lexed;
}