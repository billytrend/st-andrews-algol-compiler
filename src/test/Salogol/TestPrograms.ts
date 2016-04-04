export var testCases = [
    { input: "write 2 = 2?", output: ['true'] , name:"Bool test", description:""},
    { input: "write 2?", output: ['2'] , name:"Simple write", description:""},
    { input: "write 1 + 1.1?", output: ['2.1'], name: "Correct casting."},
    { input: "write \"test\"?", output: ['test'], name: "String handling."},
    { input: "if true \nthen write 1\nelse write 2?", output: ['1'] , name:"True conditional", description:""},
    { input: "if false\nthen write 1\nelse write 2?", output: ['2'] , name:"False conditional", description:""},
    { input: "let a = 4;\na := a + 1;\nwrite a?", output: ['5'] , name:"Variable assignment", description:""},
    { input: "let a = 4;\nrepeat a := a + 1 while a < 10;\nwrite a?", output: ['10'] , name:"Repeat-while loop", description:""},
    { input: "let a = 4;\nwhile a < 10 do a := a + 1;\nwrite a?", output: ['10'] , name:"While-do loop", description:""},
    { input: "let a = 0;\nrepeat {\n\twrite 1;\n\ta := a + 1\n} while a < 2 do write 2?", output: ['1', '2', '1'] , name:"Repeat-while-do loop", description:""},
    { input: "let a = 0;\nbegin\n\tlet a = 4;\n\twrite a \nend;\nwrite a?", output: ['4', '0'] , name:"Begin-end block scoping", description:""},
    { input: "let a = 0;\n{\n\tlet a = 4;\n\twrite a\n};\nwrite a?", output: ['4', '0'] , name:"Curly bracket block scoping", description:""},
    { input: "let a = @ 0 of int[1,2,3,4];\nwrite a(3)?", output: ['4'] , name:"Vector access", description:""},
    { input: "let a = @ 0 of *int[@ 2 of int[1,2,3,4]];\nwrite a(0, 2)?", output: ['1'] , name:"Multi-dimensional array access", description:""},
    { input: "procedure a(int b -> int); b;\nwrite(a(4))?", output: ['4'] , name:"Procedure definition", description:""},
    { input: "procedure a(real b -> real); b;\nwrite(a(4.12))?", output: ['4.12'] , name:"Real type", description:""},
    { input: "let a = @ 0 of int [1,2,3,4];\nprocedure b(*int arr -> int); arr(2);\nwrite(b(a))?", output: ['3'] , name:"Array assignment and passing", description:""},
    { input: "let a := -1;\nwrite abs(a)?", output: ['1'], name:"ABS standard library function", description:"" },
    { input: "let a = 1;\nlet b = if a > 0 then 3 else 4;\nwrite b?", output: ['3'], name:"Use of conditional clause as an expression", description:"" },
    { input: "let a = {let q = 1; q + 2};\nwrite a?", output: ['3'], name:"Assigning a block to a variable", description:"" },
    { input: "let x = 0; while x < 10 do x:=x+1; write 10?", output: ['10'], name:"Loop as an expression", description:"" },
    { input: "procedure fibpair( int n -> *int );\nif n = 1 then @1 of int[ 1,0 ] else\nif n = 2 then @1 of int[ 1,1 ] else\nif n rem 2 = 0 then\nbegin\n     let fg = fibpair( n div 2 );\n     let f = fg( 1 );\n     let g = fg( 2 );\n     let s = f * f;\n     let t = g * g;\n     @1 of int[ s + 2 * f * g,s + t ]\nend else\nbegin\n     let fg = fibpair( n - 1 );\n     @1 of int[ fg( 1 ) + fg( 2 ),fg( 1 ) ]\nend;\nprocedure fib( int n -> int );\nif n = 0 then 0 else fibpair( n )( 1 );\nfor i = 0 to 5 do write i,fib( i )?", output: [ '0 0', '1 1', '2 1', '3 2', '4 3' ], name:"Fibbonacci test", description:"" },
];

export var errorCases = [
    { input: "wr", name: "Incomplete program."},
    { input: "write ;?", name: "Syntax error."},
    { input: "let a = 1 + true?", name: "Operation typing error."},
    { input: "a(1)?", name: "Scope error."},
    { input: "{\n\tlet a = 1\n};\n write a?", name: "Correct block scoping."},
    { input: "let a = @ 0 of int [1, 2, 3];\n write a(1, 2)?", name: "Wrong vector dimension access."},
    { input: "let a = @ 0 of int [1, 2.0, 3];\n write a(1, 2)?", name: "Wrong element type."},
    { input: "let a = 1; a(2)?", name: "Arguments applied to variable."},
    { input: "structure test(int a);\n let a = test(\"test\")?", name: "Wrong type of argument for structure."},
    { input: "structure test(int a);\n let a = test(1, 2)?", name: "Too many arguments."},
    { input: "structure test(int a);\n let a = test(\"wrongargtype\")?", name: "Wrong argument type."}
];



