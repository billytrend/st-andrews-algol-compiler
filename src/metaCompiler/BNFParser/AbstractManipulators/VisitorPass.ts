import {AbstractPass} from "./AbstractPass";
import {Grammar, Production, MaybeObject, Terminal, NonTerminal, GrammarFeature} from "./../Parser";
import {AbstractVisitor} from "./AbstractVisitor";
import {} from "../Parser";

export class VisitorPass extends AbstractPass<void> {
    private _visitor: AbstractVisitor<void>;

    get visitor():AbstractVisitor<void> {
        return this._visitor;
    }

    set visitor(value:AbstractVisitor<void>) {
        this._visitor = value;
    }

    constructor(visitor: AbstractVisitor<void>) {
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
        for (var pattern of node.mapping) {
            this.visit(pattern);
        }
    }

    passMaybeObject(node: MaybeObject) {
        for (var pattern of node.mapping) {
            this.visit(pattern);
        }
    }

    passTerminal(node: Terminal) {
    }

    passNonTerminal(node: NonTerminal) {
        this.visitor.nonTerminalIndex += 1;
    }
}

