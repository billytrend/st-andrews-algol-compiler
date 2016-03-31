/// <reference path="../../typings/main.d.ts" />

import {SalgolTerminal} from './generatedFiles/SalgolTerminal';
import {
    concreteTerminals, keywords, idTerminals, LexType,
    terminalType, punctuation, sort
} from "./generatedFiles/SalgolConcreteTerminals";
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
let comment = /^\!.*/;
let stringReg = /"([ -!#-&(-~]|('")|(''))*"/;
let whiteSpace = /\s*/;


export class SalgolLexer {
    input: string[];
    lexed: SalgolSymbol[];
    curLine: number;
    curColumn: number;

    getLoc(begin: number): E.SourceLocation {
        return <E.SourceLocation>{
            source: "test",
            start: { line: this.curLine, column: begin },
            end:  { line: this.curLine, column: this.curColumn }
        }
    }

    consumeStringFromHead(expression: RegExp): string {
        let match = this.input[this.curLine].match(expression);
        if (match === null) {
            return null;
        }
        this.curColumn += match[0].length;
        this.input[this.curLine] = this.input[this.curLine].slice(match[0].length);
        return match[0];
    }

    lexTerminal(): boolean {
        let str;
        let begin = this.curColumn;
        if (this.consumeStringFromHead(comment)) {

        } else if (str = (this.consumeStringFromHead(keyword)||this.consumeStringFromHead(punc))) {
            this.lexed.push(new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(str)], this.getLoc(begin)));
        } else if (str = this.consumeStringFromHead(augTypeReg)) {
            let concrete = str.match(concType);
            let prefix = str.slice(0, concrete.index);
            this.lexed = this.lexed.concat(prefix.split('').map(item => {
                return new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(item[0])], this.getLoc(begin));
            }));
            this.lexed.push(new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(concrete[0])], this.getLoc(begin)));
        } else if (str = (this.consumeStringFromHead(number) || this.consumeStringFromHead(identifierRegex))) {
            this.lexed = this.lexed.concat(str.split('').map(item => {
                return new SalgolSymbol(SalgolTerminal[Constants.getEnumFromTerminal(item)], this.getLoc(begin));
            }));
        } else {
            return false;
        }

        return true;
    }

    lexLine(): boolean {
    while (this.input[this.curLine].length > 0) {
        this.consumeStringFromHead(whiteSpace);
        if (!this.lexTerminal()) {
            break;
        }
    }
    return true;
};

    lex(): SalgolSymbol[] {
        for (; this.curLine < this.input.length; this.curLine++) {
            this.curColumn = 0;
            this.lexLine();
        }
        return this.lexed;
    }

    constructor(lines: string[]) {
        this.input = lines;
        this.lexed = [];
        this.curLine = 0;
    }
}
