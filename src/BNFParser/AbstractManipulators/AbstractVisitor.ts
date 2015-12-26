import {GrammarFeature} from "./../Parser";
import {Grammar} from "./../Parser";
import {MaybeObject} from "./../Parser";
import {Production} from "./../Parser";
import {Terminal} from "./../Parser";
import {NonTerminal} from "./../Parser";

export abstract class AbstractVisitor<T> {
    visit(node: GrammarFeature): T {
        if(node instanceof Grammar) {
            return this.visitGrammar(<Grammar>node)
        } else if(node instanceof MaybeObject) {
            return this.visitMaybeObject(<MaybeObject>node)
        } else if(node instanceof Production) {
            return this.visitProduction(<Production>node)
        } else if(node instanceof Terminal) {
            return this.visitTerminal(<Terminal>node)
        } else if(node instanceof NonTerminal) {
            return this.visitNonTerminal(<NonTerminal>node)
        }
    }

    abstract visitGrammar(node: Grammar): T;

    abstract visitProduction(node: Production): T;

    abstract visitMaybeObject(node: MaybeObject): T;

    abstract visitTerminal(node: Terminal): T;

    abstract visitNonTerminal(node: NonTerminal): T;
}