import {GrammarFeature} from "./../Parser";
import {Grammar} from "./../Parser";
import {Production} from "./../Parser";
import {Terminal} from "./../Parser";
import {NonTerminal} from "./../Parser";
import {Empty} from "../Parser";

export abstract class AbstractVisitor {
    public curProductionName: string;
    public productionIndex: number = 0;
    public nonTerminalIndex: number = 0;
    public symbolIndex: number = 0;
    public output: string[] = [];
    public grammar: Grammar;

    get firstProductionVisit():boolean {
        return this.productionIndex == 0;
    }

    get lastProductionVisit():boolean {
        return this.productionIndex == this.grammar.productions[this.curProductionName].length - 1;
    }

    beforeVisit(node: GrammarFeature) {
        if(node instanceof Grammar) {
            return this.beforeVisitGrammar(<Grammar>node)
        } else if(node instanceof Production) {
            return this.beforeVisitProduction(<Production>node)
        } else if(node instanceof Terminal) {
            return this.beforeVisitTerminal(<Terminal>node)
        } else if(node instanceof NonTerminal) {
            return this.beforeVisitNonTerminal(<NonTerminal>node)
        }  else if(node instanceof Empty) {
            return this.beforeVisitEmpty(<Empty>node)
        } else if(typeof node === "string") {
            return this.beforeVisitProductionName(<string>node)
        }
    }

    afterVisit(node: GrammarFeature) {
        if(node instanceof Grammar) {
            return this.afterVisitGrammar(<Grammar>node)
        } else if(node instanceof Production) {
            return this.afterVisitProduction(<Production>node)
        } else if(node instanceof Terminal) {
            return this.afterVisitTerminal(<Terminal>node)
        } else if(node instanceof NonTerminal) {
            return this.afterVisitNonTerminal(<NonTerminal>node)
        } else if(node instanceof Empty) {
            return this.afterVisitEmpty(<Empty>node)
        } else if(typeof node === "string") {
            return this.afterVisitProductionName(<string>node)
        }
    }

    abstract beforeVisitGrammar(node: Grammar);

    abstract afterVisitGrammar(node: Grammar);

    abstract beforeVisitProduction(node: Production);

    abstract afterVisitProduction(node: Production);

    abstract beforeVisitTerminal(node: Terminal);

    abstract afterVisitTerminal(node: Terminal);

    abstract beforeVisitNonTerminal(node: NonTerminal);

    abstract afterVisitNonTerminal(node: NonTerminal);

    abstract beforeVisitEmpty(empty:Empty);

    abstract afterVisitEmpty(empty:Empty);

    abstract beforeVisitProductionName(node:string);

    abstract afterVisitProductionName(node:string);
}