import E = ESTree;
import * as CodeGen from "./CodeGenHelpers";
import {assignVariable} from "./CodeGenHelpers";
import {binaryOperation} from "./CodeGenHelpers";
import {operation} from "./CodeGenHelpers";
import {objectDefinition} from "./CodeGenHelpers";
import {getIdentifier} from "./CodeGenHelpers";
import {callFunc} from "./CodeGenHelpers";
import {functionDefinition} from "./CodeGenHelpers";
import {raiseToBlockStatement} from "./CodeGenHelpers";
import {getReturnStatement} from "./CodeGenHelpers";
import {ContextSensitiveError} from "./ContextSensitiveError";
import {getEmptyStatement} from "./CodeGenHelpers";
import {getClosure} from "./CodeGenHelpers";
import {ifElse} from "./CodeGenHelpers";
import {loop} from "./CodeGenHelpers";
import {makeBlockReturn} from "./CodeGenHelpers";
import {maybeRaiseToExpressionStatement} from "./CodeGenHelpers";
import {getArray} from "./CodeGenHelpers";
import {getNewObj} from "./CodeGenHelpers";
import {varAss} from "./CodeGenHelpers";
import * as _ from 'lodash';

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
            this.sequence.compile()
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
    pointerOrdinal: number = 0;
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
}

export class Clause extends AbstractSyntaxType {
    returnType: Type;

    compile(): E.Expression {
        return null;
    }
}

export enum declaration_type {
    VAR_ASS, VAR_DECL, PROC, STRUCT, FORWARD
}

export class Declaration extends Clause {
    identifier: string;
    body: Clause;
    args: Declaration[] = [];
    declType: declaration_type;
    
    constructor(identifier: string, type: declaration_type, ret?:Type) {
        this.identifier = identifier != null ? identifier.replace(/\./g, "_") : identifier;
        this.declType = type;
        this.returnType = ret;
    }

    compile(): E.Statement {
        switch (this.declType) {
            case declaration_type.VAR_ASS:
                return varAss(getIdentifier(this.identifier), this.body.compile());
            case declaration_type.VAR_DECL:
                return assignVariable(getIdentifier(this.identifier), this.body.compile());
            case declaration_type.STRUCT:
                return objectDefinition(this.identifier, this.args.map(arg => arg.identifier));
            case declaration_type.FORWARD:
                return null;
            case declaration_type.PROC:
                let body = raiseToBlockStatement([this.body.compile()]);
                body = this.body.returnType.type !== concrete_type.void ? makeBlockReturn(body) : body;
                let la = functionDefinition(this.identifier, this.args.map(arg => arg.identifier), body);
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
    identifier: string;
    applType: declaration_type;

    constructor(identifier: string) {
        this.identifier = identifier.replace(/\./g, "_");
    }

    compile(): E.Expression {
        switch (this.applType) {
            case declaration_type.PROC:
                return callFunc(getIdentifier(this.identifier), this.args.map(arg => arg.compile()));
            case declaration_type.STRUCT:
                return getNewObj(getIdentifier(this.identifier), this.args.map(arg => arg.compile()));
            case declaration_type.VAR_DECL:
                return getIdentifier(this.identifier);
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
    value: number;
    returnType = new Type(concrete_type.pixel);
}

export class NullFile extends Literal {
    value = null;
    returnType = new Type(concrete_type.file);
}

export class Vector extends Expression {
    values: Clause[] = [];
    upb: Clause;
    lb: Clause;
    innerType: Type;

    compile(): E.ArrayExpression {
        return getArray(this.values.map(x => x.compile()));
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