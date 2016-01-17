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
import {ASCII} from "../../../assorted/ASCII";

export class MakeLexerEnum extends AbstractVisitor {
    private seen: {} = {};

    beforeVisitGrammar(node:Grammar) {
        this.output.push("enum " + Constants.lexerEnumName + " {");
    }

    afterVisitGrammar(node:Grammar) {
        this.output[this.output.length - 1] = this.output[this.output.length - 1].slice(0, -1);
        this.output.push("}");
    }

    beforeVisitProductionName(node:string) {
    }

    afterVisitProductionName(node:string) {
    }

    beforeVisitProduction(node:Production) {
    }

    afterVisitProduction(node:Production) {
    }

    beforeVisitTerminal(node:Terminal) {
        let symbol = Constants.getEnumFromTerminal(node.value);

        if (!this.seen.hasOwnProperty(symbol)) {
            this.seen[symbol] = true;
            this.output.push(symbol + ",");
        }
    }

    afterVisitTerminal(node:Terminal) {
    }

    beforeVisitNonTerminal(node: NonTerminal) {
    }

    afterVisitNonTerminal(node:NonTerminal) {
    }

    beforeVisitEmpty(empty:Empty) {
    }

    afterVisitEmpty(empty:Empty) {
    }
}