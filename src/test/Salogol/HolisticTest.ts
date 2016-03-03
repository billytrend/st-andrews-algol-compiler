/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {SalgolSymbol, lex} from "../../sAlgolCompiler/Lexer";
import Parser from "../../sAlgolCompiler/Parser";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {flatten} from "../../sAlgolCompiler/MakeAbstract";
import {program_sequence_question_mark} from "../../sAlgolCompiler/GeneratedFiles/ConcreteSyntax";
var expect = chai.expect;
import escodegen = require('escodegen');
import acorn = require('acorn');

