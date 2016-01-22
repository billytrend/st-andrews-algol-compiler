import E = ESTree;
import {clause} from "./GeneratedFiles/ConcreteSyntax";
import {CodeGen} from "./CodeGen";

export class CodeGenHelpers {
    public static expResult = this.getVar("_expResult");

    public static getASTNode(type: string): E.Node {
        return {
            type: type
        }
    }

    public static getLiteral(type: string, value:(string|boolean|number|RegExp)): E.Literal {
        return {
            type: type,
            value: value
        }
    }

    public static getBreak(value?:Identifier): E.BreakStatement {
        return {
            type: "BreakStatement",
            value: value ? value : null
        }
    }

    public static getVar(name: string): E.Identifier {
        return {
            type: 'Identifier',
            name: name
        }
    }

    public static varDecl(id: E.Identifier, right: E.Expression[]): E.Expression[] {
        let ass = <E.AssignmentExpression>this.getASTNode('AssignmentExpression');
        id.name = name;
        ass.left = id;
        ass.right = this.expResult;
        return <E.Expression[]>[
            right,
            ass
        ]

    }

    public static raiseExpressionStatements(expressions: E.Expression[]): E.ExpressionStatement[] {
        let result: E.ExpressionStatement[] = [];
        for (let exp of expressions) {
            let cur = <E.ExpressionStatement>this.getASTNode('ExpressionStatement');
            cur.expression = exp;
            result.push(cur);
        }
        return result;
    }

    public static ifElse(ifCl: clause, thenCl: E.BlockStatement, elseCl?: E.BlockStatement): E.Statement[] {
        let ifSt = <E.IfStatement>this.getASTNode('IfStatement');
        ifSt.consequent = thenCl;
        ifSt.alternate = elseCl ? elseCl : null;
        return <E.Statement[]>[
            CodeGen.clause(ifCl),
            ifSt
        ]

    }

    public static raiseToBlockStatement(expressions: E.Expression[]): E.BlockStatement {
        let block = <E.BlockStatement>this.getASTNode('BlockStatement');
        block.body = expressions;
        return block;
    }

    public static loop(test: E.Expression[], start: E.Expression[], end: E.Expression[]): E.Statement[] {
        let whileLoop = <E.WhileStatement>this.getASTNode('WhileStatement');
        whileLoop.test = this.getLiteral("Literal", true);
        let body = <E.BlockStatement>this.getASTNode('BlockStatement');
        let breakBlock = this.raiseToBlockStatement([this.getBreak()]);
        body.body = start
            .concat(this.ifElse(test, breakBlock))
            .concat(end);
        return [whileLoop]
    }

    public static forLoop(varId: E.Identifier, assignment: E.Expression[], limit: E.Expression[], increment: E.Expression[], body: E.Expression[]): E.Statement[] {
        let ass = this.varDecl(varId, assignment);
        let test = this.binOp(this.assignExpressionResult([varId]), limit, "==");
        increment = increment ? increment : [];
        return ass.concat(this.loop(test, [], body.concat(increment)));
    }

    public static caseClause(subject: E.Expression[], ): E.Expression[] {

    }

    public static assignExpressionResult(expr: E.Statement[]): E.Statement[] {
        let ass = <E.AssignmentExpression>this.getASTNode('AssignmentExpression');
        ass.left = this.expResult;
        ass.right = expr[expr.length - 1];
        expr[expr.length - 1] = ass;
        return expr;
    }

    public static binOp(left: E.Expression[], right: E.Expression[], operator: E.BinaryOperator): E.Statement[]  {
        let leftId = this.getVar('_rightResult');
        let rightId = this.getVar('_leftResult');
        let assignLeft = this.varDecl(leftId, left);
        let assignRight = this.varDecl(rightId, right);
        let op = <E.BinaryExpression>this.getASTNode('BinaryExpression');
        op.left = leftId;
        op.right = rightId;
        op.operator = operator;
        return this.assignExpressionResult(
            left.concat(assignLeft)
            .concat(right)
            .concat(assignRight)
            .concat(op)
        );
    }

}