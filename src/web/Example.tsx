/// <reference path="../../typings/tsd.d.ts" />
import React = require('react');
import {Console} from "./Console";
let brace = require('brace');
let AceEditor = require('react-ace');
import 'brace/mode/java';
import 'brace/theme/github';
import * as Compiler from '../sAlgolCompiler/Compiler';
import {ConsoleLine} from "./ConsoleLine";
import {LineType} from "./ConsoleLine";
import {testCases} from "../test/Salogol/TestPrograms";

interface Props {
    input: string;
}

interface State {
    input: string,
    output: ConsoleLine[]
}

export class Example extends React.Component<Props, State> {
    constructor(props : Props){
        super(props);
        this.state = { input: this.props.input, output: [] };
        this.doCompile = this.doCompile.bind(this);
        this.doCompileAndRun = this.doCompileAndRun.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.showExample = this.showExample.bind(this);
    }

    doCompileAndRun() {
        let lines = Compiler.compileAndRun(this.state.input.split('\n'));
        this.setState({output: lines} as State);
    }

    doCompile() {
        let lines = Compiler.simpleCompile(this.state.input.split('\n'));
        this.setState({output: lines} as State);
    }

    updateCode(newCode) {
        this.setState({input: newCode} as State);
    }

    showExample(event: Event) {
        let ele = event.target as HTMLSelectElement;
        let index = parseInt(ele.value);
        this.updateCode(testCases[index].input);

    }

    render() {
        let self = this;
        return <div className="editor">
            <div className="controls">
                <button className="ideButton" onClick={ self.doCompile }>Compile</button>
                <button className="ideButton" onClick={ self.doCompileAndRun }>Compile and Run</button>
                <span className="ideButton">
                    Load example:
                    <select onChange={self.showExample} className="exampleDropdown">
                        {
                            testCases.map((testCase, index) => {
                                return <option value={ index } key={index}>{ testCase.name }</option>;
                            })
                        }
                    </select>
                </span>
            </div>
            <div className="code-panel">
                <AceEditor
                    value={self.state.input}
                    className="code-input"
                    mode="java"
                    width=""
                    height=""
                    theme="github"
                    name="UNIQUE_ID_OF_DIV"
                    onChange={ self.updateCode }
                    editorProps={{$blockScrolling: true}}/>
                <Console lines={ self.state.output }/>
            </div>
        </div>
    }
}