import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class MakeVisitor extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
            this.output.push("module SalgolTypes {");
            this.output.push("export class VisitorPass extends AbstractPass<void> {");
            this.output.push("private _visitor: AbstractVisitor;");
            this.output.push("get visitor():AbstractVisitor {");
            this.output.push("return this._visitor;");
            this.output.push("}");
            this.output.push("set visitor(value:AbstractVisitor) {");
            this.output.push("this._visitor = value;");
            this.output.push("}");
            this.output.push("constructor(visitor: AbstractVisitor) {");
            this.output.push("super();");
            this.output.push("this.visitor = visitor;");
            this.output.push("}");
            this.output.push("public visit(node: GrammarFeature) {");
            this.output.push("this.visitor.beforeVisit(node);");
            this.output.push("this.pass(node);");
            this.output.push("this.visitor.afterVisit(node);");
            this.output.push("}");

        }

    afterVisitGrammar(node:Grammar) {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production) {
        this.output.push("export function pass_" + this.curProductionName + this.productionIndex + "(node:" + this.curProductionName + this.productionIndex + ") {");
    }


    afterVisitProduction(node:Production) {
        this.output.push("}");
    }

    beforeVisitMaybeObject(node:MaybeObject) {

    }

    afterVisitMaybeObject(node:MaybeObject) {

    }

    beforeVisitTerminal(node:Terminal) {

    }

    afterVisitTerminal(node:Terminal) {

    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push("this.visit(" + node.value + this.nonTerminalIndex + ")");
    }

    afterVisitNonTerminal(node:NonTerminal) {

    }

}