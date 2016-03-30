export var testCases = [
    { input: "write 2?", output: ['2'] , name:"Simple write", description:""},
    { input: "if true \nthen write 1\nelse write 2?", output: ['1'] , name:"True conditional", description:""},
    { input: "if false\nthen write 1\nelse write 2?", output: ['2'] , name:"False conditional", description:""},
    { input: "let a = 4;\na := a + 1;\nwrite a?", output: ['5'] , name:"Variable assignment", description:""},
    { input: "let a = 4;\nrepeat a := a + 1 while a < 10;\nwrite a?", output: ['10'] , name:"Repeat-while loop", description:""},
    { input: "let a = 4;\nwhile a < 10 do a := a + 1;\nwrite a?", output: ['10'] , name:"While-do loop", description:""},
    { input: "let a = 0;\nrepeat {write 1;\na := a + 1} while a < 2 do write 2?", output: ['1', '2', '1'] , name:"Repeat-while-do loop", description:""},
    { input: "let a = 0;\nbegin\n\tlet a = 4;\n\twrite a \nend;\nwrite a?", output: ['4', '0'] , name:"Begin-end block scoping", description:""},
    { input: "let a = 0;\n{\n\tlet a = 4;\n\twrite a\n};\nwrite a?", output: ['4', '0'] , name:"Curly bracket block scoping", description:""},
    { input: "let a = @ 0 of int[1,2,3,4];\nwrite a(3)?", output: ['4'] , name:"Vector access", description:""},
    { input: "let a = @ 0 of *int[@ 2 of int[1,2,3,4]];\nwrite a(0, 2)?", output: ['1'] , name:"Multi-dimensional array access", description:""},
    { input: "procedure a(int b -> int); b;\nwrite(a(4))?", output: ['4'] , name:"Procedure definition", description:""},
    { input: "procedure a(real b -> real); b;\nwrite(a(4.12))?", output: ['4.12'] , name:"Real type", description:""},
    { input: "let a = @ 0 of int [1,2,3,4];\nprocedure b(*int arr -> int); arr(2);\nwrite(b(a))?", output: ['3'] , name:"Array assignment and passing", description:""},
    { input: "let a := -1;\nwrite abs(a)?", output: ['1'], name:"ABS standard library function", description:"" }
];
