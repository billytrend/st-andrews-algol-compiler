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
        this.output.push("import {SalgolParseSymbol, SalgolTerminalClass} from '../generatedFileHelpers/SalgolParseSymbol'");
    }

    afterVisitGrammar(node:Grammar) {
    }

    beforeVisitProductionName(node:string) {
        this.output.push("export class " + Constants.superClassName(this.curProductionName) + " extends SalgolParseSymbol {};");
    }

    afterVisitProductionName(node:string) {
    }

    beforeVisitProduction(node:Production) {
        this.output.push("export class " + Constants.className(this.curProductionName, this.productionIndex, node) + " extends " + Constants.superClassName(this.curProductionName) + "{");
    }


    afterVisitProduction(node:Production) {
        this.output.push("}");
    }

    afterVisitTerminal(node:Terminal) {

    }

    beforeVisitTerminal(node:Terminal) {
        this.output.push("  public " + Constants.nonTerminalFieldName(Constants.getEnumFromTerminal(node.value), this.symbolIndex) + ": SalgolTerminalClass;");
    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push("  public " + Constants.nonTerminalFieldName(node.value, this.symbolIndex) + ":" + Constants.superClassName(node.prettyValue) + ";");
    }

    afterVisitNonTerminal(node:NonTerminal) {

    }

    beforeVisitEmpty(empty:Empty) {
    }

    afterVisitEmpty(empty:Empty) {
    }
}