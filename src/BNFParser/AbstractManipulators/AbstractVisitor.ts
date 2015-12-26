import {GrammarFeature} from "./../Parser";
import {Grammar} from "./../Parser";
import {MaybeObject} from "./../Parser";
import {Production} from "./../Parser";
import {Terminal} from "./../Parser";
import {NonTerminal} from "./../Parser";

export abstract class AbstractVisitor<T> {
    private _curProductionName: string;
    private _productionIndex: number = 0;
    private _nonTerminalIndex: number = 0;


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

    get curProductionName():string {
        return this._curProductionName;
    }

    set curProductionName(value:string) {
        this._curProductionName = value;
    }

    beforeVisit(node: GrammarFeature): T {
        if(node instanceof Grammar) {
            return this.beforeVisitGrammar(<Grammar>node)
        } else if(node instanceof MaybeObject) {
            return this.beforeVisitMaybeObject(<MaybeObject>node)
        } else if(node instanceof Production) {
            return this.beforeVisitProduction(<Production>node)
        } else if(node instanceof Terminal) {
            return this.beforeVisitTerminal(<Terminal>node)
        } else if(node instanceof NonTerminal) {
            return this.beforeVisitNonTerminal(<NonTerminal>node)
        }
    }

    afterVisit(node: GrammarFeature): T {
        if(node instanceof Grammar) {
            return this.afterVisitGrammar(<Grammar>node)
        } else if(node instanceof MaybeObject) {
            return this.afterVisitMaybeObject(<MaybeObject>node)
        } else if(node instanceof Production) {
            return this.afterVisitProduction(<Production>node)
        } else if(node instanceof Terminal) {
            return this.afterVisitTerminal(<Terminal>node)
        } else if(node instanceof NonTerminal) {
            return this.afterVisitNonTerminal(<NonTerminal>node)
        }
    }

    abstract beforeVisitGrammar(node: Grammar): T;

    abstract afterVisitGrammar(node: Grammar): T;

    abstract beforeVisitProduction(node: Production): T;

    abstract afterVisitProduction(node: Production): T;

    abstract beforeVisitMaybeObject(node: MaybeObject): T;

    abstract afterVisitMaybeObject(node: MaybeObject): T;

    abstract beforeVisitTerminal(node: Terminal): T;

    abstract afterVisitTerminal(node: Terminal): T;

    abstract beforeVisitNonTerminal(node: NonTerminal): T;

    abstract afterVisitNonTerminal(node: NonTerminal): T;

}