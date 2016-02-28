import * as LookUp from '../CompileLookUp'
import {SalgolTerminal} from "../GeneratedFiles/SalgolTerminal";
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

            case SalgolTerminal['grave_accent']: return "";
            case SalgolTerminal['structure']: return "";
            case SalgolTerminal['procedure']: return "";
            case SalgolTerminal['on']: return "";
            case SalgolTerminal['off']: return "";
            case SalgolTerminal['nullfile']: return "";
            case SalgolTerminal['is']: return "";
            case SalgolTerminal['isnt']: return "";
            case SalgolTerminal['eof']: return "";
            case SalgolTerminal['read_period_a_period_line']: return "";
            case SalgolTerminal['read']: return "";
            case SalgolTerminal['readi']: return "";
            case SalgolTerminal['readr']: return "";
            case SalgolTerminal['readb']: return "";
            case SalgolTerminal['peek']: return "";
            case SalgolTerminal['reads']: return "";
            case SalgolTerminal['read_period_name']: return "";
            case SalgolTerminal['read_period_byte']: return "";
            case SalgolTerminal['read_period_one_six']: return "";
            case SalgolTerminal['read_period_three_two']: return "";
            case SalgolTerminal['r_period_w']: return "";
            case SalgolTerminal['i_period_w']: return "";
            case SalgolTerminal['s_period_w']: return "";
            case SalgolTerminal['s_period_o']: return "";
            case SalgolTerminal['s_period_i']: return "";
            case SalgolTerminal['maxint']: return "";
            case SalgolTerminal['maxreal']: return "";
            case SalgolTerminal['epsilon']: return "";
            case SalgolTerminal['cursor']: return "";
            case SalgolTerminal['screen']: return "";
            case SalgolTerminal['structure_open_parenthesis']: return "";
            case SalgolTerminal['if']: return "";
            case SalgolTerminal['do']: return "";
            case SalgolTerminal['then']: return "";
            case SalgolTerminal['else']: return "";
            case SalgolTerminal['repeat']: return "";
            case SalgolTerminal['while']: return "";
            case SalgolTerminal['for']: return "";
            case SalgolTerminal['to']: return "";
            case SalgolTerminal['case']: return "";
            case SalgolTerminal['of']: return "";
            case SalgolTerminal['ror']: return "";
            case SalgolTerminal['rand']: return "";
            case SalgolTerminal['xor']: return "";
            case SalgolTerminal['forward']: return "";
            case SalgolTerminal['int']: return "";
            case SalgolTerminal['real']: return "";
            case SalgolTerminal['bool']: return "";
            case SalgolTerminal['string']: return "";
            case SalgolTerminal['pixel']: return "";
            case SalgolTerminal['pic']: return "";
            case SalgolTerminal['pntr']: return "";
            case SalgolTerminal['file']: return "";
            case SalgolTerminal['number_pixel']: return "";
            case SalgolTerminal['number_cpixel']: return "";
            case SalgolTerminal['default_colon']: return "";
            case SalgolTerminal['abort']: return "";
            case SalgolTerminal['by']: return "";
            case SalgolTerminal['write']: return "";
            case SalgolTerminal['output']: return "";
            case SalgolTerminal['out_period_byte']: return "";
            case SalgolTerminal['out_period_one_six']: return "";
            case SalgolTerminal['out_period_three_two']: return "";
            case SalgolTerminal['onto']: return "";
            case SalgolTerminal['copy']: return "";
            case SalgolTerminal['nand']: return "";
            case SalgolTerminal['nor']: return "";
            case SalgolTerminal['not']: return "";
            case SalgolTerminal['xnor']: return "";
            case SalgolTerminal['tilde']: return "";
            case SalgolTerminal['begin']: return "";
            case SalgolTerminal['end']: return "";
            case SalgolTerminal['opening_brace']: return "";
            case SalgolTerminal['closing_brace']: return "";
            case SalgolTerminal['upb']: return "";
            case SalgolTerminal['lwb']: return "";
            case SalgolTerminal['vector']: return "";
            case SalgolTerminal['colon_colon']: return "";
            case SalgolTerminal['image']: return "";
            case SalgolTerminal['at']: return "";
            case SalgolTerminal['limit']: return "";
            case SalgolTerminal['shift']: return "";
            case SalgolTerminal['scale']: return "";
            case SalgolTerminal['rotate']: return "";
            case SalgolTerminal['colour']: return "";
            case SalgolTerminal['in']: return "";
            case SalgolTerminal['text']: return "";
            case SalgolTerminal['from']: return "";

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