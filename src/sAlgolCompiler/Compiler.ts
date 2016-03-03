import {SalgolLexer} from "./Lexer";
import {compileDefault} from "../metaCompiler/BNFParser/Compiler";
import Parser from "./Parser";
import {flatten} from "./MakeAbstract";
import {ScopeChecking} from "./Visitors/ScopeChecking";
import {visit} from "./Visitors/VisitorTraversal";
import {ErrorOutputting} from "./Visitors/ErrorOutputting";
import escodegen = require('escodegen');
import {TypeChecking} from "./Visitors/TypeChecking";
import {stdLib} from "./SaloglSources/SAlgolStd";
import {mergePrograms, Program} from "./AbstractSyntax";

export class Config {
    typeCheck = true;
    prelude = true;
}

function compileToAST(lines: string[]): Program {
    let lexer = new SalgolLexer(lines);
    let lexed = lexer.lex();
    let grammar = compileDefault();
    let parsed = new Parser(lexed, grammar);
    let program  = parsed.parse();
    return flatten(program);

}
export function compile(lines: string[], config?: Config) {
    config = config || new Config();
    let ast = compileToAST(lines);

    if (config.prelude) {
        // ast = mergePrograms(ast, compilePrelude());
    }

    if (config.typeCheck) {
        visit(ast, new ScopeChecking());
        visit(ast, new TypeChecking());
    }

    let errorReport = new ErrorOutputting();
    visit(ast, errorReport);
    if (errorReport.foundErrors) {
        process.exit(1);
    }
    //noinspection TypeScriptUnresolvedFunction
    let outProgram = escodegen.generate(ast.compile());

    return outProgram;
}

function compilePrelude() {
    return compileToAST(stdLib);
}
