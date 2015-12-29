import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class ReformatBNF extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output.push("<html><body>");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("</body></html>");
    }

    beforeVisitProduction(node:Production) {
        if (this.firstProductionVisit) {
            this.output.push("<div><h3>" + this.curProductionName + "</h3>");
        }
    }

    afterVisitProduction(node:Production) {
        this.output.push("</div>");
    }

    beforeVisitMaybeObject(node:MaybeObject) {
        this.output.push("[");
    }

    afterVisitMaybeObject(node:MaybeObject) {
        this.output.push("]");
        if (node.many) {
            this.output.push("*");
        }
    }

    beforeVisitTerminal(node:Terminal) {
        this.output.push(node.value);
    }

    afterVisitTerminal(node:Terminal) {
        return;
    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push("&lt;" + node.value + "&gt;");
    }

    afterVisitNonTerminal(node:NonTerminal) {
        return;
    }
}