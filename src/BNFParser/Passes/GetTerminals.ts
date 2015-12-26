import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class ValidateBNF extends AbstractVisitor<void> {
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

    beforeVisitGrammar(node:Grammar):void {
        this.productions = node.productions;
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
    }

    beforeVisitNonTerminal(node:NonTerminal):void {
        if (!this.productions.hasOwnProperty(node.value)) {
            this._missingProductions[node.value] = true;
        }
    }

    afterVisitNonTerminal(node:NonTerminal):void {
    }
}

let visitor = new ValidateBNF();
let visitorPass = new VisitorPass(visitor);
visitorPass.visit(compile());
console.log(visitor.isValid());
