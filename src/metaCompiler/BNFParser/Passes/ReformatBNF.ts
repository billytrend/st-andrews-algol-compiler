import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class ReformatBNF extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output += "<html><body>";
    }

    afterVisitGrammar(node:Grammar) {
        this.output += "</body></html>";
    }

    beforeVisitProduction(node:Production) {
        if (this.firstProductionVisit) {
            this.output += "<div><h3>" + this.curProductionName + "</h3>";
        }
    }

    afterVisitProduction(node:Production) {
        this.output += "</div>";
    }

    beforeVisitMaybeObject(node:MaybeObject) {
        this.output += "[";
    }

    afterVisitMaybeObject(node:MaybeObject) {
        this.output += "]";
        if (node.many) {
            this.output += "*";
        }
    }

    beforeVisitTerminal(node:Terminal) {
        this.output += node.value;
    }

    afterVisitTerminal(node:Terminal) {
        return;
    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output += "&lt;" + node.value + "&gt;";
    }

    afterVisitNonTerminal(node:NonTerminal) {
        return;
    }
}