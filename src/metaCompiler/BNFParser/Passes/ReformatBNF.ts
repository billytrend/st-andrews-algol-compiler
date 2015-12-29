import {AbstractPass} from'../AbstractManipulators/AbstractPass';
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "../Parser";
import {compile} from "../Compiler";
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class ReformatBNF extends AbstractVisitor<void> {

    beforeVisitGrammar(node:Grammar):void {
        this.output += "<html><body>";
    }

    afterVisitGrammar(node:Grammar):void {
        this.output += "</body></html>";
    }

    beforeVisitProduction(node:Production):void {
        if (this.firstProductionVisit) {
            this.output += "<div><h3>" + this.curProductionName + "</h3>";
        }
    }

    afterVisitProduction(node:Production):void {
        this.output += "</div>";
    }

    beforeVisitMaybeObject(node:MaybeObject):void {
        this.output += "[";
    }

    afterVisitMaybeObject(node:MaybeObject):void {
        this.output += "]";
        if (node.many) {
            this.output += "*";
        }
    }

    beforeVisitTerminal(node:Terminal):void {
        this.output += node.value;
    }

    afterVisitTerminal(node:Terminal):void {
        return;
    }

    beforeVisitNonTerminal(node:NonTerminal):void {
        this.output += "&lt;" + node.value + "&gt;";
    }

    afterVisitNonTerminal(node:NonTerminal):void {
        return;
    }

    private _output: string = "";

    get output():string {
        return this._output;
    }

    set output(value:string) {
        this._output = value;
    }
}