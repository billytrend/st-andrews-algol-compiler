import E = ESTree;
import * as CodeGen from "./CodeGenHelpers";
import {assignVariable, binaryOperation, operation, objectDefinition, getIdentifier, callFunc, functionDefinition, raiseToBlockStatement, getReturnStatement, getEmptyStatement, getClosure, ifElse, loop, makeBlockReturn, maybeRaiseToExpressionStatement, getArray, getNewObj, varAss, accessObject, getLiteral, getTryCatch} from "./CodeGenHelpers";
import {ContextSensitiveError} from "./ContextSensitiveError";
import * as _ from 'lodash';
import {getForLoop} from "./CodeGenHelpers";

export function mergePrograms(a: Program, b: Program): Program {
    let newProg = new Program();
    newProg.sequence.clauses = a.sequence.clauses.concat(b.sequence.clauses);
    return newProg;
}


export class AbstractSyntaxType {
    type: concrete_type;
    errors: ContextSensitiveError[] = [];
    shouldTypeCheck = true;

    compile(): any {
        return CodeGen.getConsoleLog();
    }

    addError(error: ContextSensitiveError) {
        if (!this.errors) {
            this.errors = [];
        }
        this.errors.push(error);
    }
}

export class Program extends AbstractSyntaxType {
    sequence: Sequence = new Sequence();

    compile(): E.Program {
        this.sequence.returnType = new Type(concrete_type.void);
        let program = CodeGen.getProgram([
            getTryCatch(raiseToBlockStatement([this.sequence.compile()]))
        ]);
        return program;
    }
}

export enum concrete_type {
    int, real,
    arith, string,
    ordered, bool,
    writeable, pixel, pntr, file,
    hash_pixel, hash_cpixel,
    literal, pic, image, vector,
    star_nonvoid, star_cnonvoid,
    nonvoid, void
}

//export enum type_class {
//    arith,
//    orderedis,
//    writeable,
//    literal,
//    image,
//    nonvoid,
//    vector,
//    type,
//}

export enum type_prefix { star, constant }

export class Type extends AbstractSyntaxType {
    type: concrete_type;
    constantStack: type_prefix[] = [];

    constructor(type?: concrete_type) {
        this.type = type;
    }

    equals(other: Type): boolean {
        return this.type === other.type && _.isEqual(this.constantStack, other.constantStack);
    }

    references(other: Type): boolean {
        let start = 1;
        if (this.constantStack[0] === type_prefix.constant) {
            start = 2;
        }

        if (this.constantStack.length - start != other.constantStack.length) {
            return false;
        }

        if (this.type !== other.type) {
            return false;
        }

        for (let i = start; i < this.constantStack.length; i++) {
            if (this.constantStack[i] != other.constantStack[i - start]) {
                return false;
            }
        }

        return true;
    }

    toString(): string {
        let out = "";
        for (let cons of this.constantStack) {
            if (cons === type_prefix.constant) {
                out += "c";
            } else if (cons === type_prefix.star) {
                out += "*";
            }
        }
        return out + concrete_type[this.type];
    }

    isVector(): boolean {
        return this.constantStack.indexOf(type_prefix.star) != -1;
    }

    dereference(nTimes:number): Type {
        let out = new Type(this.type);
        let offset;
        for (offset = 0; offset < this.constantStack.length; offset++) {
            if (this.constantStack[offset] == nTimes) {
                nTimes--;
            }

            if (nTimes === 0) {
                break;
            }
        }
        out.constantStack = this.constantStack.splice(offset + 1);
        return out;
    }

    reference(nTimes:number) {
        for (let i = 0; i < nTimes; i++) {
            this.constantStack.unshift(type_prefix.star);
        }
    }

    dimensions(): number {
        return this.constantStack.filter(x => x === type_prefix.star).length;
    }

    makeConstant() {
        this.constantStack.unshift(type_prefix.constant);
    }
}

export class Clause extends AbstractSyntaxType {
    returnType: Type;

    compile(): E.Expression {
        return null;
    }
}

export enum declaration_type {
    VAR_ASS, VAR_DECL, CONS_DECL, PROC, STRUCT, FORWARD
}

export class Declaration extends Clause {
    private _identifier: string;
    body: Clause;
    args: Declaration[] = [];
    declType: declaration_type;

    constructor(identifier: string, type: declaration_type, ret?:Type) {
        this.identifier = identifier;
        this.declType = type;
        this.returnType = ret;
    }

    set identifier(value:string) {
        this._identifier =  value ? value.replace(/\./g, "_") : value;
    }

    get identifier():string {
        return this._identifier;
    }

    compile(): E.Statement {
        switch (this.declType) {
            case declaration_type.VAR_ASS:
                return varAss(getIdentifier(this._identifier), this.body.compile());
            case declaration_type.VAR_DECL:
            case declaration_type.CONS_DECL:
                return assignVariable(getIdentifier(this._identifier), this.body.compile());
            case declaration_type.STRUCT:
                return objectDefinition(this._identifier, this.args.map(arg => arg._identifier));
            case declaration_type.FORWARD:
                return null;
            case declaration_type.PROC:
                let body = raiseToBlockStatement([this.body.compile()]);
                body = this.body.returnType.type !== concrete_type.void ? makeBlockReturn(body) : body;
                let la = functionDefinition(this._identifier, this.args.map(arg => arg._identifier), body);
                return la;
        }
    }
}

export class Conditional extends Clause {
    test: Clause;
    thenCl: Clause;
    elseCl: Clause;

    compile(): E.ConditionalExpression {
        return  ifElse(
            this.test.compile(),
            this.thenCl.compile(),
            this.elseCl ? this.elseCl.compile() : undefined
        );
    }
}

export class Switch extends Clause {
    arg: Clause;
    cases: [[Clause], Clause];
    defcase: Clause;

}

export class Loop extends Clause {
    first: Clause;
    test: Clause;
    last: Clause;

    compile(): E.CallExpression {
        return loop(
            this.test.compile(),
            this.first ? this.first.compile() : null,
            this.last ? this.last.compile() : null
        );
    }
}

export class ForLoop extends Clause {
    initial: Declaration;
    final: Clause;
    increment: Clause;
    body: Clause;
    
    compile() {
        return getForLoop(getIdentifier(this.initial.identifier),
            this.initial.body.compile(),
            this.final.compile(),
            this.increment.compile(),
            this.body.compile());
    }
}

export class Expression extends Clause {

}

export class Sequence extends Expression {
    clauses:Clause[] = [];

    filterEmptyClauses(): void {
        this.clauses = this.clauses.filter(x => {
            if (x instanceof Declaration && x.declType === declaration_type.FORWARD) {
                return false;
            }

            return true;
        });
    }


    compile(): E.CallExpression {
        this.filterEmptyClauses();

        let body = this.clauses.map(cl => {
            return maybeRaiseToExpressionStatement(cl.compile())
        });

        let bodyBlock = raiseToBlockStatement(body);

        if (this.returnType.type !== concrete_type.void) {
            bodyBlock = makeBlockReturn(bodyBlock);
        }

        return getClosure(bodyBlock);
    }
}

export enum operation_type {
    NOT, AND, OR, XOR,
    LT, LEQ, GT, GEQ, EQ, NEQ, IS, ISNT,
    ADD, SUB, MUL, DIV, INTDIV, MOD,
    JOIN,
    SHIFT, SCALE, ROTATE, COLOUR, TEXT,
    ROR, RAND, XOR, COPY, NAND, NOR, NOT, XNOR
}

export class Operation extends Expression {
    operator: operation_type;
    expressions: Expression[] = [];

    constructor(expressions?: Expression[], operator?: operation_type) {
        this.operator = operator;
        this.expressions = expressions ? expressions : [];
    }

    get left(): Expression {
        return this.expressions[0];
    }

    get right(): Expression {
        return this.expressions[1];
    }

    compile() {
        return operation(this.expressions.map(e => e.compile()), this.operator)
    }
}

export class Application extends Expression {
    args: Clause[] = [];
    accesses: Clause[] = [];
    identifier: string;
    applType: declaration_type;

    constructor(identifier: string) {
        this.identifier = identifier.replace(/\./g, "_");
    }

    compile(): E.Expression {
        let out;
        switch (this.applType) {
            case declaration_type.STRUCT:
                return getNewObj(getIdentifier(this.identifier), this.args.map(arg => arg.compile()));
            case declaration_type.PROC:
            case declaration_type.FORWARD:
                out = callFunc(getIdentifier(this.identifier), this.args.map(arg => arg.compile()));
            case declaration_type.VAR_DECL:
            case declaration_type.CONS_DECL:
                out = out || <E.Identifier|E.CallExpression>getIdentifier(this.identifier);
                for (let arg of this.accesses) {
                    out = callFunc(accessObject(out, getIdentifier("get")), [arg.compile()]);
                }
                return out;
        }
    }
}

export class Literal extends Expression {
    value: any;
    constructor(value: any) {
        this.value = value;
    }

    compile(): E.Literal {
        return CodeGen.getLiteral(this.value);
    }
}

export class Number extends Literal {
    value:number;

    constructor(value, isReal) {
        super(value);
        this.returnType = isReal ? new Type(concrete_type.real) : new Type(concrete_type.int);
    }
}

export class Bool extends Literal {
    value: boolean;
    returnType = new Type(concrete_type.bool);
}

export class Str extends Literal {
    value: string;
    returnType = new Type(concrete_type.string);
}

export class Pixel extends Literal {
    value: boolean;
    returnType = new Type(concrete_type.pixel);
}

export class NullFile extends Literal {
    value = null;
    returnType = new Type(concrete_type.file);
}

export class Vector extends Expression {
    values: Clause[] = [];
    lb: Clause;
    innerType: Type;

    compile(): E.NewExpression {
        return getNewObj(getIdentifier("_array"), [this.lb.compile(), getArray((this.values.map(x => x.compile())))]);
    }
}

export class Image extends Expression {
    values: Clause[] = [];
    lb: Clause;
    innerType: Type;

    compile(): E.ArrayExpression {
        return getArray([this.lb.compile()].concat(this.values.map(x => x.compile())));
    }
}

export enum write_type {

}

export class Write extends Clause {

}

//export class Assignable extends Clause {}
//
//export class Procedure extends Assignable {}
//export class Forward extends Assignable {}
//export class Vector extends Assignable {}
//export class Img extends Assignable {}
//
//export enum input_type {READ, READI, READR, READB, READS, PEEK, READ_A_LINE, READ_BYTE, READ_16, READ_32, EOF}
//export class Input extends Assignable {}