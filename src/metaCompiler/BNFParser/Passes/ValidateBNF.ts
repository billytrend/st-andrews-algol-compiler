import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class ValidateBNF extends AbstractVisitor {
    private _productions: {};
    private _missingProductions: {} = {};

    get productions():{} {
        return this._productions;
    }

    get missingProductions():string[] {
        return Object.keys(this._missingProductions);
    }

    set productions(value:{}) {
        this._productions = value;
    }

    isValid(): boolean {
        return this.missingProductions.length == 0;
    }

    beforeVisitGrammar(node:Grammar) {
        this.productions = node.productions;
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
    }

    beforeVisitNonTerminal(node:NonTerminal) {
        if (!this.productions.hasOwnProperty(node.value)) {
            this._missingProductions[node.value] = true;
        }
    }

    afterVisitNonTerminal(node:NonTerminal) {
    }
}