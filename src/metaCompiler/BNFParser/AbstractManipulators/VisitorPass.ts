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
        this.visitor.grammar = node;
        for (var productionName in node.productions) {
            this.visitor.curProductionName = productionName;
            this.visitor.productionIndex = 0;
            this.visitor.productionIndex = 0;
            this.visitor.beforeVisit(productionName);
            for (var prod of node.productions[productionName]) {
                this.visitor.nonTerminalIndex = 0;
                this.visitor.symbolIndex = 0;
                this.visit(prod);
                this.visitor.productionIndex += 1;
            }
            this.visitor.afterVisit(productionName);
        }
    }

    passProduction(node:Production) {
        for (var pattern of node.sequence) {
            this.visit(pattern);
        }
    }

    passTerminal(node: Terminal) {
        this.visitor.symbolIndex += 1;
    }

    passEmpty(node: Empty) {
    }

    passNonTerminal(node: NonTerminal) {
        this.visitor.nonTerminalIndex += 1;
        this.visitor.symbolIndex += 1;
    }
}

