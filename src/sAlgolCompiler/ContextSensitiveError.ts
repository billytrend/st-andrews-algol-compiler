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
    protected error: string = "Unknown error";

    toString(): string {
        return `[Error] ${this.error}.`;
    }
}

export class ScopeError extends ContextSensitiveError {
    node: A.Application;

    constructor(node: A.Application) {
        this.node = node;
    }

    get error(): string {
        return `No function or variable named ${this.node.identifier} found in scope`;
    }
}


export class AppliedArgumentToVariable extends ScopeError {
    get error(): string {
        return `You tried to apply arguments to '${this.node.identifier}' when it is actually a variable ${emoji.get('information_desk_person')} `;
    }
}