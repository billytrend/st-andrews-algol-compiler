import {SuperVisitor} from "./SuperVisitor";
import * as A from '../AbstractSyntax';
import {ContextSensitiveError} from "../ContextSensitiveError";
import {ScopeError} from "../ContextSensitiveError";
import {AppliedArgumentToVariable} from "../ContextSensitiveError";

export class ErrorOutputting extends SuperVisitor {
    foundErrors = false;

    afterVisitNode(node: A.AbstractSyntaxType) {
        if (node.errors && node.errors.length > 0) {
            this.foundErrors = true;
            for (let error of node.errors) {
                console.error(error.toString());
            }
        }
    }
}