import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class MakeDoupleDispatch extends AbstractVisitor<void> {
    private _name: string = "";
    private _prefix: string = "";

    get prefix():string {
        return this._prefix;
    }

    set prefix(value:string) {
        this._prefix = value;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    beforeVisitGrammar(node:Grammar):void {
        this.output.push("function " + this.name + "(node: GrammarObject) {");
    }

    afterVisitGrammar(node:Grammar):void {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production):void {
        this.output.push("if (node typeof " + this.curProductionName + this.productionIndex + ") {");
        this.output.push(this._prefix + "_" + this.curProductionName + this.productionIndex +
            "(<"+this.curProductionName + this.productionIndex+">node);");
        this.output.push("}");
    }


    afterVisitProduction(node:Production):void {
        this.output.push("}");
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
    }

    afterVisitNonTerminal(node:NonTerminal):void {
    }

}