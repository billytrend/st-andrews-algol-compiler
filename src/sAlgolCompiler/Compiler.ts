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
import esprima = require('esprima');
import {prelude} from "./SaloglSources/Prelude";
import {SalgolTerminal} from "./GeneratedFiles/SalgolTerminal";

export class Config {
    typeCheck = true;
    prelude = true;
}

function compileToAST(lines: string[]): Program {
    let lexer = new SalgolLexer(lines);
    let lexed = lexer.lex();
    // for (let i of lexed) {
    //    console.log(SalgolTerminal[i.type]);
    // }

    let grammar = compileDefault();
    let parsed = new Parser(lexed, grammar);
    let program  = parsed.parse();
    return flatten(program);

}
export function compile(lines: string[], config?: Config) {
    config = config || new Config();
    let ast = compileToAST(lines);

    if (config.prelude) {
        // ast = mergePrograms(compilePrelude(), ast);
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
    let estreeObj = ast.compile();
    let preludeAst = esprima.parse(prelude());
    estreeObj.body = estreeObj.body.concat(preludeAst.body);
    //noinspection TypeScriptUnresolvedFunction
    let outProgram = escodegen.generate(estreeObj);

    return outProgram;
}

function compilePrelude() {
    return compileToAST(stdLib());
}
