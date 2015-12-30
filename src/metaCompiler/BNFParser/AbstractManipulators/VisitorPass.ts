import {AbstractPass} from "./AbstractPass";
import {Grammar, Production, Terminal, NonTerminal, GrammarFeature} from "./../Parser";
import {AbstractVisitor} from "./AbstractVisitor";
import {} from "../Parser";
import {Empty} from "../Parser";

export class VisitorPass extends AbstractPass<void> {
    private _visitor: AbstractVisitor;

    get visitor():AbstractVisitor {
        return this._visitor;
    }

    set visitor(value:AbstractVisitor) {
        this._visitor = value;
    }

    constructor(visitor: AbstractVisitor) {
        super();
        this.visitor = visitor;
    }

    public visit(node:GrammarFeature) {
        this.visitor.beforeVisit(node);
        this.pass(node);
        this.visitor.afterVisit(node);
    }

    passGrammar(node: Grammar) {
        for (var productionName in node.productions) {
            this.visitor.curProductionName = productionName;
            this.visitor.productionIndex = 0;
            for (var prod of node.productions[productionName]) {
                this.visitor.nonTerminalIndex = 0;
                this.visit(prod);
                this.visitor.productionIndex += 1;
            }
        }
    }

    passProduction(node:Production) {
        for (var pattern of node.sequence) {
            this.visit(pattern);
        }
    }

    passTerminal(node: Terminal) {
    }

    passEmpty(node:Empty) {
    }

    passNonTerminal(node: NonTerminal) {
        this.visitor.nonTerminalIndex += 1;
    }
}

