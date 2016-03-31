/// <reference path="../../typings/main.d.ts" />
import React = require('react');
import {ConsoleLine, LineType} from "./ConsoleLine";

interface Props {
    lines: ConsoleLine[];
}

interface State {
}

export class Console extends React.Component<Props, State> {
    constructor(props : Props){
        super(props);
    }

    render() {
        return <div className="console">
            {
                this.props.lines.map((line, i) => {
                    return <div key={i} style={ { textIndent: (line.indent * 15) + "px"} } className={`line ${LineType[line.type]}`}>{line.line}</div>;
                })
            }
        </div>
    }
}