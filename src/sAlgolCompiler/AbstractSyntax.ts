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

export class AbstractSyntaxType {
    type: concrete_type;
    errors: ContextSensitiveError[] = [];x

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

export function isWithinTypeClass(cla: concrete_type, type: concrete_type): boolean {
    switch (cla) {
        case concrete_type.arith:
        case concrete_type.ordered:
        case concrete_type.writeable:
        case concrete_type.literal:
        case concrete_type.image:
        case concrete_type.nonvoid:
        case concrete_type.vector:
            return type < cla;
        default:
            return false;
    }
}


export type Type = (ConcreteType|Declaration);

export class ConcreteType extends AbstractSyntaxType {
    type: concrete_type;
    pointerOrdinal: number = 0;
    constantStack: boolean[] = [];
}


export class Clause extends AbstractSyntaxType {
    compile(): E.Expression {
        return null;
    }
}

export enum declaration_type {
    VAR, PROC, STRUCT, FORWARD
}

export class Declaration extends Clause {
    identifier: string;
    body: Clause;
    args: Declaration[] = [];
    returnType: Type;
    declType: declaration_type;

    constructor(identifier: string, type: declaration_type) {
        this.identifier = identifier;
        this.declType = type;
    }

    compile(): E.Statement {
        switch (this.declType) {
            case declaration_type.VAR:
                return assignVariable(getIdentifier(this.identifier), this.body.compile());
            case declaration_type.STRUCT:
                return objectDefinition(this.identifier, this.args.map(arg => arg.identifier));
            case declaration_type.FORWARD:
                return null;
            case declaration_type.PROC:
                let body = this.body.compile();
                let la = functionDefinition(this.identifier, this.args.map(arg => arg.identifier), raiseToBlockStatement([body]));
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
            this.first ? raiseToBlockStatement([this.first.compile()]) : null,
            this.last ? raiseToBlockStatement([this.last.compile()])  : null
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

        let bodyBlock = makeBlockReturn(raiseToBlockStatement(body));

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

function getOpResultType(left: Clause, op: operation_type, right?: Clause): concrete_type {
    switch (op) {
        case operation_type.AND:
        case operation_type.OR:
        case operation_type.XOR:
            if (left.type === right.type === concrete_type.bool) {
                return concrete_type.bool;
            }
            return null;
        case operation_type.NOT:
            if (left.type === concrete_type.bool) {
                return concrete_type.bool;
            }
            return null;
        case operation_type.LT:
        case operation_type.LEQ:
        case operation_type.GT:
        case operation_type.GEQ:
            if (!isWithinTypeClass(concrete_type.nonvoid, left.type)) {
                return null;
            }
        case operation_type.EQ:
        case operation_type.NEQ:
            if (!isWithinTypeClass(concrete_type.ordered, left.type)) {
                return null;
            }

            if (left.type === right.type) {
                return concrete_type.bool;
            }

            return null;
        case operation_type.IS:
        case operation_type.ISNT:
            if (left.type === concrete_type.pntr &&
                right instanceof Application){ //TODO
            }
        case operation_type.ADD:
        case operation_type.SUB:
        case operation_type.MUL:
        case operation_type.DIV:
        case operation_type.INTDIV:
        case operation_type.MOD:
        case operation_type.JOIN:
        case operation_type.SHIFT:
        case operation_type.SCALE:
        case operation_type.ROTATE:
        case operation_type.COLOUR:
        case operation_type.TEXT:
        case operation_type.ROR:
        case operation_type.RAND:
        case operation_type.XOR:
        case operation_type.COPY:
        case operation_type.NAND:
        case operation_type.NOR:
        case operation_type.NOT:
        case operation_type.XNOR:
    }
}

export class Operation extends Expression {
    operator: operation_type;
    expressions: Expression[] = [];

    constructor(expressions?: Expression[], operator?: operation_type) {
        this.operator = operator;
        this.expressions = expressions ? expressions : [];
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
        this.identifier = identifier;
    }

    compile(): E.Expression {
        switch (this.applType) {
            case declaration_type.PROC:
            case declaration_type.STRUCT:
                return callFunc(getIdentifier(this.identifier), this.args.map(arg => arg.compile()));
            case declaration_type.VAR:
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

    get isReal():boolean {
        return this.value % 1 === 0;
    }

    get type(): concrete_type {
        return this.isReal ? concrete_type.real : concrete_type.int;
    }
}

export class Bool extends Literal {
    value: boolean;
    type = concrete_type.bool;
}

export class Str extends Literal {
    value: string;
    type = concrete_type.string;
}

export class Pixel extends Literal {
    value: number;
    type = concrete_type.pixel;
}

export class NullFile extends Literal {
    value = null;
    type = concrete_type.file;
}

export class Vector extends Literal {
    value: Literal[] = [];
    upb: Clause;
    lb: Clause;
    type = concrete_type.vector;
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