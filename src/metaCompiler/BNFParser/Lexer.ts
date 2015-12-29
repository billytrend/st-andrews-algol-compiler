//  <bar> ::= |
//  <lab> ::= <
//  <rab> ::= >
//  <star> ::= *
//  <lsb> ::= [
//  <rsb> ::= ]

export var symmap: string[] = ['BAR', 'LAB', 'RAB', 'STAR', 'LSB', 'RSB', 'SC', 'ID', 'EQ', 'ESC'];
export enum SymbolType  { BAR, LAB, RAB, STAR, LSB, RSB, SC, ID, EQ, ESC }

export class Symbol {
    private _type: SymbolType;
    private _value: string;

    constructor(symbol:SymbolType, value:string) {
        this._type = symbol;
        this._value = value;
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }

    get type():SymbolType {
        return this._type;
    }

    set type(value:SymbolType) {
        this._type = value;
    }
}

var obj = {};
obj["|"] = SymbolType.BAR;
obj["<"] = SymbolType.LAB;
obj[">"] = SymbolType.RAB;
obj["*"] = SymbolType.STAR;
obj["["] = SymbolType.LSB;
obj["]"] = SymbolType.RSB;
obj[";"] = SymbolType.SC;
obj["'"] = SymbolType.ESC;

export function lex(input: string): Symbol[] {
    input = input.replace(/\s+/g, '');
    let inputArray: string[] = input.split('');
    let inputSyntax:Symbol[] = [];
    let currentString = "";

    inputArray.forEach(function(cur) {
        if (obj.hasOwnProperty(cur)) {
            if (currentString.length > 0) {
                inputSyntax.push(new Symbol(SymbolType.ID, currentString))
                currentString = "";
            }
            inputSyntax.push(new Symbol(obj[cur], cur));
        } else {
            currentString += cur;
        }

        if (currentString == "::=") {
            inputSyntax.push(new Symbol(SymbolType.EQ, currentString));
            currentString = "";
        }
    });
    return inputSyntax;
}
