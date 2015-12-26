import Parser = require('./../Parser');

export abstract class AbstractPass<T> {

    pass(node: Parser.GrammarFeature): T {
        if(node instanceof Parser.Grammar) {
            return this.passGrammar(<Parser.Grammar>node)
        } else if(node instanceof Parser.MaybeObject) {
            return this.passMaybeObject(<Parser.MaybeObject>node)
        } else if(node instanceof Parser.Production) {
            return this.passProduction(<Parser.Production>node)
        } else if(node instanceof Parser.Terminal) {
            return this.passTerminal(<Parser.Terminal>node)
        } else if(node instanceof Parser.NonTerminal) {
            return this.passNonTerminal(<Parser.NonTerminal>node)
        }
    }

    abstract passGrammar(node: Parser.Grammar): T;

    abstract passProduction(node: Parser.Production): T;

    abstract passMaybeObject(node: Parser.MaybeObject): T;

    abstract passTerminal(node: Parser.Terminal): T;

    abstract passNonTerminal(node: Parser.NonTerminal): T;
}
