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