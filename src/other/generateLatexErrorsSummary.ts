import {errorCases} from "../test/Salogol/TestPrograms";
import {compile} from "../sAlgolCompiler/Compiler";

for (let example of errorCases) {
    console.log("\\begin{lstlisting}\n" + example.input + "\n\\end{lstlisting}\n", "&", compile(example.input.split("\n")).errors.join("\n"), "\\\\ \\hline");
}