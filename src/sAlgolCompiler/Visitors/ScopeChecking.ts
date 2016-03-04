import {SuperVisitor} from "./SuperVisitor";
import * as A from '../AbstractSyntax';
import {ContextSensitiveError} from "../ContextSensitiveError";
import {ScopeError} from "../ContextSensitiveError";
import {AppliedArgumentToVariable} from "../ContextSensitiveError";

class IdDescription {
    type: A.concrete_type;
    declType: A.declaration_type;
}

export class ScopeChecking extends SuperVisitor {
    private scopeStack:{string: IdDescription}[] = [];

    findInScope(id: string): IdDescription {
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i][id]) {
                return this.scopeStack[i][id];
            }
        }
        return null;
    }

    addToCurrentScope(id: string, declType: A.declaration_type, retType: A.concrete_type) {
        let meta = new IdDescription();
        meta.declType = declType;
        meta.type = retType;
        this.scopeStack[this.scopeStack.length - 1][id] = meta;
    }

    beforeVisitSequence(obj: A.Sequence): void {
        this.scopeStack.push({});
    }

    afterVisitSequence(obj: A.Sequence): void {
        this.scopeStack.pop();
    }

    beforeVisitDeclaration(obj: A.Declaration): void {
        this.addToCurrentScope(obj.identifier, obj.declType, obj.type)
        if (obj.declType === A.declaration_type.PROC) {
            this.beforeVisitSequence(null);
        }
    }

    afterVisitDeclaration(obj: A.Declaration): void {
        if (obj.declType === A.declaration_type.PROC) {
            this.afterVisitSequence(null);
        }
    }

    beforeVisitApplication(obj: A.Application): void {
        if (!obj.shouldTypeCheck) {
            return;
        }

        let decl = this.findInScope(obj.identifier);
        if (decl === null) {
            obj.addError(new ScopeError(obj));
        } else {
            switch (decl.declType) {
                case A.declaration_type.PROC:
                case A.declaration_type.STRUCT:
                    obj.applType = decl.declType;
                    break;
                case A.declaration_type.FORWARD:
                    obj.applType = A.declaration_type.PROC;
                    break;
                case A.declaration_type.VAR_DECL:
                    if (obj.args.length > 0) {
                        obj.addError(new AppliedArgumentToVariable(obj));
                    }
                    obj.applType = decl.declType;
            }
        }
    }


}