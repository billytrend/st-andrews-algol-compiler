var symmap: string[] = ['BAR', 'LAB', 'RAB', 'STAR', 'LSB', 'RSB', 'SC', 'ID', 'EQ', 'ESC']

class GrammarFeature {}

class Grammar {
    private _entry: string;
    productions: {} = {};

    get entry():string {
        return this._entry;
    }

    set entry(value:string) {
        this._entry = value;
    }

    addProduction(name: string, production: Production) {
        if (this.productions[name] === undefined) {
            this.productions[name] = [];
        }
        this.productions[name].push(production);
    }
}

class Production extends GrammarFeature {
    private _mapping: GrammarFeature[];

    set mapping(value: GrammarFeature[]) {
        this._mapping = value;
    }
}

class MaybeObject extends Production {
    private _many: boolean = false;

    get many():boolean {
        return this._many;
    }

    set many(value:boolean) {
        this._many = value;
    }
}

class Terminal extends GrammarFeature {
    private _value: string;

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
    }
}

class NonTerminal extends GrammarFeature {
    value: string;
}

function err(symbol: Symbol) {
    console.log("Unexpected: ", symmap[symbol.type]);
}

function expect(symbol: Symbol, toBe: SymbolType): boolean {
    if (symbol.type != toBe) {
        console.log("Expected ", symmap[symbol.type], " to be ", symmap[toBe], ".");
        return false;
    }
    return true;
}

function accept(symbol: Symbol, toBe: SymbolType): boolean {
    if (symbol.type != toBe) {
        return false;
    }
    return true;
}

function grammar(input: Symbol[]): Grammar {
    let grammar: Grammar = new Grammar();

    while (true) {
        if (input.length == 0) break;

        let productionName: NonTerminal = nonTerminal(input);

        if (grammar.entry === undefined) {
            grammar.entry = productionName.value;
        }

        if (!expect(input.shift(), SymbolType.EQ)) {
            return null;
        }

        while (true) {
            grammar.addProduction(productionName.value, production(input));

            let next: Symbol = input.shift();
            if (accept(next, SymbolType.BAR)) continue;
            else if (!expect(next, SymbolType.SC)) return null;
            else break;
        }
    }

    return grammar;
}

function production(input: Symbol[]): Production {
    let production: Production = new Production();
    production.mapping = grammarFeature(input);
    return production;
}

function grammarFeature(input: Symbol[]): GrammarFeature[] {
    let grammarFeatures: GrammarFeature[] = [];
    while (true) {
        switch (input[0].type) {
            case SymbolType.LAB :
                grammarFeatures.push(nonTerminal(input));
                continue;
            case SymbolType.RSB :
                return grammarFeatures;
            case SymbolType.LSB :
                grammarFeatures.push(maybeObject(input));
                continue;
            case SymbolType.ESC:
                grammarFeatures.push(escapeSequence(input));
                continue;
            case SymbolType.ID:
            case SymbolType.STAR:
                grammarFeatures.push(terminal(input));
                continue;
            case SymbolType.BAR :
                return grammarFeatures;
            case SymbolType.SC  :
                if (input.length < 4) {
                    return grammarFeatures;
                } else if (accept(input[4], SymbolType.EQ)) {
                    return grammarFeatures;
                }
                grammarFeatures.push(terminal(input));
                continue;
            default:
                err(input[0]);
                return null;
        }
    }
}

function terminal(input: Symbol[]): Terminal {
    //if (!expect(input[0], SymbolType.ID)) return null;
    let term: Terminal = new Terminal();
    term.value = input.shift().value;
    return term;
}

function nonTerminal(input: Symbol[]): NonTerminal {
    let nonTerm: NonTerminal = new NonTerminal();

    if (!expect(input.shift(), SymbolType.LAB)) return null;

    if (!expect(input[0], SymbolType.ID)) return null;
    nonTerm.value = input.shift().value;

    if (!expect(input.shift(), SymbolType.RAB)) return null;
    return nonTerm;
}

function maybeObject(input: Symbol[]): MaybeObject {
    let maybeObject: MaybeObject = new MaybeObject();

    if (!expect(input.shift(), SymbolType.LSB)) return null;
    maybeObject.mapping = grammarFeature(input);

    if (!expect(input.shift(), SymbolType.RSB)) {
        return null;
    }
    if (accept(input[0], SymbolType.STAR)) {
        input.shift();
        maybeObject.many = true;
    }
    return maybeObject;
}

function escapeSequence(input: Symbol[]): Terminal {
    if (!expect(input.shift(), SymbolType.ESC)) return null;
    let terminal: Terminal = new Terminal();
    terminal.value = input.shift().value;

    if (!expect(input.shift(), SymbolType.ESC)) return null;
    return terminal;
}

function compiler(input: string): Grammar {
    var tokens: Symbol[] = lex(input);
    return grammar(tokens);
}

var input: string = "<program> ::=	<sequence>?;<sequence> ::=	<declaration>[;<sequence>]	|<clause>[;<sequence>];<declaration> ::=	<let_decl>	|<structure_decl>	|<proc_decl>	|<forward>;<let_decl> ::=	let <identifier><init_op><clause>;<init_op> ::=	=	|:=;<structure_decl> ::=	structure<identifier>[([<field_list>])];<field_list> ::=	<type1><identifier_list>[;<field_list>];<proc_decl> ::=	procedure<identifier>[([<parameter_list>] [<arrow><type_id>])] ; <clause>;<parameter_list> ::=	<parameter>[;<parameter_list>];<parameter> ::=	<type1><identifier_list>	|<structure_decl>	|<proc_type><identifier_list>;<proc_type> ::=	([<ptype_list>][<arrow><type_id>]);<ptype_list> ::=	<type1>[,<ptype_list>]	|<proc_type>[,<ptype_list>]	|<s_decl>[,<ptype_list>];<s_decl> ::=	structure(<type1>[,<type1>]*);<forward> ::=	forward<identifier><proc_type>;<type1> ::=	[c]<type_id>;<type_id> ::=	int 	|real 	|bool 	|string 	|pixel 	|pic 	|pntr 	|file 	|<star><type1> 	|#pixel 	|#cpixel;<identifier_list> ::=	<identifier>[,<identifier_list>];<clause> ::=	if<clause>do<clause>	|if<clause>then<clause>else<clause>	|repeat<clause>while<clause>[do<clause>]	|while<clause>do<clause>	|for<identifier>=<clause>to<clause>[by<clause>]do<clause>	|case<clause>of<case_list>default :<clause>	|<name>:=<clause>	|<write_clause>	|<raster>	|abort	|<expression>;<case_list> ::=	<clause_list>:<clause>;[<case_list>];<write_clause> ::=	write<write_list>	|output <clause>,<write_list>	|out.byte<clause>,<clause>,<clause>	|out.16<clause>,<clause>,<clause>	|out.32<clause>,<clause>;<write_list> ::=	<clause>[:<clause>][,<write_list>];<raster> ::=	<raster_op><clause>onto<clause>;<raster_op> ::=	ror	|rand	|xor	|copy	|nand	|nor	|not	|xnor;<clause_list> ::=	<clause>[,<clause_list>];<expression> ::=	<exp1>[or<exp1>]*;<exp1> ::=	<exp2>[and<exp2>]*;<exp2> ::=	[~]<exp3>[<rel_op><exp3>];<exp3> ::=	<exp4>[<add_op><exp4>]*;<exp4> ::=	<exp5>[<mult_op><exp5>]*;<exp5> ::=	[<add_op>]<exp6>;<exp6> ::=	<standard_exp>	|<literal>	|<value_constructor>	|(<clause>)	|begin[<sequence>]end	|{[<sequence>]}	|<expression>(<clause><bar><clause>)	|<expression>(<dereference>)	|<application>	|<structure_creation>	|<name>	|<bounds_op>(<clause>);<dereference> ::=	<clause_list>;<application> ::=	<identifier>[([<clause_list>])];<structure_creation> ::=	<identifier>[([<clause_list>])];<name> ::=	<identifier>	|<expression>(<clause_list>)[(<clause_list>)]*;<bounds_op> ::=	upb	|lwb;<value_constructor> ::=	<vector_constr>	|<image_constr>	|<subimage_constr>	|<picture_constr>;<vector_constr> ::=	vector<range>of<clause>	|@<clause>of<type1><lsb><clause>[,<clause>]*<rsb>;<range> ::=	<clause>::<clause>[,<range>];<image_constr> ::=	image<clause>by<clause>of<clause>;<subimage_constr> ::=	limit<clause>[to<clause>by<clause>][at<clause>,<clause>];<picture_constr> ::=	shift<clause>by<clause>,<clause>	|scale<clause>by<clause>,<clause>	|rotate<clause>by<clause>	|colour<clause>in<clause>	|text<clause>from<clause>,<clause>to<clause>,<clause>	|<lsb><clause>,<clause><rsb>;<literal> ::=	<integer_literal>	|<real_literal>	|<boolean_literal>	|<string_literal>	|<pixel_literal>	|<pntr_literal>	|<file_literal>;<integer_literal> ::=	[<add_op>]<int_literal>;<int_literal> ::=	<digit>[<digit>]*;<real_literal> ::=	<integer _literal>.[<int _literal>][e<integer_literal>];<boolean_literal> ::=	true	|false;<string_literal> ::=	<double_quote>[<char>]*<double_quote>;<char> ::= <special_character>;<special_character> ::=	<single_quote><special_follow>;<special_follow> ::=	n	|p	|o	|t	|b	|<single_quote>	|<double_quote>;<pixel_literal> ::=	on[&<pixel_literal>]	|off[&<pixel_literal>];<pntr_literal> ::=	nil;<file_literal> ::=	nullfile;<lab> ::=	'<';<rab> ::=	'>';<lsb> ::=	'[';<rsb> ::=	']';<star> ::=	'*';<bar> ::=	'|';<add_op> ::=	+	|-;<mult_op>  ::=	<int_mult_op>	|<real_mult_op>	|++	|<pic_op>	|<pixel_op>;<int_mult_op> ::=	<star>	|div	|rem;<real_mult_op> ::=	<star>	|/;<pic_op> ::=	^	|&;<pixel_op> ::=	&;<rel_op> ::=	<eq_op>	|<compar_op>	|<type_op>;<eq_op> ::=	=	|≠;<compar_op> ::=	'<'	|≤	|'>'	|≥;<type_op> ::=	is	|isnt;<arrow> ::=	-'>';<double_quote> ::=	\";<single_quote> ::=	''';<identifier> ::=	<id>	|<standard_id>;<id> ::=	<letter>[<id_follow>];<id_follow> ::=	<letter>[<id_follow>]	|<digit>[<id_follow>]	|.[<id_follow>];<letter> ::=	a	|b	|c	|d	|e	|f	|g	|h	|i	|j	|k	|l	|m	|n	|o	|p	|q	|r	|s	|t	|u	|v	|w	|x	|y	|z	|A	|B	|C	|D	|E	|F	|G	|H	|I	|J	|K	|L	|M	|N	|O	|P	|Q	|R	|S	|T	|U	|V	|W	|X	|Y	|Z;<digit> ::=	0	|1	|2	|3	|4	|5	|6	|7	|8	|9;<standard_exp> ::=	<standard_name>[(<clause>)];<standard_name> ::=	upb	|lwb	|eof	|read.a.line	|read	|readi	|readr	|readb	|peek	|reads	|read.name	|read.byte	|read.16	|read.32;<standard_id> ::=	r.w	|i.w	|s.w	|s.o	|s.i	|maxint	|maxreal	|epsilon	|pi	|cursor	|screen;";
console.log(compiler(input));