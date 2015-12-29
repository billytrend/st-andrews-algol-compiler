import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class MakeVisitor extends AbstractVisitor<void> {

    beforeVisitGrammar(node:Grammar):void {
            this.output.push("module SalgolTypes {");
            this.output.push("export class VisitorPass extends AbstractPass<void> {");
            this.output.push("private _visitor: AbstractVisitor<void>;");
            this.output.push("get visitor():AbstractVisitor<void> {");
            this.output.push("return this._visitor;");
            this.output.push("}");
            this.output.push("set visitor(value:AbstractVisitor<void>) {");
            this.output.push("this._visitor = value;");
            this.output.push("}");
            this.output.push("constructor(visitor: AbstractVisitor<void>) {");
            this.output.push("super();");
            this.output.push("this.visitor = visitor;");
            this.output.push("}");
            this.output.push("public visit(node: GrammarFeature) {");
            this.output.push("this.visitor.beforeVisit(node);");
            this.output.push("this.pass(node);");
            this.output.push("this.visitor.afterVisit(node);");
            this.output.push("}");

        }

    afterVisitGrammar(node:Grammar):void {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production):void {
        this.output.push("export function pass_" + this.curProductionName + this.productionIndex + "(node:" + this.curProductionName + this.productionIndex + ") {");
    }


    afterVisitProduction(node:Production):void {
        this.output.push("}");
    }

    beforeVisitMaybeObject(node:MaybeObject):void {

    }

    afterVisitMaybeObject(node:MaybeObject):void {

    }

    beforeVisitTerminal(node:Terminal):void {

    }

    afterVisitTerminal(node:Terminal):void {

    }

    beforeVisitNonTerminal(node:NonTerminal):void {
        this.output.push("this.visit(" + node.value + this.nonTerminalIndex + ")");
    }

    afterVisitNonTerminal(node:NonTerminal):void {

    }

}