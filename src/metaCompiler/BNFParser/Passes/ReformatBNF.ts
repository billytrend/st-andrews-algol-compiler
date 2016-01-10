import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {Empty} from "../Parser";
var escape = require('escape-html');

export class ReformatBNF extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output.push("<html><body>");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("</body></html>");
    }

    beforeVisitProductionName(node: string) {
    }

    afterVisitProductionName(node: string) {
    }

    beforeVisitProduction(node:Production) {
        if (this.firstProductionVisit) {
            this.output.push("<div><h3>" + escape(this.curProductionName) + "</h3><ul>");
        }
        this.output.push("<li>")
    }

    afterVisitProduction(node:Production) {
        this.output.push("</li>");
        if (this.lastProductionVisit) {
            this.output.push("</ul></div>");
        }
    }

    beforeVisitTerminal(node:Terminal) {
        this.output.push(node.value);
    }

    afterVisitTerminal(node:Terminal) {
        return;
    }

    beforeVisitNonTerminal(node:NonTerminal) {
        this.output.push(escape(node.value));
    }

    afterVisitNonTerminal(node:NonTerminal) {
        return;
    }

    beforeVisitEmpty(empty:Empty) {
        this.output.push("E");
    }

    afterVisitEmpty(empty:Empty) {
    }
}