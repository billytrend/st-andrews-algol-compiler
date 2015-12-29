import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class MakeLexer extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output.push("module SalgolLexer {");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production) {
        if (this.firstProductionVisit) {
            this.output.push("public function lex" + this.curProductionName + "() {");
            this.output.push("public var output:string = []");
        }
        this.output.push("output = ");

        this.output.push("export class " + this.curProductionName + this.productionIndex + " extends " + this.curProductionName + "{");
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
        this.output.push("  public " + node.value + this.nonTerminalIndex + ":" + node.value + ";");
    }

    afterVisitNonTerminal(node:NonTerminal) {

    }

}