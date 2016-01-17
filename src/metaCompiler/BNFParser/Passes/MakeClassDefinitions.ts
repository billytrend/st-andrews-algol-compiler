import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {Empty} from "../Parser";
import {Constants} from "../Constants";

export class MakeClassDefinitions extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output.push("module " + Constants.compilerClassesModuleName + "{");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("}");
    }

    beforeVisitProductionName(node:string) {
        this.output.push("export class " + Constants.superClassName(this.curProductionName) + "{};");
    }

    afterVisitProductionName(node:string) {
    }

    beforeVisitProduction(node:Production) {
        this.output.push("export class " + Constants.className(this.curProductionName, this.productionIndex) + " extends " + Constants.superClassName(this.curProductionName) + "{");
    }


    afterVisitProduction(node:Production) {
        this.output.push("}");
    }

    beforeVisitTerminal(node:Terminal) {

    }

    afterVisitTerminal(node:Terminal) {

    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push("  public " + Constants.nonTerminalFieldName(node.value, this.nonTerminalIndex) + ":" + node.prettyValue + ";");
    }

    afterVisitNonTerminal(node:NonTerminal) {

    }

    beforeVisitEmpty(empty:Empty) {
    }

    afterVisitEmpty(empty:Empty) {
    }
}