/// <reference path="../../typings/tsd.d.ts" />

import {SalgolTerminal} from './GeneratedFiles/SalgolTerminal';
import {
    concreteTerminals, keywords, idTerminals, LexType,
    terminalType
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
let identifierRegex = /[a-zA-Z][a-zA-Z0-9\.]*/;

function getLoc(begin: number): E.SourceLocation {
    return <E.SourceLocation>{
        source: "test",
        start: { line: curLine, column: begin },
        end:  { line: curLine, column: curColumn }
    }
}
export function consumeStringFromHead(expression: string):boolean {
    if (expression === "i") {
        ;
    }
    let reg = new RegExp("^" + expression);
    let originalLength = input[curLine].length;
    input[curLine] = input[curLine].replace(reg, "");
    curColumn += originalLength - input[curLine].length;
    return input[curLine].length < originalLength;
}

var anyIdTerminal = Object.keys(idTerminals).concat(escape('.')).join("|");
var consumeWhiteSpace = consumeStringFromHead.bind(null, "\\s");
let terminalRegexes = concreteTerminals.map(function(terminal): [(string) => boolean, SalgolTerminal] {
    let regex = escape(terminal);
    if (keywords[terminal]) {
        regex = `${regex}(?!${anyIdTerminal})`;
    }

    return [consumeStringFromHead.bind(null, regex), SalgolTerminal[Constants.getEnumFromTerminal(terminal)]];
});

export function lexTerminal(): boolean {
    for (let terminal of terminalRegexes) {
        let begin = curColumn;

        if (terminal[0]()) {

            lexed.push(new SalgolSymbol(terminal[1], getLoc(begin)));
            lastSeen = terminalType(SalgolTerminal[terminal[1]]);
            return true;
        }
    }
    return false;
}

export function lexLine(): boolean {
    while (input[curLine].length > 0) {
        while (input[curLine].length > 0 && consumeWhiteSpace());
        if (!lexTerminal()) {
            console.log("Couldn't lex the head of " + input[curLine]);
            return false;
        };
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