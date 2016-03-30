import {SuperVisitor} from "./SuperVisitor";
import * as A from '../AbstractSyntax';
import {ContextSensitiveError} from "../ContextSensitiveError";
import {ScopeError} from "../ContextSensitiveError";
import {AppliedArgumentToVariable} from "../ContextSensitiveError";

export class ErrorOutputting extends SuperVisitor {
    print = true;
    errors: ContextSensitiveError[]  = [];

    constructor(print?: boolean) {
        this.print = print;
    }

    get foundErrors() {
        return this.errors.length > 0;
    }

    afterVisitNode(node: A.AbstractSyntaxType) {
        if (node.errors && node.errors.length > 0) {
            this.errors = this.errors.concat(node.errors);
            if (print) {
                for (let error of node.errors) {
                    console.error(error.toString());
                }
            }
        }
    }
}