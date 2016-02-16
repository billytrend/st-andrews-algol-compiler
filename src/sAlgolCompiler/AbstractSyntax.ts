import E = ESTree;
import {getConsoleLog} from "./CodeGenHelpers";

export class AbstractSyntaxType {
    compile(): E.Node {
        return getConsoleLog();
    }
}

export class Program extends AbstractSyntaxType {
    sequence: Sequence = new Sequence();
    type: salgol_types;
}

export class Literal extends AbstractSyntaxType {
    value: any;
    constructor(value: any) {
        this.value = value;
    }
}

export class Number extends Literal {
    value: number;

    get isReal(): boolean {
        return false;
    }
}

export class Bool extends Literal {
    value: boolean;
}

export class Str extends Literal {
    value: string;
}

export class Pixel extends Literal {
    value: number;
}

export class NullFile extends Literal {
    value = null;
}

export class Pointer extends Literal {
    value: number;
}

export enum salgol_types {
    ARITH, ORDEREDIS, WRITEABLE, LITERAL, IMAGE, NONVOID, VECTOR, INT, ARITH, STRING, ORDERED, BOOL, WRITEABLE, PIXEL, PNTR, FILE, PIXEL, CPIXEL, LITERAL, PIC, IMAGE, VECTOR, PTR_NONVOID, PTR_CNONVOID, NONVOID, VOID
}

export class argType {
    identifier: string;
    type: salgol_types;

    constructor(identifier: string, type: salgol_types) {
        this.identifier = identifier;
        this.type = type;
    }
}

export class Clause extends AbstractSyntaxType {}

export enum declaration_type {
    VAR, PROC, STRUCT
};

export class Declaration extends Clause {
    identifier: string;
    body: Clause;
    args: argType[] = [];
    type: declaration_type;

    constructor(identifier: string, type: declaration_type) {
        this.identifier = identifier;
        this.type = type;
    }
}

export class Conditional extends Clause {
    test: Clause;
    thenCl: Clause;
    elseCl: Clause;
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
}

export class ForLoop extends Clause {
    incrVar: string;
    initial: Clause;
    final: Clause;
    increment: Clause;
    body: Clause;
}

export class Expression extends Clause {

}

export class Sequence extends Expression {
    clauses:(Clause|Declaration)[] = [];
}

export enum operation_type {
    NOT, AND, OR,
    LT, LEQ, GT, GEQ, EQ, NEQ, IS, ISNT,
    ADD, SUB, MUL, DIV, INTDIV, MOD,
    JOIN,
    SHIFT, SCALE, ROTATE, COLOUR, TEXT,
    ROR, RAND, XOR, COPY, NAND, NOR, NOT, XNOR
}

export class Operation extends Expression {
    operator: any;
    expressions: Expression[];

    constructor(expressions?: Expression[], operator?: any) {
        this.operator = operator;
        this.expressions = expressions;
    }
}

export class Application extends Expression {
    args: Clause[];
    identifier: string;

    constructor(identifier: string) {
        this.identifier = identifier;
    }
}

export class Assignable extends Clause {}

export class Procedure extends Assignable {}
export class Forward extends Assignable {}
export class Vector extends Assignable {}
export class Structure extends Assignable {}
export class Img extends Assignable {}

export enum input_type {READ, READI, READR, READB, READS, PEEK, READ_A_LINE, READ_BYTE, READ_16, READ_32, EOF}
export class Input extends Assignable {}