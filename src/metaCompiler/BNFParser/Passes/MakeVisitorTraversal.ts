import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {Empty} from "../Parser";

export class MakeVisitorTraversal extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
            this.output.push("export class VisitorPass extends AbstractPass {");
            this.output.push("private _visitor: AbstractVisitor;");
            this.output.push("get visitor():AbstractVisitor {");
            this.output.push("return this._visitor;");
            this.output.push("}");
            this.output.push("set visitor(prettyValue:AbstractVisitor) {");
            this.output.push("this._visitor = prettyValue;");
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

    beforeVisitProductionName(node: string) {
    }

    afterVisitProductionName(node: string) {
    }

    beforeVisitProduction(node:Production) {
        this.output.push("pass_" + this.curProductionName + this.productionIndex + "(node:" + this.curProductionName + this.productionIndex + ") {");
    }


    afterVisitProduction(node:Production) {
        this.output.push("}");
    }

    beforeVisitTerminal(node:Terminal) {

    }

    afterVisitTerminal(node:Terminal) {

    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push("this.visit(" + node.prettyValue + this.nonTerminalIndex + ")");
    }

    afterVisitNonTerminal(node:NonTerminal) {

    }

    beforeVisitEmpty(empty:Empty) {
    }

    afterVisitEmpty(empty:Empty) {
    }

}