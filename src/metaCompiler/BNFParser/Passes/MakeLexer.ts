import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {Grammar} from "../Parser";
import {Production} from "../Parser";
import {MaybeObject} from "../Parser";
import {Terminal} from "../Parser";
import {NonTerminal} from "../Parser";
import {compile} from "../Compiler";
import {ReformatBNF} from "./ReformatBNF";
import {VisitorPass} from "../AbstractManipulators/VisitorPass";

export class MakeLexer extends AbstractVisitor<void> {

    beforeVisitGrammar(node:Grammar):void {
        this.output.push("module SalgolLexer {");
    }

    afterVisitGrammar(node:Grammar):void {
        this.output.push("}");
    }

    beforeVisitProduction(node:Production):void {
        if (this.firstProductionVisit) {
            this.output.push("public function lex" + this.curProductionName + "() {");
            this.output.push("public var output:string = []");
        }
        this.output.push("output = ");

        this.output.push("export class " + this.curProductionName + this.productionIndex + " extends " + this.curProductionName + "{");
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
        this.output.push("  public " + node.value + this.nonTerminalIndex + ":" + node.value + ";");
    }

    afterVisitNonTerminal(node:NonTerminal):void {

    }

}

let visitor = new MakeClassDefinitions();
let visitorPass = new VisitorPass(visitor);
visitorPass.visit(compile());

for (var o of visitor.output) {
    console.log(o);
}
