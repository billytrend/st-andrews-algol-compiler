//  <bar> ::= |
//  <lab> ::= <
//  <rab> ::= >
//  <star> ::= *
//  <lsb> ::= [
//  <rsb> ::= ]

export var symmap: string[] = ['BAR', 'LAB', 'RAB', 'STAR', 'LSB', 'RSB', 'SC', 'ID', 'EQ', 'ESC', 'RCB', 'LCB'];
export enum SymbolType  {BAR, LAB, RAB, STAR, LSB, RSB, SC, ID, EQ, ESC, RCB, LCB }

export class LexedSymbol {
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
obj["{"] = SymbolType.LCB;
obj["}"] = SymbolType.RCB;
obj[";"] = SymbolType.SC;
obj["'"] = SymbolType.ESC;

export function lex(input: string): LexedSymbol[] {
    input = input.replace(/\s+/g, '');
    let inputArray: string[] = input.split('');
    let inputSyntax:LexedSymbol[] = [];
    let currentString = "";

    inputArray.forEach(function(cur) {
        if (obj.hasOwnProperty(cur)) {
            if (currentString.length > 0) {
                inputSyntax.push(new LexedSymbol(SymbolType.ID, currentString))
                currentString = "";
            }
            inputSyntax.push(new LexedSymbol(obj[cur], cur));
        } else {
            currentString += cur;
        }

        if (currentString == "::=") {
            inputSyntax.push(new LexedSymbol(SymbolType.EQ, currentString));
            currentString = "";
        }
    });

    if (currentString.length > 0) {
        inputSyntax.push(new LexedSymbol(SymbolType.ID, currentString))
    }

    return inputSyntax;
}
