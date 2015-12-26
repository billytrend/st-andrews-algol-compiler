import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";

export class MakeClassDefinitions extends AbstractVisitor<void> {
    private _output: string = "";

    get output():string {
        return this._output;
    }

    set output(value:string) {
        this._output = value;
    }

    beforeVisitGrammar(node:Grammar):void {
        this.output = "module SalgolTypes {";
    }

    afterVisitGrammar(node:Grammar):void {
        return undefined;
    }

    beforeVisitProduction(node:Production):void {
        return undefined;
    }

    afterVisitProduction(node:Production):void {
        return undefined;
    }

    beforeVisitMaybeObject(node:MaybeObject):void {
        return undefined;
    }

    afterVisitMaybeObject(node:MaybeObject):void {
        return undefined;
    }

    beforeVisitTerminal(node:Terminal):void {
        return undefined;
    }

    afterVisitTerminal(node:Terminal):void {
        return undefined;
    }

    beforeVisitNonTerminal(node:NonTerminal):void {
        return undefined;
    }

    afterVisitNonTerminal(node:NonTerminal):void {
        return undefined;
    }

}