import * as T from "./GeneratedFiles/ConcreteSyntax";
import E = ESTree;
import {clause2} from "./GeneratedFiles/ConcreteSyntax";
import {clause} from "./GeneratedFiles/ConcreteSyntax";
import {identifier} from "./GeneratedFiles/ConcreteSyntax";
import {standard_id} from "./GeneratedFiles/ConcreteSyntax";
import {CodeGenHelpers} from "./CodeGenHelpers";

export class CodeGen {

    static getASTNode(type: string): E.Node {
        return {
            type: type
        }
    }

    static let_decl0(node: T.let_decl0): E.ExpressionStatement[] {
        let id = this.identifier(node.identifier0);
        return this.clause(node.clause2)
            .concat(CodeGenHelpers.varToVar(id, "_clauseResult"));
    }

    static clause(clause: T.clause): E.Statement[] {
        return null;
    }

    static clause0(clause: T.clause0): E.IfStatement[] {

        return null;
    }

    static clause2(clause2:clause): E.AssignmentExpression {
        let expression: E.AssignmentExpression = this.getASTNode('AssignmentExpression');

        return expression;
    }

    static identifier(identifier: T.identifier) {

    }

    static identifier0(identifier: T.identifier0) {

    }

    static identifier1(identifier: T.identifier1) {
        return identifier.standard_id0
    }

    static standard_id(standard_id: {}): string {
        return "stdid";
    }

}