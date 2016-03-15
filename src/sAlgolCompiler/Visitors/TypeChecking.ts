import {SuperVisitor} from "./SuperVisitor";
import * as A from '../AbstractSyntax';
import {
    ContextSensitiveError, OperationTypeError, ArgumentError,
    WrongNumberOfArguments, WrongReturnValue, ElementError, DimensionError
} from "../ContextSensitiveError";
import {ScopeError} from "../ContextSensitiveError";
import {AppliedArgumentToVariable} from "../ContextSensitiveError";
import {Vector} from "../AbstractSyntax";

export class TypeChecking extends SuperVisitor {

    private scopeStack:{string: A.Declaration}[] = [];

    findInScope(id: string): A.Declaration {
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i][id]) {
                return this.scopeStack[i][id];
            }
        }
        return null;
    }

    addToCurrentScope(id: string, decl: A.Declaration) {
        this.scopeStack[this.scopeStack.length - 1][id] = decl;
    }

    isWithinTypeClass(cla: A.concrete_type, type: A.concrete_type): boolean {
        switch (cla) {
            case A.concrete_type.arith:
            case A.concrete_type.ordered:
            case A.concrete_type.writeable:
            case A.concrete_type.literal:
            case A.concrete_type.image:
            case A.concrete_type.nonvoid:
            case A.concrete_type.vector:
                return type < cla;
            default:
                return false;
        }
    }

    beforeVisitDeclaration(obj: A.Declaration): void {
        if (obj.declType === A.declaration_type.PROC) {
            // Procedures are added to the scope earlier than usual to allow for recursion
            this.addToCurrentScope(obj.identifier, obj);
            this.scopeStack.push({});
        }
    }

    afterVisitDeclaration(obj: A.Declaration): void {
        if (obj.declType === A.declaration_type.VAR_DECL && obj.body) {
            obj.returnType = obj.body.returnType;
        }

        if (obj.declType === A.declaration_type.PROC) {
            this.scopeStack.pop();
            if (!obj.returnType.equals(obj.body.returnType)) {
                obj.addError(new WrongReturnValue(obj, obj.body.returnType));
            }
        } else if (obj.declType !== A.declaration_type.VAR_ASS) {
            this.addToCurrentScope(obj.identifier, obj);
        }
    }

    afterVisitVector(obj: A.Vector): void {
        for (let ele of obj.values) {
            if (!obj.returnType.references(ele.returnType)) {
                ele.addError(new ElementError(ele, obj));
            }
        }
    }

    beforeVisitSequence(obj: A.Sequence): void {
        this.scopeStack.push({});
    }

    afterVisitSequence(obj: A.Sequence): void {
        this.scopeStack.pop();
        obj.returnType = obj.clauses[obj.clauses.length - 1].returnType;
    }

    afterVisitApplication(obj: A.Application) {
        if (obj.shouldTypeCheck === false) {
            return;
        }

        let decl = this.findInScope(obj.identifier);
        if (decl === null) {
            obj.addError(new ScopeError(obj));
        } else {
            obj.applType = decl.declType;

            switch (decl.declType) {
                case A.declaration_type.PROC:
                case A.declaration_type.STRUCT:
                case A.declaration_type.FORWARD:
                    if (obj.args.length != decl.args.length) {
                        obj.addError(new WrongNumberOfArguments(obj, decl));
                        break;
                    }

                    for (let i = 0; i < obj.args.length; i++) {
                        if (!obj.args[i].returnType.equals(decl.args[i].returnType)) {
                            obj.addError(new ArgumentError(decl, obj, i));
                        }
                    }
                    obj.returnType = decl.returnType;
                    break;
                case A.declaration_type.VAR_DECL:
                case A.declaration_type.VAR_ASS:
                    if (decl.returnType.isVector) {
                        if (obj.args.length <= decl.returnType.dimensions()) {
                            obj.returnType = decl.returnType.dereference(1);
                        } else {
                            obj.addError(new DimensionError(obj, decl));
                        }
                    } else {
                        if (obj.args.length > 0) {
                            obj.addError(new AppliedArgumentToVariable(obj));
                        } else {
                            obj.returnType = decl.returnType;
                        }
                    }
            }
        }
    }

    afterVisitOperation(obj: A.Operation) {
        let left = obj.left;
        let right = obj.right;

        switch (obj.operator) {
            case A.operation_type.AND:
            case A.operation_type.OR:
            case A.operation_type.XOR:
                if (left.returnType.equals(right.returnType) && left.returnType.type === A.concrete_type.bool) {
                    return A.concrete_type.bool;
                }

                obj.addError(new OperationTypeError(obj));
                return;

            case A.operation_type.NOT:
                if (left.returnType.type === A.concrete_type.bool) {
                    return A.concrete_type.bool;
                }

                obj.addError(new OperationTypeError(obj));
                return;

            case A.operation_type.LT:
            case A.operation_type.LEQ:
            case A.operation_type.GT:
            case A.operation_type.GEQ:
                if (!this.isWithinTypeClass(A.concrete_type.nonvoid, left.returnType.type)) {
                    obj.addError(new OperationTypeError(obj));
                    return;
                }
            case A.operation_type.EQ:
            case A.operation_type.NEQ:
                if (!this.isWithinTypeClass(A.concrete_type.ordered, left.returnType.type)) {
                    obj.addError(new OperationTypeError(obj));
                }

                if (!left.returnType.equals(right.returnType)) {
                    obj.addError(new OperationTypeError(obj));
                }

                obj.returnType = new A.Type(A.concrete_type.bool);
                return;

            case A.operation_type.ADD:
            case A.operation_type.SUB:
                if (!this.isWithinTypeClass(A.concrete_type.arith, left.returnType.type)) {
                    obj.addError(new OperationTypeError(obj));
                }

                if (right && !this.isWithinTypeClass(A.concrete_type.arith, right.returnType.type)) {
                    obj.addError(new OperationTypeError(obj));
                } else if (!right) {
                    obj.returnType = left.returnType;
                    return;
                }

                if (right && !left.returnType.equals(right.returnType)) {
                    obj.returnType = new A.Type(A.concrete_type.bool);

                }

                obj.returnType = left.returnType;
                return;
            case A.operation_type.MUL:
            case A.operation_type.DIV:
                if (!this.isWithinTypeClass(A.concrete_type.arith, left.type)) {
                    return null;
                }

                if (right.type !== left.type) {
                    return null;
                }

                obj.returnType = left.returnType;
                return;
            case A.operation_type.IS:
            case A.operation_type.ISNT:
            // if (left.type === A.concrete_type.pntr &&
            //     right instanceof A.Application){ //TODO
            // }
            case A.operation_type.INTDIV:
            case A.operation_type.MOD:
            case A.operation_type.JOIN:
            case A.operation_type.SHIFT:
            case A.operation_type.SCALE:
            case A.operation_type.ROTATE:
            case A.operation_type.COLOUR:
            case A.operation_type.TEXT:
            case A.operation_type.ROR:
            case A.operation_type.RAND:
            case A.operation_type.XOR:
            case A.operation_type.COPY:
            case A.operation_type.NAND:
            case A.operation_type.NOR:
            case A.operation_type.NOT:
            case A.operation_type.XNOR:
        }
        return null;
    }


}