/// <reference path="../../../typings/tsd.d.ts" />
///<reference path="../../metaCompiler/BNFParser/AbstractManipulators/VisitorPass.ts"/>
import chai = require('chai');
import {ParseSymbol} from "../../metaCompiler/BNFParser/Parser";
import {Terminal} from "../../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {TreeNode} from "../../metaCompiler/BNFParser/LeftFactoring";
import {Grammar} from "../../metaCompiler/BNFParser/Parser";
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
        let ambiguousTree: TreeNode = new TreeNode();
        let unAmbiguousTree: TreeNode = new TreeNode();
        let aTree: TreeNode = new TreeNode();

        it('should build node', (done) => {
            let tree: TreeNode = new TreeNode();
            LeftFactoring.insertSequence(tree, input);
            expect(tree).to.have.deep.property('_followingNodes.one');
            done();
        });

        it('should build sequence', (done) => {
            let tree: TreeNode = new TreeNode();
            LeftFactoring.insertSequence(tree, input);
            expect(tree).to.have.deep.property('_followingNodes.one');
            expect(tree).to.have.deep.property('_followingNodes.one[0]._followingNodes.two');
            expect(tree).to.have.deep.property('_followingNodes.one[0]._followingNodes.two[0]._followingNodes.three');
            done();
        });

        it('should build an un-ambiguous tree for multiple distinct sequences', (done) => {
            LeftFactoring.insertSequence(unAmbiguousTree, input);
            LeftFactoring.insertSequence(unAmbiguousTree, input1);
            expect(unAmbiguousTree.followingNodes).to.have.all.keys(['one', 'three']);
            expect(unAmbiguousTree.followingNodes['one']).to.have.lengthOf(1);
            expect(unAmbiguousTree.followingNodes['three']).to.have.lengthOf(1);
            expect(unAmbiguousTree.followingNodes['one'][0].followingNodes).to.have.all.keys(['two']);
            expect(unAmbiguousTree.followingNodes['three'][0].followingNodes).to.have.all.keys(['four']);
            done();
        });

        it('should build an ambiguous tree for multiple common head sequences', (done) => {
            LeftFactoring.insertSequence(ambiguousTree, input);
            LeftFactoring.insertSequence(ambiguousTree, input2);
            expect(ambiguousTree.followingNodes).to.have.all.keys(['one']);
            expect(ambiguousTree.followingNodes['one']).to.have.lengthOf(2);
            expect(ambiguousTree.followingNodes['one'][0].followingNodes).to.have.any.keys(['four', 'two']);
            expect(ambiguousTree.followingNodes['one'][1].followingNodes).to.have.any.keys(['four', 'two']);
            expect(ambiguousTree.followingNodes['one'][0].followingNodes)
                .to.not.have.any.keys(ambiguousTree.followingNodes['one'][1].followingNodes);
            done();
        });

        it('should build a simple ambiguous tree for multiple very common head sequences', (done) => {
            LeftFactoring.insertSequence(aTree, input2);
            LeftFactoring.insertSequence(aTree, input3);
            expect(ambiguousTree.followingNodes).to.have.all.keys(['one']);
            expect(ambiguousTree.followingNodes['one']).to.have.lengthOf(1);
            expect(ambiguousTree.followingNodes['one'][0].followingNodes).to.have.all.keys(['four']);
            expect(ambiguousTree.followingNodes['one'][0].followingNodes['four']).to.have.lengthOf(2);
            expect(ambiguousTree.followingNodes['one'][0].followingNodes['four'][0].followingNodes)
                .to.not.have.any.keys(ambiguousTree.followingNodes['one'][0].followingNodes['four'][1].followingNodes);
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

        it('should inherit children', (done) => {
            let parent: TreeNode = new TreeNode();
            parent.addChild(new Terminal("two"));
            parent.addChild(new Terminal("four"));

            let child1: TreeNode = new TreeNode();
            child1.addChild(new Terminal("one"));
            child1.addChild(new Terminal("two"));

            let child2: TreeNode = new TreeNode();
            child1.addChild(new Terminal("one"));
            child1.addChild(new Terminal("three"));
            parent.inheritChildren([child1, child2]);

            expect(parent.followingNodes['one']).to.have.lengthOf(2);
            expect(parent.followingNodes['two']).to.have.lengthOf(2);
            expect(parent.followingNodes['three']).to.have.lengthOf(1);
            expect(parent.followingNodes['four']).to.have.lengthOf(1);

            done();
        });

        it('should leftFactor an unambiguous tree', (done) => {
            let disambiguated: {} = LeftFactoring.leftFactor("<entry>", ambiguousTree);
            expect(disambiguated).to.have.all.keys(['<entry>', '<disambiguated_one>']);
            expect(disambiguated['<entry>'][0].followingNodes['one']).to.have.lengthOf(1);
            expect(disambiguated['<entry>'][0].followingNodes['one'][0].followingNodes).to.have.all.keys(['<disambiguated_one>']);
            expect(disambiguated['<disambiguated_one>']).to.have.lengthOf(1);
            done();
        });

        it('should left factor whole grammar', (done) => {
            var g: Grammar = compileDefault();
            let lFac = LeftFactoring.leftFactorGrammar(g);
            let visitor = new ReformatBNF();
            let visitorPass = new VisitorPass(visitor);
            visitorPass.visit(lFac);
            var a = ""
            for (var lol of visitor.output) {
                a+=lol;
            }
            console.log(a)
            done();
        });


    });
});
