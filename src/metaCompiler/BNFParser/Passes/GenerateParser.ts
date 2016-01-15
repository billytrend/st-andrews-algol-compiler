import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {intuitDelimeters} from "../../Utilities";
import {Empty} from "../Parser";
import {Constants} from "../Constants";

export class GenerateParser extends AbstractVisitor {

    beforeVisitGrammar(node:Grammar) {
        this.output.push("import Parser from '@{Constants.parserHelper}'");
        this.output.push("public class SalgolParser extends Parser<SalgolLexSymbol> {");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("}");
    }

    beforeVisitProductionName(node:string) {
        this.output.push("public parse" + node + "(): " + node + "{");
    }

    afterVisitProductionName(node:string) {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production) {
    }

    afterVisitProduction(node:Production) {
    }

    beforeVisitTerminal(node:Terminal) {
    }

    afterVisitTerminal(node:Terminal) {
    }

    beforeVisitNonTerminal(node:NonTerminal) {
    }

    afterVisitNonTerminal(node:NonTerminal) {
    }

    beforeVisitEmpty(empty:Empty) {
    }

    afterVisitEmpty(empty:Empty) {
    }

}