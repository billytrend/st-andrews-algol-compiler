import * as A from './AbstractSyntax'
import emoji = require('node-emoji');

export enum error_type {
    not_declared,
    not_function,
    not_variable,
    not_structure,
    incompatible_type
}

export class ContextSensitiveError {
    node: A.AbstractSyntaxType;

    constructor(node: A.AbstractSyntaxType) {
        this.node = node;
    }

    toString(): string {
        return `[Error] ${this.error}.`;
    }

    get error(): string {
        return "Unknown error";
    }
}

export class ScopeError extends ContextSensitiveError {
    node: A.Application;

    get error(): string {
        return `No function or variable named ${this.node.identifier} found in scope`;
    }
}


export class AppliedArgumentToVariable extends ScopeError {
    get error(): string {
        return `You tried to apply arguments to '${this.node.identifier}' when it is actually a variable ${emoji.get('information_desk_person')} `;
    }
}

export class TypeError extends ContextSensitiveError {
}

export class OperationTypeError extends ContextSensitiveError {
    node: A.Operation;

    constructor(node: A.Operation) {
        super(node);
    }

    get error(): string {
        return `Could not execute ${A.operation_type[this.node.operator]} on ${this.node.left.returnType.toString()}`
            + (this.node.right ? ` and ${this.node.right.returnType.toString()}` : '');
    }
}

export class ArgumentError extends TypeError {
    node: A.Declaration;
    application: A.Application;
    index: number;
    constructor(node: A.Declaration, arg: A.Application, i: number) {
        super(node);
        this.application = arg;
        this.index = i;
    }

    get error(): string {
        return `Could not apply expression of type ${this.application.args[this.index].returnType.toString()} to`
        + ` argument of type ${this.node.args[this.index].returnType.toString()} as argument number ${this.index + 1} in`
        + ` the method ${this.node.identifier}`;
    }
}

export class WrongNumberOfArguments extends TypeError {
    node: A.Application;
    decl: A.Declaration;

    constructor(node: A.Application, decl: A.Declaration) {
        super(node);
        this.node = node;
        this.decl = decl;
    }

    get error(): string {
        return `Could not apply ${this.node.args.length} arguments to ${this.decl.identifier} since it only usually`
        + ` takes ${this.decl.args.length}`;
    }
}

export class WrongReturnValue extends TypeError {
    node: A.Declaration;
    returned: A.Type;

    constructor(node: A.Declaration, returned: A.Type) {
        super(node);
        this.returned = returned;
    }

    get error(): string {
        return `Procedure ${this.node.identifier} should return ${this.node.returnType.toString()}, not`
        + ` ${this.returned.toString()}`;
    }
}

export class ElementError extends TypeError {
    node: A.Clause;
    vector: A.Vector;

    constructor(node: A.Clause, vector: A.Vector) {
        super(node);
        this.vector = vector;
    }

    get error(): string {
        return `Vector err`;
    }
}