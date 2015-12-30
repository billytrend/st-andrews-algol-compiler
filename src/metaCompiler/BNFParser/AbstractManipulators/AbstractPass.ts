import * as Parser from './../Parser';

export abstract class AbstractPass<T> {
    pass(node: Parser.GrammarFeature): T {
        if(node instanceof Parser.Grammar) {
            return this.passGrammar(<Parser.Grammar>node)
        } else if(node instanceof Parser.Production) {
            return this.passProduction(<Parser.Production>node)
        } else if(node instanceof Parser.Terminal) {
            return this.passTerminal(<Parser.Terminal>node)
        } else if(node instanceof Parser.NonTerminal) {
            return this.passNonTerminal(<Parser.NonTerminal>node)
        } else if(node instanceof Parser.Empty) {
            return this.passEmpty(<Parser.Empty>node)
        }
    }

    abstract passGrammar(node: Parser.Grammar): T;

    abstract passEmpty(node: Parser.Empty): T;

    abstract passProduction(node: Parser.Production): T;

    abstract passTerminal(node: Parser.Terminal): T;

    abstract passNonTerminal(node: Parser.NonTerminal): T;
}
