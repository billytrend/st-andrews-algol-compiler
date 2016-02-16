import E = ESTree;
import {clause} from "./GeneratedFiles/ConcreteSyntax";

var expResult = getVar("_expResult");

export function accessObject(object: E.Expression, property: (E.Identifier|E.Expression), computed?: boolean): E.MemberExpression {
    let memExp = <E.MemberExpression>getASTNode("MemberExpression");
    memExp.computed = computed;
    memExp.object = object;
    memExp.property = property;
    return memExp;
}

export function callFunc(expressionYieldingFunction: E.Expression, args: E.Expression[]): E.CallExpression {
    let funcCall = <E.CallExpression>getASTNode("CallExpression");
    funcCall.callee = expressionYieldingFunction;
    funcCall.arguments = args;
    return funcCall;
}

export function getConsoleLog() {
    let func = accessObject(getVar("console"), getVar("log"));

    return callFunc(
        func,
        [getLiteral("Feature not yet implemented.")]
    );
}

export function getASTNode(type: string): E.Node {
    return {
        type: type
    }
}

export function getLiteral(value:(string|boolean|number|RegExp)): E.Literal {
    return {
        type: "Literal",
        value: value
    }
}

export function getBreak(value?:E.Identifier): E.BreakStatement {
    return {
        type: "BreakStatement",
        value: value ? value : null
    }
}

export function getVar(name: string): E.Identifier {
    return {
        type: 'Identifier',
        name: name
    }
}

export function varDecl(id: E.Identifier, right: E.Expression[]): E.Expression[] {
    let ass = <E.AssignmentExpression>getASTNode('AssignmentExpression');
    id.name = name;
    ass.left = id;
    ass.right = expResult;
    return <E.Expression[]>[
        right,
        ass
    ]

}

export function raiseExpressionStatements(expressions: E.Expression[]): E.ExpressionStatement[] {
    let result: E.ExpressionStatement[] = [];
    for (let exp of expressions) {
        let cur = <E.ExpressionStatement>getASTNode('ExpressionStatement');
        cur.expression = exp;
        result.push(cur);
    }
    return result;
}

export function ifElse(ifCl: clause, thenCl: E.BlockStatement, elseCl?: E.BlockStatement): E.Statement[] {
    let ifSt = <E.IfStatement>getASTNode('IfStatement');
    ifSt.consequent = thenCl;
    ifSt.alternate = elseCl ? elseCl : null;
    return <E.Statement[]>[
        CodeGen.clause(ifCl),
        ifSt
    ]

}

export function raiseToBlockStatement(expressions: E.Expression[]): E.BlockStatement {
    let block = <E.BlockStatement>getASTNode('BlockStatement');
    block.body = expressions;
    return block;
}

export function loop(test: E.Expression[], start: E.Expression[], end: E.Expression[]): E.Statement[] {
    let whileLoop = <E.WhileStatement>getASTNode('WhileStatement');
    whileLoop.test = getLiteral(true);
    let body = <E.BlockStatement>getASTNode('BlockStatement');
    let breakBlock = raiseToBlockStatement([getBreak()]);
    body.body = start
        .concat(ifElse(test, breakBlock))
        .concat(end);
    return [whileLoop]
}

export function forLoop(varId: E.Identifier, assignment: E.Expression[], limit: E.Expression[], increment: E.Expression[], body: E.Expression[]): E.Statement[] {
    let ass = varDecl(varId, assignment);
    let test = binOp(assignExpressionResult([varId]), limit, "==");
    increment = increment ? increment : [];
    return ass.concat(loop(test, [], body.concat(increment)));
}

export function caseClause(subject: E.Expression[], ): E.Expression[] {

}

export function assignExpressionResult(expr: E.Statement[]): E.Statement[] {
    let ass = <E.AssignmentExpression>getASTNode('AssignmentExpression');
    ass.left = expResult;
    ass.right = expr[expr.length - 1];
    expr[expr.length - 1] = ass;
    return expr;
}

export function binOp(left: E.Expression[], right: E.Expression[], operator: E.BinaryOperator): E.Statement[]  {
    let leftId = getVar('_rightResult');
    let rightId = getVar('_leftResult');
    let assignLeft = varDecl(leftId, left);
    let assignRight = varDecl(rightId, right);
    let op = <E.BinaryExpression>getASTNode('BinaryExpression');
    op.left = leftId;
    op.right = rightId;
    op.operator = operator;
    return assignExpressionResult(
        left.concat(assignLeft)
        .concat(right)
        .concat(assignRight)
        .concat(op)
    );
}
