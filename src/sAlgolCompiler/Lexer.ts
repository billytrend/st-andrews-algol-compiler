//  <bar> ::= |
//  <lab> ::= <
//  <rab> ::= >
//  <star> ::= *
//  <lsb> ::= [
//  <rsb> ::= ]

import {SalgolTerminal} from './GeneratedFiles/SalgolTerminal';
import {SalgolKeywords} from './GeneratedFiles/SalgolKeywords';
import {ASCII} from '../assorted/ASCII';

export class SalgolSymbol {
    private _type: SalgolTerminal;
    private _value: string;

    constructor(symbol:SalgolTerminal, value:string) {
        this._type = symbol;
        this._value = value;
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }

    get type():SalgolTerminal {
        return this._type;
    }

    set type(value:SalgolTerminal) {
        this._type = value;
    }
}

var delimters = {};
delimters['?'] = SalgolTerminal[ASCII['?']];
delimters['['] = SalgolTerminal[ASCII['[']];
delimters[']'] = SalgolTerminal[ASCII[']']];
delimters['('] = SalgolTerminal[ASCII['(']];
delimters[')'] = SalgolTerminal[ASCII[')']];
delimters[','] = SalgolTerminal[ASCII[',']];
delimters['*'] = SalgolTerminal[ASCII['*']];
delimters['&'] = SalgolTerminal[ASCII['&']];
delimters['@'] = SalgolTerminal[ASCII['@']];
delimters["'"] = SalgolTerminal[ASCII["'"]];
delimters['"'] = SalgolTerminal[ASCII['"']];

export function lexDelimeters(input: string): (string|SalgolSymbol)[] {
    let inputArray: string[] = input.split('');
    let output:(string|SalgolSymbol)[] = [];
    let currentString = "";

    for (var inputChar of inputArray) {
        if (/\s/.test(inputChar)) {
            if(currentString.length > 0) {
                output.push(currentString);
                currentString = "";
            }
            continue;
        }

        if (delimters.hasOwnProperty(inputChar)) {
            if (currentString.length > 0) {
                output.push(currentString);
                currentString = "";
            }
            output.push(new SalgolSymbol(delimters[inputChar], inputChar));
            continue;
        }

        currentString += inputChar;
    }

    return output;
}



export function lexKeyWordsOrIds(input: (string|SalgolSymbol)[]): SalgolSymbol[] {
    let output:SalgolSymbol[] = [];

    //for (var stringOrToken of input) {
    //    if (typeof stringOrToken === 'string') {
    //        if (SalgolKeywords.hasOwnProperty(<string>stringOrToken)) {
    //            output.push(new SalgolSymbol(SalgolKeywords[<string>stringOrToken], stringOrToken));
    //        } else {
    //            for (var char of stringOrToken.split('')) {
    //                output.push(new SalgolSymbol(SalgolKeywords[<string>stringOrToken], stringOrToken));
    //            }
    //        }
    //    } else {
    //        output.push(stringOrToken);
    //    }
    //
    //}

    return output;
}