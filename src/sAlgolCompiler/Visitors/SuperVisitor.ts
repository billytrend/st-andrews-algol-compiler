import * as A from '../AbstractSyntax'

export class SuperVisitor {

    beforeVisit(obj: A.AbstractSyntaxType):void {
        if (obj instanceof A.Program) {
            this.beforeVisitProgram(obj);
        } else if (obj instanceof A.Type) {
            this.beforeVisitConcreteType(obj);
        } else if (obj instanceof A.Declaration) {
            this.beforeVisitDeclaration(obj);
        } else if (obj instanceof A.Conditional) {
            this.beforeVisitConditional(obj);
        } else if (obj instanceof A.Switch) {
            this.beforeVisitSwitch(obj);
        } else if (obj instanceof A.Loop) {
            this.beforeVisitLoop(obj);
        } else if (obj instanceof A.ForLoop) {
            this.beforeVisitForLoop(obj);
        } else if (obj instanceof A.Sequence) {
            this.beforeVisitSequence(obj);
        } else if (obj instanceof A.Operation) {
            this.beforeVisitOperation(obj);
        } else if (obj instanceof A.Application) {
            this.beforeVisitApplication(obj);
        } else if (obj instanceof A.Number) {
            this.beforeVisitNumber(obj);
        } else if (obj instanceof A.Bool) {
            this.beforeVisitBool(obj);
        } else if (obj instanceof A.Str) {
            this.beforeVisitStr(obj);
        } else if (obj instanceof A.Pixel) {
            this.beforeVisitPixel(obj);
        } else if (obj instanceof A.NullFile) {
            this.beforeVisitNullFile(obj);
        } else if (obj instanceof A.Vector) {
            this.beforeVisitVector(obj);
        }
    }

    afterVisit(obj: A.AbstractSyntaxType):void {
        if (obj instanceof A.Program) {
            this.afterVisitProgram(obj);
        } else if (obj instanceof A.Type) {
            this.afterVisitConcreteType(obj);
        } else if (obj instanceof A.Declaration) {
            this.afterVisitDeclaration(obj);
        } else if (obj instanceof A.Conditional) {
            this.afterVisitConditional(obj);
        } else if (obj instanceof A.Switch) {
            this.afterVisitSwitch(obj);
        } else if (obj instanceof A.Loop) {
            this.afterVisitLoop(obj);
        } else if (obj instanceof A.ForLoop) {
            this.afterVisitForLoop(obj);
        } else if (obj instanceof A.Sequence) {
            this.afterVisitSequence(obj);
        } else if (obj instanceof A.Operation) {
            this.afterVisitOperation(obj);
        } else if (obj instanceof A.Application) {
            this.afterVisitApplication(obj);
        } else if (obj instanceof A.Number) {
            this.afterVisitNumber(obj);
        } else if (obj instanceof A.Bool) {
            this.afterVisitBool(obj);
        } else if (obj instanceof A.Str) {
            this.afterVisitStr(obj);
        } else if (obj instanceof A.Pixel) {
            this.afterVisitPixel(obj);
        } else if (obj instanceof A.NullFile) {
            this.afterVisitNullFile(obj);
        } else if (obj instanceof A.Vector) {
            this.afterVisitVector(obj);
        }
    }

    beforeVisitNode(obj: A.AbstractSyntaxType) {

    }

    afterVisitNode(obj: A.AbstractSyntaxType) {

    }

    beforeVisitVector(obj: A.Vector) {

    }

    afterVisitVector(obj: A.Vector) {

    }


    beforeVisitProgram(obj: A.Program): void {

    }

    beforeVisitConcreteType(obj: A.Type): void {

    }

    beforeVisitDeclaration(obj: A.Declaration): void {

    }

    beforeVisitConditional(obj: A.Conditional): void {

    }

    beforeVisitSwitch(obj: A.Switch): void {

    }

    beforeVisitLoop(obj: A.Loop): void {

    }

    beforeVisitForLoop(obj: A.ForLoop): void {

    }

    beforeVisitSequence(obj: A.Sequence): void {

    }

    beforeVisitOperation(obj: A.Operation): void {

    }

    beforeVisitApplication(obj: A.Application): void {

    }

    beforeVisitNumber(obj: A.Number): void {

    }

    beforeVisitBool(obj: A.Bool): void {

    }

    beforeVisitStr(obj: A.Str): void {

    }

    beforeVisitPixel(obj: A.Pixel): void {

    }

    beforeVisitNullFile(obj: A.NullFile): void {

    }

    afterVisitProgram(obj: A.Program): void {

    }

    afterVisitConcreteType(obj: A.Type): void {

    }

     afterVisitDeclaration(obj: A.Declaration): void {

    }

    afterVisitConditional(obj: A.Conditional): void {

    }

    afterVisitSwitch(obj: A.Switch): void {

    }

    afterVisitLoop(obj: A.Loop): void {

    }

    afterVisitForLoop(obj: A.ForLoop): void {

    }

    afterVisitSequence(obj: A.Sequence): void {

    }

    afterVisitOperation(obj: A.Operation): void {

    }

    afterVisitApplication(obj: A.Application): void {

    }

    afterVisitNumber(obj: A.Number): void {

    }

    afterVisitBool(obj: A.Bool): void {

    }

    afterVisitStr(obj: A.Str): void {

    }

    afterVisitPixel(obj: A.Pixel): void {

    }

    afterVisitNullFile(obj: A.NullFile): void {

    }

}