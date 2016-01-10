import {GrammarFeature} from "./../Parser";
import {Grammar} from "./../Parser";
import {Production} from "./../Parser";
import {Terminal} from "./../Parser";
import {NonTerminal} from "./../Parser";
import {Empty} from "../Parser";

export abstract class AbstractVisitor {
    private _curProductionName: string;
    private _productionIndex: number = 0;
    private _nonTerminalIndex: number = 0;
    private _output: string[] = [];
    private grammar: Grammar;

    get output():string[] {
        return this._output;
    }

    set output(value:string[]) {
        this._output = value;
    }


    get nonTerminalIndex():number {
        return this._nonTerminalIndex;
    }

    set nonTerminalIndex(value:number) {
        this._nonTerminalIndex = value;
    }

    get productionIndex():number {
        return this._productionIndex;
    }

    set productionIndex(value:number) {
        this._productionIndex = value;
    }

    get firstProductionVisit():boolean {
        return this.productionIndex == 0;
    }

    get lastProductionVisit():boolean {
        return this.productionIndex == this.grammar.productions[this.curProductionName].length - 1;
    }

    get curProductionName():string {
        return this._curProductionName;
    }

    set curProductionName(value:string) {
        this._curProductionName = value;
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
}