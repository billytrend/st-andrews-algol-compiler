import {testCases} from "../test/Salogol/TestPrograms";

for (let example of testCases) {
    console.log("\\begin{lstlisting}\n" + example.input + "\n\\end{lstlisting}\n", "&", "\\begin{lstlisting}\n" + example.output.join("\n") + "\n\\end{lstlisting}\n", "\\\\ \\hline");
}