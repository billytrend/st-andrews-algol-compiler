import * as LookUp from '../CompileLookUp'
import {SalgolTerminal} from "../generatedFiles/SalgolTerminal";
import {SalgolSymbol} from "../Lexer";
import E = ESTree;

export class SalgolParseSymbol {
    public shouldOutputRawTerminals = false;
    public loc: E.SourceLocation = <E.SourceLocation>{};

    constructor(shouldOutputRawTerminals?: boolean) {
        this.shouldOutputRawTerminals = shouldOutputRawTerminals;
    }

    public flatten(): string {
        let children = this.getChildrenOrdered();
        let compiled = "";
        if (children.length === 0) return "";
        for (let child of children) {
            if (child && typeof child === 'object' && child.flatten) {
                compiled += child.flatten();
            }
        }
        return compiled;
    }


    getChildrenOrdered(): SalgolParseSymbol[] {
        let keys = Object.getOwnPropertyNames(this);
        keys.sort(function(a: string, b: string) {
            let aInt = parseInt(a.match(/([0-9]*$)/)[0]);
            let bInt = parseInt(b.match(/([0-9]*$)/)[0]);
            return aInt - bInt;
        });
        return keys.map(k => this[k]);
    }
}

export class SalgolTerminalClass extends SalgolParseSymbol {
    private concrete: SalgolSymbol;

    constructor(concrete: SalgolSymbol) {
        super(false);
        this.concrete = concrete;
    }

    public flatten(): string {
        return this.compile();
    }

    public compile(): string {
        switch (this.concrete.type) {

            case SalgolTerminal['grave_accent']: return "grave_accent";
            case SalgolTerminal['structure']: return "structure";
            case SalgolTerminal['procedure']: return "procedure";
            case SalgolTerminal['on']: return "on";
            case SalgolTerminal['off']: return "off";
            case SalgolTerminal['nullfile']: return "nullfile";
            case SalgolTerminal['is']: return "is";
            case SalgolTerminal['isnt']: return "isnt";
            case SalgolTerminal['eof']: return "eof";
            case SalgolTerminal['read_period_a_period_line']: return "read_period_a_period_line";
            case SalgolTerminal['read']: return "read";
            case SalgolTerminal['readi']: return "readi";
            case SalgolTerminal['readr']: return "readr";
            case SalgolTerminal['readb']: return "readb";
            case SalgolTerminal['peek']: return "peek";
            case SalgolTerminal['reads']: return "reads";
            case SalgolTerminal['read_period_name']: return "read_period_name";
            case SalgolTerminal['read_period_byte']: return "read_period_byte";
            case SalgolTerminal['read_period_one_six']: return "read_period_one_six";
            case SalgolTerminal['read_period_three_two']: return "read_period_three_two";
            case SalgolTerminal['r_period_w']: return "r_period_w";
            case SalgolTerminal['i_period_w']: return "i_period_w";
            case SalgolTerminal['s_period_w']: return "s_period_w";
            case SalgolTerminal['s_period_o']: return "s_period_o";
            case SalgolTerminal['s_period_i']: return "s_period_i";
            case SalgolTerminal['maxint']: return "maxint";
            case SalgolTerminal['maxreal']: return "maxreal";
            case SalgolTerminal['epsilon']: return "epsilon";
            case SalgolTerminal['cursor']: return "cursor";
            case SalgolTerminal['screen']: return "screen";
            case SalgolTerminal['structure_open_parenthesis']: return "structure_open_parenthesis";
            case SalgolTerminal['if']: return "if";
            case SalgolTerminal['do']: return "do";
            case SalgolTerminal['then']: return "then";
            case SalgolTerminal['else']: return "else";
            case SalgolTerminal['repeat']: return "repeat";
            case SalgolTerminal['while']: return "while";
            case SalgolTerminal['for']: return "for";
            case SalgolTerminal['to']: return "to";
            case SalgolTerminal['case']: return "case";
            case SalgolTerminal['of']: return "of";
            case SalgolTerminal['ror']: return "ror";
            case SalgolTerminal['rand']: return "rand";
            case SalgolTerminal['xor']: return "xor";
            case SalgolTerminal['forward']: return "forward";
            case SalgolTerminal['int']: return "int";
            case SalgolTerminal['real']: return "real";
            case SalgolTerminal['bool']: return "bool";
            case SalgolTerminal['string']: return "string";
            case SalgolTerminal['pixel']: return "pixel";
            case SalgolTerminal['pic']: return "pic";
            case SalgolTerminal['pntr']: return "pntr";
            case SalgolTerminal['file']: return "file";
            case SalgolTerminal['number_pixel']: return "number_pixel";
            case SalgolTerminal['number_cpixel']: return "number_cpixel";
            case SalgolTerminal['default_colon']: return "default_colon";
            case SalgolTerminal['abort']: return "abort";
            case SalgolTerminal['by']: return "by";
            case SalgolTerminal['write']: return "write";
            case SalgolTerminal['output']: return "output";
            case SalgolTerminal['out_period_byte']: return "out_period_byte";
            case SalgolTerminal['out_period_one_six']: return "out_period_one_six";
            case SalgolTerminal['out_period_three_two']: return "out_period_three_two";
            case SalgolTerminal['onto']: return "onto";
            case SalgolTerminal['copy']: return "copy";
            case SalgolTerminal['nand']: return "nand";
            case SalgolTerminal['nor']: return "nor";
            case SalgolTerminal['not']: return "not";
            case SalgolTerminal['xnor']: return "xnor";
            case SalgolTerminal['tilde']: return "tilde";
            case SalgolTerminal['begin']: return "begin";
            case SalgolTerminal['end']: return "end";
            case SalgolTerminal['opening_brace']: return "opening_brace";
            case SalgolTerminal['closing_brace']: return "closing_brace";
            case SalgolTerminal['upb']: return "upb";
            case SalgolTerminal['lwb']: return "lwb";
            case SalgolTerminal['vector']: return "vector";
            case SalgolTerminal['colon_colon']: return "colon_colon";
            case SalgolTerminal['image']: return "image";
            case SalgolTerminal['at']: return "at";
            case SalgolTerminal['limit']: return "limit";
            case SalgolTerminal['shift']: return "shift";
            case SalgolTerminal['scale']: return "scale";
            case SalgolTerminal['rotate']: return "rotate";
            case SalgolTerminal['colour']: return "colour";
            case SalgolTerminal['in']: return "in";
            case SalgolTerminal['text']: return "text";
            case SalgolTerminal['from']: return "from";

            case SalgolTerminal['at_symbol']: return "@";
            case SalgolTerminal['question_mark']: return "?";
            case SalgolTerminal['period']: return ".";
            case SalgolTerminal['exclamation_mark']: return "!";
            case SalgolTerminal['number']: return "#";
            case SalgolTerminal['dollar']: return "$";
            case SalgolTerminal['percent']: return "%";
            case SalgolTerminal['forward_slash']: return "/";
            case SalgolTerminal['opening_bracket']: return "(";
            case SalgolTerminal['backslash']: return "\\";
            case SalgolTerminal['closing_bracket']: return ")";
            case SalgolTerminal['caret']: return "^";
            case SalgolTerminal['underscore']: return "_";
            case SalgolTerminal['vertical_bar']: return "|";

            case SalgolTerminal['colon']: return ":";
            case SalgolTerminal['semi_colon']: return ";\n";
            case SalgolTerminal['open_parenthesis']: return "(";
            case SalgolTerminal['close_parenthesis']: return ")";
            case SalgolTerminal['comma']: return ",";

            case SalgolTerminal['or']: return " || ";
            case SalgolTerminal['and']: return " && ";

            case SalgolTerminal['ampersand']: return " & ";
            case SalgolTerminal['asterisk']: return " * ";
            case SalgolTerminal['plus']: return " + ";
            case SalgolTerminal['hyphen']: return " - ";

            case SalgolTerminal['less_than']: return " < ";
            case SalgolTerminal['greater_than']: return " > ";

            case SalgolTerminal['plus_plus']: return "++ ";

            case SalgolTerminal['less_than_equals']: return " <= ";
            case SalgolTerminal['greater_than_equals']: return " >= ";

            case SalgolTerminal['div']: return " / ";
            case SalgolTerminal['rem']: return " % ";

            case SalgolTerminal['true_val']: return "true";
            case SalgolTerminal['false_val']: return "false";

            case SalgolTerminal['nil']: return "null";

            case SalgolTerminal['pi']: return "Math.PI";

            case SalgolTerminal['double_quotes']: return "\"";
            case SalgolTerminal['single_quote']: return "'";

            case SalgolTerminal['exclamation_mark_equals']: return "!=";

            case SalgolTerminal['zero']: return "0";
            case SalgolTerminal['one']: return "1";
            case SalgolTerminal['two']: return "2";
            case SalgolTerminal['three']: return "3";
            case SalgolTerminal['four']: return "4";
            case SalgolTerminal['five']: return "5";
            case SalgolTerminal['six']: return "6";
            case SalgolTerminal['seven']: return "7";
            case SalgolTerminal['eight']: return "8";
            case SalgolTerminal['nine']: return "9";

            case SalgolTerminal['let']: return "var ";

            case SalgolTerminal['equals']:
            case SalgolTerminal['colon_equals']: return " = ";


            case SalgolTerminal['a']:
            case SalgolTerminal['b']:
            case SalgolTerminal['c']:
            case SalgolTerminal['d']:
            case SalgolTerminal['e']:
            case SalgolTerminal['f']:
            case SalgolTerminal['g']:
            case SalgolTerminal['h']:
            case SalgolTerminal['i']:
            case SalgolTerminal['j']:
            case SalgolTerminal['k']:
            case SalgolTerminal['l']:
            case SalgolTerminal['m']:
            case SalgolTerminal['n']:
            case SalgolTerminal['o']:
            case SalgolTerminal['p']:
            case SalgolTerminal['q']:
            case SalgolTerminal['r']:
            case SalgolTerminal['s']:
            case SalgolTerminal['t']:
            case SalgolTerminal['u']:
            case SalgolTerminal['v']:
            case SalgolTerminal['w']:
            case SalgolTerminal['x']:
            case SalgolTerminal['y']:
            case SalgolTerminal['z']: return SalgolTerminal[this.concrete.type];

        }
        return "";
    }
}