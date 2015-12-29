import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {intuitDelimeters} from "../../Utilities";

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

    beforeVisitMaybeObject(node:MaybeObject) {
    }

    afterVisitMaybeObject(node:MaybeObject) {
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
}