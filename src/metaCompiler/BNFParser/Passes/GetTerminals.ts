import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {intuitDelimeters} from "../../Utilities";

export class GetTerminals extends AbstractVisitor<void> {
    private _terminals: {} = {};

    get terminals():string[] {
        return Object.keys(this._terminals);
    }

    beforeVisitGrammar(node:Grammar):void {
    }

    afterVisitGrammar(node:Grammar):void {
    }

    beforeVisitProduction(node:Production):void {
    }

    afterVisitProduction(node:Production):void {
    }

    beforeVisitMaybeObject(node:MaybeObject):void {
    }

    afterVisitMaybeObject(node:MaybeObject):void {
    }

    beforeVisitTerminal(node:Terminal):void {
    }

    afterVisitTerminal(node:Terminal):void {
        this._terminals[node.value] = true;
    }

    beforeVisitNonTerminal(node:NonTerminal):void {
    }

    afterVisitNonTerminal(node:NonTerminal):void {
    }
}