import {lex} from "./Lexer";
import {compileDefault} from "../metaCompiler/BNFParser/Compiler";
import Parser from "./Parser";
import {flatten} from "./MakeAbstract";
import {ScopeChecking} from "./Visitors/ScopeChecking";
import {visit} from "./Visitors/VisitorTraversal";
import {ErrorOutputting} from "./Visitors/ErrorOutputting";
import escodegen = require('escodegen');
import {TypeChecking} from "./Visitors/TypeChecking";

export function compile(lines: string[]) {
    let lexed = lex(lines);
    let grammar = compileDefault();
    let parsed = new Parser(lexed, grammar);
    let programme  = parsed.parse();
    let flat = flatten(programme);
    visit(flat, new ScopeChecking());
    visit(flat, new TypeChecking());
    let errorReport = new ErrorOutputting();
    visit(flat, errorReport);
    if (errorReport.foundErrors) {
        process.exit(1);
    }
    //noinspection TypeScriptUnresolvedFunction
    let outProgram = escodegen.generate(flat.compile());

    return outProgram;
}
