import {SalgolLexer} from "./Lexer";
import {compileDefault} from "../metaCompiler/BNFParser/Compiler";
import Parser from "./Parser";
import {flatten} from "./MakeAbstract";
import {ScopeChecking} from "./visitors/ScopeChecking";
import {visit} from "./visitors/VisitorTraversal";
import {ErrorOutputting} from "./visitors/ErrorOutputting";
let escodegen = require('escodegen');
import {TypeChecking} from "./visitors/TypeChecking";
import {stdLib} from "./sAlgolSources/SAlgolStd";
import {mergePrograms, Program} from "./AbstractSyntax";
import esprima = require('esprima');
import {prelude} from "./sAlgolSources/Prelude";
import {SalgolTerminal} from "./generatedFiles/SalgolTerminal";
import {ConsoleLine} from "../web/ConsoleLine";
import {LineType} from "../web/ConsoleLine";

export class Config {
    typeCheck = true;
    prelude = true;
}

export class Results {
    generatedCode: string;
    errors: string[] = [];

    constructor(errors:string[], generatedCode?:string) {
        this.generatedCode = generatedCode;
        this.errors = errors;
    }

    consoleLines(): ConsoleLine[] {
        if (this.errors.length > 0) {
            return this.errors.map(err => new ConsoleLine(err, LineType.stderr));
        }
        return this.generatedCode.split('\n').map(l => new ConsoleLine(l, LineType.stdout, (l.match(/[\ ]{4}/g) || []).length))
    }
}

function compileToAST(lines: string[]): Program {
    let lexer = new SalgolLexer(lines);
    let lexed = lexer.lex();
    let grammar = compileDefault();
    let parsed = new Parser(lexed, grammar);
    let program;
    program  = parsed.parse();
    return flatten(program);
}

export function compile(lines: string[], config?: Config): Results {
    config = config || new Config();
    let ast;

    try {
        ast = compileToAST(lines);
    } catch (error) {
        return new Results([`[Parser Error] ${error}`]);
    }

    if (config.prelude) {
         ast = mergePrograms(compilePrelude(), ast);
    }

    if (config.typeCheck) {
         //visit(ast, new ScopeChecking());
        visit(ast, new TypeChecking());
    }

    let errorReport = new ErrorOutputting(false);
    visit(ast, errorReport);

    if (errorReport.foundErrors) {
        return new Results(errorReport.errorStrings);
    }

    let estreeObj = ast.compile();
    let preludeAst = esprima.parse(prelude());
    estreeObj.body = preludeAst.body.concat(estreeObj.body);
    //noinspection TypeScriptUnresolvedFunction
    let outProgram = escodegen.generate(estreeObj);

    return new Results([], outProgram);
}

export function simpleCompile(lines: string[]): Results {
    let ast = compileToAST(lines);

    //ast = mergePrograms(compilePrelude(), ast);
    visit(ast, new TypeChecking());

    let errorReport = new ErrorOutputting(false);
    visit(ast, errorReport);

    if (errorReport.foundErrors) {
        return new Results(errorReport.errorStrings);
    }

    let outProgram = escodegen.generate(ast.compile());

    return new Results([], outProgram);
}

export function compileAndRun(lines: string[]): ConsoleLine[] {
    let output: ConsoleLine[] = [];
    let oldLog = console.log;
    let oldErr = console.error;
    let logger = function(type) {
        var args = [].slice.call(arguments, 1);
        output = output.concat(args.map(x => new ConsoleLine(x.toString(), type)));
    };
    console.log = logger.bind(null, LineType.stdout);
    console.error = logger.bind(null, LineType.stderr);
    let program = compile(lines);

    if (program.errors.length > 0) {
        return program.consoleLines();
    }

    eval(program.generatedCode);
    console.log = oldLog;
    console.error = oldErr;
    return output;
}

function compilePrelude() {
    return compileToAST(stdLib());
}
