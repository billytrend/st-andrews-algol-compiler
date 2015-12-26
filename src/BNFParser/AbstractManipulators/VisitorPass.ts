import {AbstractPass} from "./AbstractPass";
import {Grammar, Production, MaybeObject, Terminal, NonTerminal} from "./../Parser";
import {AbstractVisitor} from "./AbstractVisitor";
import {GrammarFeature} from "./../Parser";

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
    }

    passGrammar(node: Grammar) {
        for (var productionName in node.productions) {
            this.visitor.curProduction = productionName;
            this.visit(node.productions[productionName]);
        }
        this.visitor.afterVisit(node);
    }

    passProduction(node:Production) {
        for (var pattern of node.mapping) {
            this.visit(pattern);
        }
        this.visitor.afterVisit(node);
    }

    passMaybeObject(node: MaybeObject) {
        this.visitor.afterVisit(node);
    }

    passTerminal(node: Terminal) {
        this.visitor.afterVisit(node);
    }

    passNonTerminal(node: NonTerminal) {
        this.visitor.afterVisit(node);
    }
}

