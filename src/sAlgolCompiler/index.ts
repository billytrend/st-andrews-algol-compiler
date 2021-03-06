var readline = require('readline');
let ArgumentParser = require('argparse');
import {compile} from './Compiler';

//noinspection TypeScriptUnresolvedFunction
var parser = new ArgumentParser.ArgumentParser({
    version: '0.0.1',
    addHelp:true,
    description: 'S-Algol to javascript compiler.'
});

parser.addArgument(
    [ '-cs', '--compile-string' ], {
        help: 'Accepts a string for compilation.',
        nargs: 1
    }
);

parser.addArgument(
    [ '-c', '--compile' ], {
        help: 'Accepts a file-name for compilation.',
        nargs: 1
    }
);

parser.addArgument(
    [ '-o', '--out' ], {
        help: 'Accepts a file or directory name in which to save the results of compilation.',
        nargs: 1
    }
);

parser.addArgument(
    [ '-e', '--exec' ], {
        help: 'Enables execution of input and outputting of results to the terminal.',
        nargs: 0
    }
);

var args = parser.parseArgs();
let lines = [];

if (args.compile_string) {
    lines = args.compile_string;
    output();
} else if (args.compile) {

} else  {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function (line) {
        lines.push(line);
        if (line.match(/[\?$]/)) {
            output();
        }
    });
}

function output() {
    let compiled = compile(lines);
    if (args.exec) {
        eval(compiled.generatedCode);
    } else if (compiled.errors.length > 0) {
        for (let err of compiled.errors) {
            console.error(err);
        }
    } else {
        console.log(compiled.generatedCode);
    }

}