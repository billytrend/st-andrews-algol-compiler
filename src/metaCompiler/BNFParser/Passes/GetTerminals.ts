import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {intuitDelimeters} from "../../Utilities";
import {Empty} from "../Parser";

export class GetTerminals extends AbstractVisitor {
    private _terminals: {} = {};

    get terminals():string[] {
        return Object.keys(this._terminals);
    }

    beforeVisitGrammar(node:Grammar) {
    }

    afterVisitGrammar(node:Grammar) {
    }

    beforeVisitProduction(node:Production) {
    }

    afterVisitProduction(node:Production) {
    }

    beforeVisitTerminal(node:Terminal) {
    }

    afterVisitTerminal(node:Terminal) {
        this._terminals[node.value] = true;
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