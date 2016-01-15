/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>

import chai = require('chai');
import {ParseSymbol, Terminal, NonTerminal, Grammar} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {compileDefault} from "../../metaCompiler/BNFParser/Compiler";
import {VisitorPass} from "../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass";
import {ReformatBNF} from "../../metaCompiler/BNFParser/Passes/ReformatBNF";
var expect = chai.expect;

describe('Left factoring tests:', () => {

    describe('insertSequence', () => {
        let input = [new Terminal("one"), new Terminal("two"), new Terminal("three")];
        let input1 = [new Terminal("three"), new Terminal("four"), new Terminal("five")];
        let input2 = [new Terminal("one"), new Terminal("four"), new Terminal("five")];
        let input3 = [new Terminal("one"), new Terminal("four"), new Terminal("six")];
        let ambiguousTree: any = {};
        let unAmbiguousTree: any = {};
        let aTree: any = {};

        it('should build sequence', (done) => {
            let tree: any = {};
            LeftFactoring.insertSequence(tree, input);
            expect(tree).to.have.all.keys('one');
            expect(tree.one).to.have.all.keys('two');
            expect(tree.one.two).to.have.all.keys('three');
            done();
        });

        it('should build an un-ambiguous tree for multiple distinct sequences', (done) => {
            LeftFactoring.insertSequence(unAmbiguousTree, input);
            LeftFactoring.insertSequence(unAmbiguousTree, input1);
            expect(unAmbiguousTree).to.have.all.keys(['one', 'three']);
            expect(unAmbiguousTree.one).to.have.all.keys('two');
            expect(unAmbiguousTree.three).to.have.all.keys('four');
            expect(unAmbiguousTree.one.two).to.have.all.keys('three');
            expect(unAmbiguousTree.three.four).to.have.all.keys('five');
            done();
        });

        it('should build an ambiguous tree for multiple common head sequences', (done) => {
            LeftFactoring.insertSequence(ambiguousTree, input);
            LeftFactoring.insertSequence(ambiguousTree, input2);
            expect(ambiguousTree).to.have.all.keys(['one']);
            expect(ambiguousTree.one).to.have.all.keys(['two', 'four']);
            expect(ambiguousTree.one.two).to.have.all.keys('three');
            expect(ambiguousTree.one.four).to.have.all.keys('five');
            done();
        });

        it('should build a simple ambiguous tree for multiple very common head sequences', (done) => {
            LeftFactoring.insertSequence(aTree, input2);
            LeftFactoring.insertSequence(aTree, input3);
            expect(aTree).to.have.all.keys(['one']);
            expect(aTree.one).to.have.all.keys(['four']);
            expect(aTree.one.four).to.have.all.keys(['five', 'six']);
            done();
        });

        it('should create sequences from ambiguous tree', (done) => {
            let disambiguated: ParseSymbol[][] = LeftFactoring.generateSequences(ambiguousTree);
            expect(disambiguated).to.have.lengthOf(2);
            done();
        });

        it('should create sequences from unambiguous tree', (done) => {
            let disambiguated: ParseSymbol[][] = LeftFactoring.generateSequences(unAmbiguousTree);
            expect(disambiguated).to.have.lengthOf(2);
            done();
        });

        it('should create grammar from tree node map', (done) => {
            let grammar: Grammar = LeftFactoring.convertToGrammar({
                entry: ambiguousTree
            });
            expect(grammar.productions).to.have.all.keys('entry');
            expect(grammar.productions['entry']).to.have.lengthOf(2);
            expect(grammar.productions['entry'][0].sequence).to.have.lengthOf(3);
            expect(grammar.productions['entry'][1].sequence).to.have.lengthOf(3);
            done();
        });

        it('should recognise an ambiguous tree', (done) => {
            expect(LeftFactoring.isAmbiguous(ambiguousTree)).to.be.true;
            done();
        });

        it('should recognise an unambiguous tree', (done) => {
            expect(LeftFactoring.isAmbiguous(unAmbiguousTree)).to.be.false;
            done();
        });

        it('should leftFactor an ambiguous tree', (done) => {
            let disambiguated: {} = LeftFactoring.leftFactor("<entry>", ambiguousTree);
            expect(disambiguated).to.have.all.keys(['<entry>', '<disambiguated_one>']);
            expect(disambiguated['<entry>'].one).to.have.all.keys('<disambiguated_one>');
            expect(disambiguated['<disambiguated_one>']).to.have.all.keys('two', 'four');
            done();
        });

        it('should left factor whole grammar', (done) => {
            var g: Grammar = compileDefault();
            expect(LeftFactoring.grammarIsAmbiguous(g)).to.be.true;
            let lFac = LeftFactoring.leftFactorGrammar(g);
            expect(LeftFactoring.grammarIsAmbiguous(lFac)).to.be.false;
            //let visitor = new ReformatBNF();
            //let visitorPass = new VisitorPass(visitor);
            //visitorPass.visit(lFac);
            //var a = "";
            //for (var lol of visitor.output) {
            //    a+=lol;
            //}
            //console.log(a);
            done();
        });


    });
});
