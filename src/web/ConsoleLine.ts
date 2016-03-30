export enum LineType { stdout, stderr }

export class ConsoleLine {
    line: string;
    type: LineType;
    indent: number;

    constructor(line:string, type:LineType, indentLevel?: number) {
        this.line = line;
        this.type = type;
        this.indent = indentLevel || 0;
    }
}