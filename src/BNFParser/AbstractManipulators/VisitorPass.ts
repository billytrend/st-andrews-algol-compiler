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
            this.visitor.firstProductionVisit = true;
            this.visitor.curProductionName = productionName;
            for (var prod of node.productions[productionName]) {
                this.visit(prod);
                this.visitor.firstProductionVisit = false;
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
    }
}

