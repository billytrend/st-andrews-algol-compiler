import * as A from '../AbstractSyntax'
import {SuperVisitor} from "./SuperVisitor";


export function visit(obj: A.AbstractSyntaxType, visitor:SuperVisitor) {
    visitor.beforeVisit(obj);
    visitObject(obj, visitor);
    visitor.afterVisit(obj);
}

function visitObject(obj: A.AbstractSyntaxType, visitor: SuperVisitor) {
    visitor.beforeVisitNode(obj);
    if (obj instanceof A.Program) {
        visitProgram(obj, visitor);
    } else if (obj instanceof A.Declaration) {
        visitDeclaration(obj, visitor);
    } else if (obj instanceof A.Conditional) {
        visitConditional(obj, visitor);
    } else if (obj instanceof A.Switch) {
        visitSwitch(obj, visitor);
    } else if (obj instanceof A.Loop) {
        visitLoop(obj, visitor);
    } else if (obj instanceof A.ForLoop) {
        visitForLoop(obj, visitor);
    } else if (obj instanceof A.Sequence) {
        visitSequence(obj, visitor);
    } else if (obj instanceof A.Operation) {
        visitOperation(obj, visitor);
    } else if (obj instanceof A.Application) {
        visitApplication(obj, visitor);
    } else if (obj instanceof A.Vector) {
        visitVector(obj, visitor);
    }
    visitor.afterVisitNode(obj);
}

function visitProgram(obj: A.Program, visitor: SuperVisitor) {
    visit(obj.sequence, visitor);
}

function visitDeclaration(obj: A.Declaration, visitor: SuperVisitor) {
    if (obj.args.length > 0) {
        for (let arg of obj.args) {
            visit(arg, visitor);
        }
    }
    if (obj.body) {
        visit(obj.body, visitor);
    }
}

function visitConditional(obj: A.Conditional, visitor: SuperVisitor) {
    visit(obj.test, visitor);
    visit(obj.thenCl, visitor);
    visit(obj.elseCl, visitor);
}

function visitSwitch(obj: A.Switch, visitor: SuperVisitor) {
    visit(obj.arg, visitor);
    for (let cas of obj.cases) {
        for (let ca of cas[0]) {
            visit(ca, visitor);
        }
        visit(cas[1], visitor);
    }
    visit(obj.defcase, visitor);
}

function visitLoop(obj: A.Loop, visitor: SuperVisitor) {
    if (obj.first) {
        visit(obj.first, visitor);
    }
    visit(obj.test, visitor);
    if (obj.last) {
        visit(obj.last, visitor);
    }
}

function visitVector(obj: A.Vector, visitor: SuperVisitor) {
    for (let cl of obj.values) {
        visit(cl, visitor);
    }
}

function visitForLoop(obj: A.ForLoop, visitor: SuperVisitor) {
    visit(obj.initial, visitor);
    visit(obj.final, visitor);
    visit(obj.increment, visitor);
    visit(obj.body, visitor);
}

function visitSequence(obj: A.Sequence, visitor: SuperVisitor) {
    for (let clause of obj.clauses) {
        visit(clause, visitor);
    }
}

function visitOperation(obj: A.Operation, visitor: SuperVisitor) {
    for (let exps of obj.expressions) {
        visit(exps, visitor);
    }
}

function visitApplication(obj: A.Application, visitor: SuperVisitor) {
    for (let arg of obj.args) {
        visit(arg, visitor);
    }
}