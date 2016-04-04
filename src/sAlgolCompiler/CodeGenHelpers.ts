import E = ESTree;
import {clause} from "./generatedFiles/ConcreteSyntax";
import {Literal, operation_type} from "./AbstractSyntax";
import BlockStatement = ESTree.BlockStatement;
import Expression = E.Expression;

var expResult = getIdentifier("_expResult");

export function accessObject(object: E.Expression, property: (E.Identifier|E.Expression), computed?: boolean): E.MemberExpression {
    let memExp = <E.MemberExpression>getASTNode("MemberExpression");
    memExp.computed = computed;
    memExp.object = object;
    memExp.property = property;
    return memExp;
}

export function getTryCatch(tryBlock: E.BlockStatement) {
    let tryCatch = <E.TryStatement>getASTNode("TryStatement");
    tryCatch.block = tryBlock;
    tryCatch.handler = <E.CatchClause>getASTNode("CatchClause");
    tryCatch.handler.param =  <E.Identifier>getIdentifier("e");
    tryCatch.handler.body = raiseToBlockStatement([getExpressionStatement(callFunc(getIdentifier("_errorHandler"), [getIdentifier("e")]))]);
    return tryCatch;
}

export function getReturnStatement(exp: E.Expression): E.ReturnStatement {
    let returnStmt = <E.ReturnStatement>getASTNode('ReturnStatement');
    returnStmt.argument = exp;
    return returnStmt;
}

export function makeBlockReturn(exp: E.BlockStatement): E.BlockStatement {
    let lastStmt = exp.body[exp.body.length - 1];
    if (lastStmt.type.indexOf("ExpressionStatement") !== -1) {
        let tight = <E.ExpressionStatement>lastStmt;
        lastStmt = tight.expression;
    }
    exp.body[exp.body.length - 1] = getReturnStatement(lastStmt);
    return exp;
}

export function callFunc(expressionYieldingFunction: E.Expression, args: E.Expression[]): E.CallExpression {
    let funcCall = <E.CallExpression>getASTNode("CallExpression");
    funcCall.callee = expressionYieldingFunction;
    funcCall.arguments = args;
    return funcCall;
}

export function getNewObj(expressionYieldingFunction: E.Expression, args: E.Expression[]): E.NewExpression {
    let init = <E.NewExpression>getASTNode("NewExpression");
    init.callee = expressionYieldingFunction;
    init.arguments = args;
    return init;
}

export function getEmptyStatement(): E.EmptyStatement {
    return getASTNode("EmptyStatement");
}

export function getThis(): E.ThisExpression {
    return getASTNode("ThisExpression");
}

export function objectDefinition(id: string, properties: string[]): E.FunctionDeclaration {
    return functionDefinition(
        id,
        properties,
        raiseToBlockStatement(properties.map(function (prop) {
            return maybeRaiseToExpressionStatement(varAss(
                accessObject(getThis(), getIdentifier(prop), false), getIdentifier(prop)
            ));
        }))
    );
}

export function functionDefinition(id: string, properties: string[], body: E.BlockStatement): E.FunctionDeclaration {
    let decl = <E.FunctionDeclaration>getASTNode("FunctionDeclaration");
    decl.id = id ? getIdentifier(id) : null;
    decl.body = body;
    decl.params = properties.map(prop => getIdentifier(prop));
    return decl;
}

export function getExpressionStatement(expr: E.Expression): E.ExpressionStatement {
    let stmt = <E.ExpressionStatement>getASTNode('ExpressionStatement');
    stmt.expression = expr;
    return stmt;
}

export function assignVariable(id: E.Pattern, literal: E.Literal): E.Statement {
    let decl = <E.VariableDeclaration>getASTNode("VariableDeclaration");
    let declarator = <E.VariableDeclarator>getASTNode("VariableDeclarator");
    declarator.id = id;
    declarator.init = literal;
    decl.declarations = [declarator];
    decl.kind = "var";
    return decl;
}

export function operation(exps: E.Expression[], operation: operation_type): E.Expression {
    if (exps.length === 2 && compileBinOp(operation)) {
        return binaryOperation(exps[0], exps[1], compileBinOp(operation));
    } else if (exps.length === 1 && compileBinOp(operation)) {
        return unaryOperation(exps[0], compileBinOp(operation));
    } else {
        throw "Cannot produce code for operation";
    }
}

export function binaryOperation(left: E.Expression, right: E.Expression, operation: E.BinaryOperator): E.BinaryExpression {
    let op = <E.BinaryExpression>getASTNode("BinaryExpression");
    op.left = left;
    op.right = right;
    op.operator = operation;
    return op;
}
export function unaryOperation(left: E.Expression, operation: E.BinaryOperator): E.UnaryExpression {
    let op = <E.UnaryExpression>getASTNode("UnaryExpression");
    op.argument = left;
    op.operator = operation;
    return op;
}

export function compileBinOp(sym: operation_type): E.BinaryOperator {
    switch (sym) {
        case operation_type.EQ: return "===";
        case operation_type.NEQ: return "!==";
        case operation_type.LEQ: return "<=";
        case operation_type.GEQ: return ">=";
        case operation_type.LT: return "<";
        case operation_type.GT: return ">";
        case operation_type.ADD: return "+";
        case operation_type.SUB: return "-";
        case operation_type.MUL: return "*";
        case operation_type.DIV: return "/";
        case operation_type.AND: return "&";
        case operation_type.XOR: return "^";
        case operation_type.MOD: return "%";
    }
//     enum BinaryOperator {
//     // "<<"
//     // ">>"
//     // ">>>"
//     // "in"
//     // | "instanceof" | ".."
// }
    return null;
}

export function getClosure(body: E.BlockStatement): E.CallExpression {
    return callFunc(functionDefinition(null, [], body), []);
}

export function getProgram(stmts: (E.Statement|E.ModuleDeclaration)[]): E.Program {
    let prog = <E.Program>getASTNode("Program");
    prog.body = stmts;
    return prog;
}

export function getConsoleLog() {
    let func = accessObject(getIdentifier("console"), getIdentifier("log"));

    return callFunc(
        func,
        [getLiteral("Feature not yet implemented.")]
    );
}

export function getASTNode(type: string): E.Node {
    return <E.Node>{
        type: type,
        loc: {start: {line: 0, column: 0}, end: {line: 0, column: 4}}
    }
}

export function getLiteral(value:(string|boolean|number|RegExp)): E.Literal {
    return {
        type: "Literal",
        value: value
    }
}

export function getIdentifier(name: string): E.Identifier {
    return {
        type: 'Identifier',
        name: name
    }
}

export function varAss(id: E.Expression, right: E.Expression): E.AssignmentExpression {
    let ass = <E.AssignmentExpression>getASTNode('AssignmentExpression');
    ass.operator = '=';
    ass.left = id;
    ass.right = right;
    return ass;

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

export function ifElse(ifCl: E.Expression, thenCl: E.Expression, elseCl?: E.Expression): E.ConditionalExpression {
    let ifSt = <E.IfStatement>getASTNode('ConditionalExpression');
    ifSt.test = ifCl;
    ifSt.consequent = thenCl;
    ifSt.alternate = elseCl ? elseCl : null;
    return ifSt;
}

export function unclosedIfElse(ifCl: E.Expression, thenCl: E.BlockStatement, elseCl?: E.BlockStatement): E.Statement {
    let ifSt = <E.IfStatement>getASTNode('IfStatement');
    ifSt.test = ifCl;
    ifSt.consequent = thenCl;
    ifSt.alternate = elseCl ? elseCl : null;
    return ifSt;
}



export function raiseToBlockStatement(expressions: E.Expression[]): E.BlockStatement {
    let block = <E.BlockStatement>getASTNode('BlockStatement');
    block.body = <E.Expression[]>expressions;
    return block;
}

export function negateExpression(exp: E.Expression) {
    let negative = <E.UnaryExpression>getASTNode("UnaryExpression");
    negative.operator = "!";
    negative.argument = exp;
    return negative;
}


export function raiseToExpressionStatement(expr: E.Expression): E.ExpressionStatement {
    let out = <ESTree.ExpressionStatement>getASTNode("ExpressionStatement");
    out.expression = expr;
    return out;
}

export function loop(test: E.Expression, start: E.Expression, end: E.Expression): E.CallExpression {
    let id = getIdentifier("$ret");
    test = negateExpression(test);
    let startClos: E.Expression[] = start ? [raiseToExpressionStatement(varAss(id, start))] : [];
    let endClos: E.Expression[] = end ? [raiseToExpressionStatement(varAss(id, end))] : [];

    let whileLoop = <E.WhileStatement>getASTNode('WhileStatement');
    let breakBlock = raiseToBlockStatement([getReturnStatement(getIdentifier("$ret"))]);
    let returnValue = assignVariable(getIdentifier("$ret"), null);
    whileLoop.test = getLiteral(true);
    whileLoop.body = raiseToBlockStatement(
        [returnValue]
        .concat(startClos)
        .concat(unclosedIfElse(test, breakBlock))
        .concat(endClos));
    return getClosure(raiseToBlockStatement([whileLoop]));
}

export function maybeRaiseToExpressionStatement(maybeExpression: E.Expression): E.Statement {
    if (maybeExpression && maybeExpression.type.indexOf("Expression") !== -1) {
        let expSt = <E.ExpressionStatement>getASTNode("ExpressionStatement");
        expSt.expression = maybeExpression;
        return expSt;
    }
    return maybeExpression;
}

export function getArray(elements:E.Expression[]): E.ArrayExpression {
    let arr = <E.ArrayExpression>getASTNode('ArrayExpression');
    arr.elements = elements;
    return arr;
}

export function getForLoop(incrementer: E.Identifier, start: E.Expression, end: E.Expression, inc: E.Expression, body: E.Expression) {
    let loop = <E.ForStatement>getASTNode('ForStatement');
    loop.init = assignVariable(incrementer, start);
    loop.test = operation([incrementer, end], operation_type.LT);
    loop.update = binaryOperation(incrementer, inc, "+=");
    loop.body = raiseToBlockStatement([body]);
    return loop;
}

// export function forLoop(varId: E.Identifier, assignment: E.Expression[], limit: E.Expression[], increment: E.Expression[], body: E.Expression[]): E.Statement[] {
//     let ass = varDecl(varId, assignment);
//     let test = binOp(assignExpressionResult([varId]), limit, "==");
//     increment = increment ? increment : [];
//     return ass.concat(loop(test, [], body.concat(increment)));
// }

// export function caseClause(subject: E.Expression[], ): E.Expression[] {
//
// }


// export function binOp(left: E.Expression[], right: E.Expression[], operator: E.BinaryOperator): E.Statement[]  {
//     let leftId = getIdentifier('_rightResult');
//     let rightId = getIdentifier('_leftResult');
//     let assignLeft = varAss(leftId, left);
//     let assignRight = varAss(rightId, right);
//     let op = <E.BinaryExpression>getASTNode('BinaryExpression');
//     op.left = leftId;
//     op.right = rightId;
//     op.operator = operator;
//     return assignExpressionResult(
//         left.concat(assignLeft)
//         .concat(right)
//         .concat(assignRight)
//         .concat(op)
//     );
// }
