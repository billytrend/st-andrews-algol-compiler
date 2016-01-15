//  <bar> ::= |
//  <lab> ::= <
//  <rab> ::= >
//  <star> ::= *
//  <lsb> ::= [
//  <rsb> ::= ]

import {SalgolSymbolType} from './GeneratedFiles/SalgolSymbolType';
import {SalgolKeywords} from './GeneratedFiles/SalgolKeywords';
import {ASCII} from '../assorted/ASCII';
export class SalgolSymbol {
    private _type: SalgolSymbolType;
    private _value: string;

    constructor(symbol:SalgolSymbolType, value:string) {
        this._type = symbol;
        this._value = value;
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }

    get type():SalgolSymbolType {
        return this._type;
    }

    set type(value:SalgolSymbolType) {
        this._type = value;
    }
}

var delimters = {};
delimters['?'] = SalgolSymbolType[ASCII['?']];
delimters['['] = SalgolSymbolType[ASCII['[']];
delimters[']'] = SalgolSymbolType[ASCII[']']];
delimters['('] = SalgolSymbolType[ASCII['(']];
delimters[')'] = SalgolSymbolType[ASCII[')']];
delimters[','] = SalgolSymbolType[ASCII[',']];
delimters['*'] = SalgolSymbolType[ASCII['*']];
delimters['&'] = SalgolSymbolType[ASCII['&']];
delimters['@'] = SalgolSymbolType[ASCII['@']];
delimters["'"] = SalgolSymbolType[ASCII["'"]];
delimters['"'] = SalgolSymbolType[ASCII['"']];

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

    for (var stringOrToken of input) {
        if (typeof stringOrToken === 'string') {
            if (SalgolKeywords.hasOwnProperty(<string>stringOrToken)) {
                output.push(new SalgolSymbol(SalgolKeywords[<string>stringOrToken], stringOrToken));
            } else {
                for (var char of stringOrToken.split('')) {
                    output.push(new SalgolSymbol(SalgolKeywords[<string>stringOrToken], stringOrToken));
                }
            }
        } else {
            output.push(stringOrToken);
        }

    }

    return output;
}


console.log(lexDelimeters("let n := 0 ; let more := true let pos = vector 1::8 of 0 procedure add.a.queen ; { n := n + 1 ; pos( n ) := 1 } procedure alter if pos( n ) = 8 then begin n := n - 1 if n = 0 then more := false else alter end else pos( n ) := pos( n ) + 1 procedure cantake( int i,j -> bool ) ( pos( i ) = pos( j ) ) or ( abs( pos( i ) - pos( j ) ) = abs( i - j ) ) procedure incheck( -> bool ) begin let check := false ; let i := 1 while i < n and ~check do  begin if cantake( i,n ) do check := true  i := i + 1 end check end while more and n < 8 do  begin  add.a queen while more and incheck do alter  end if more then begin write \"The solution to the 8 queens problem is'n\" for i = 1 to 8 do write pos( i ) : 3 end else write \"No solution exists'n\"  ?  "))
