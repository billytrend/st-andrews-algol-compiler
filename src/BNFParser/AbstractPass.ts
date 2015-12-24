import Parser = require('./Parser');

export abstract class ASTPass<T> {
    pass(node: Parser.GrammarFeature) {
        if(node instanceof Parser.Grammar) {
            this.passGrammar(<Parser.Grammar>node)
        } else if(node instanceof Parser.Production) {
            this.passProduction(<Parser.Production>node)
        } else if(node instanceof Parser.MaybeObject) {
            this.passMaybeObject(<Parser.MaybeObject>node)
        } else if(node instanceof Parser.Terminal) {
            this.passTerminal(<Parser.Terminal>node)
        } else if(node instanceof Parser.NonTerminal) {
            this.passNonTerminal(<Parser.NonTerminal>node)
        }
    }

    abstract passGrammar(node: Parser.Grammar): T;

    abstract passProduction(node: Parser.Production): T;

    abstract passMaybeObject(node: Parser.MaybeObject): T;

    abstract passTerminal(node: Parser.Terminal): T;

    abstract passNonTerminal(node: Parser.NonTerminal): T;
}
