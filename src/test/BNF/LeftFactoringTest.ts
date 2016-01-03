/// <reference path="../../../typings/tsd.d.ts" />
import chai = require('chai');
import {ParseSymbol} from "../../metaCompiler/BNFParser/Parser";
import {Terminal} from "../../metaCompiler/BNFParser/Parser";
import {NonTerminal} from "../../metaCompiler/BNFParser/Parser";
import LeftFactoring from "../../metaCompiler/BNFParser/LeftFactoring";
import {TreeNode} from "../../metaCompiler/BNFParser/LeftFactoring";
import {NonTerminal} from "../../metaCompiler/BNFParser/Parser";
var expect = chai.expect;

describe('Left factoring tests:', () => {

    describe('insertSequence', () => {
        let input = [new Terminal("one"), new NonTerminal("two"), new NonTerminal("three")];
        let input1 = [new Terminal("three"), new NonTerminal("four"), new NonTerminal("five")];
        let input2 = [new Terminal("one"), new NonTerminal("four"), new NonTerminal("five")];
        let ambiguousTree: TreeNode = new TreeNode();
        let unAmbiguousTree: TreeNode = new TreeNode();

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
            parent.addChild(new NonTerminal("two"));
            parent.addChild(new NonTerminal("four"));

            let child1: TreeNode = new TreeNode();
            child1.addChild(new NonTerminal("one"));
            child1.addChild(new NonTerminal("two"));

            let child2: TreeNode = new TreeNode();
            child1.addChild(new NonTerminal("one"));
            child1.addChild(new NonTerminal("three"));
            parent.inheritChildren([child1, child2]);

            expect(parent.followingNodes['one']).to.have.lengthOf(2);
            expect(parent.followingNodes['two']).to.have.lengthOf(2);
            expect(parent.followingNodes['three']).to.have.lengthOf(1);
            expect(parent.followingNodes['four']).to.have.lengthOf(1);

            done();
        });

        it('should disambiguate an unambiguous tree', (done) => {
            let disambiguated: {} = LeftFactoring.disambiguate("entry", ambiguousTree);
            expect(disambiguated).to.have.all.keys(['entry', 'disambiguated_one']);
            expect(disambiguated['entry'][0].followingNodes['one']).to.have.lengthOf(1);
            expect(disambiguated['entry'][0].followingNodes['one'][0].followingNodes).to.have.all.keys(['disambiguated_one']);
            expect(disambiguated['disambiguated_one']).to.have.lengthOf(1);
            done();
        });

    });
});
