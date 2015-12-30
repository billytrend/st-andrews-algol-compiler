import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";
import {Empty} from "../Parser";

export class MakeDoupleDispatch extends AbstractVisitor {
    private _name: string = "pass";
    private _prefix: string = "pass";

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

    beforeVisitGrammar(node:Grammar) {
        this.output.push(this.name + "(node: GrammarObject) {");
    }

    afterVisitGrammar(node:Grammar) {
        this.output.push("}");
        this.output.push("}");
        this.output.unshift("export abstract class AbstractPass {");
        this.output.unshift("import * as ConcreteSyntax from './ConcreteSyntax'");

    }

    beforeVisitProduction(node:Production) {
        this.output.unshift("}");
        this.output.unshift(this._prefix + "_" + this.curProductionName + this.productionIndex + "(node: ConcreteSyntax."+this.curProductionName + this.productionIndex+") {");
        this.output.push("if (node instanceof ConcreteSyntax." + this.curProductionName + this.productionIndex + ") {");
        this.output.push("this." + this._prefix + "_" + this.curProductionName + this.productionIndex +
            "(node);");
        this.output.push("}");
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