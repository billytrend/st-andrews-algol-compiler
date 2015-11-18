enum lexType {
    LET, ID, INIT_OP, EOF, STRUCTURE, PROCEDURE, FORWARD, WRITE_CLAUSE_WRITE, STANDARD_NAME, IF, REPEAT, WHILE, FOR, CASE, INT_LITERAL, COMMA, TILDA
}

class lexedItem {
    private type: lexType;
    private value: Object;

    public getType(): lexType {
        return this.type;
    }

    public getValue(): Object {
        return this.value;
    }

    constructor(type: lexType, value: Object) {
        this.type = type;
        this.value = value;

    }
}

class Matcher {

    public static matchLiteral(type) {
        return type == lexType.INT_LITERAL;
    }

    public static matchClause(type) {
        return this.matchWriteClause(type);
    }

    public static matchWriteClause(type) {
        return type == lexType.WRITE_CLAUSE_WRITE;
    }

}


// session
class program {
    sequence: sequence;
}

class sequenceItem {}

class sequence {
    item: sequenceItem;
    nextSequence: sequence;
}

class declaration extends sequenceItem {}

class let_decl extends declaration {
    id: identifier;
    op: init_op;
}

// TODO: is = different to :=
class init_op {}

class structure_decl extends declaration {
    identifier: identifier;
    fieldListList: field_list[][];
}

class field_list {
    type: type1;
}

class proc_decl extends declaration {
    identifier: identifier;
}

class parameter {}

class parameter1 extends parameter {
    type: type1;
    identifiers: identifier[];
}

class parameter2 extends parameter {
    proc_type: proc_type;
    identifiers: identifier[];
}
class ptype_listable {}

class proc_type extends ptype_listable {
    ptype_list: ptype_listable[];
    arrow: boolean;
    type_id: type_id;
}


class s_decl extends ptype_listable {}

class forward extends declaration {}

class type1 extends ptype_listable {
    c: boolean;
    type_id: type_id
}

// TODO
class type_star extends ptype_listable {
    star: boolean;
    type1: type1;
}

enum type_id_enum {
    int,
    real,
    bool,
    string,
    pixel,
    pic,
    pntr,
    file
}

enum type_id_pixel_enum {
    pixel,
    cpixel
}

class type_id
{
    type: type_id_enum;
    type_star: type_star;
    pixelType: type_id_pixel_enum;
}

class clause extends sequenceItem  {

}

class ifDoClause extends clause {
    ifClause: clause;
    doClause: clause;
}

class ifThenElse extends clause {
    ifDo: clause;
    elseClause: clause;
}

class repeatWhileDo extends clause {
    repeatClause: clause;
    whileDo: whileDo;
}

class whileDo extends clause {
    whileClause: clause;
    doClause: clause;
}

class forToByDo extends clause {
    forIdentifier: identifier;
    forClause: clause;
    toClause: clause;
    byClause: clause;
    doClause: clause;
}

class caseOfDefault extends clause {
    caseClause: clause;
    ofClause: case_list;
    defaultClause: clause;
}

class nameClause extends clause {
    name: string;
    clause: clause;
}


class case_list {
    clause_list: clause[];
    clause: clause;
    case_list: case_list;
}

class write_clause extends clause {
    writeTerminal: writer;
    clauses: clause[];
    write_list: write_list;
}

class write_list {
    clause1: clause;
    clause2: clause;
    write_list: write_list;
}

class raster {
    raster_op: raster_op;
    clause: clause;
    ontoClause: clause;
}

class expression extends clause {
    exp: exp1;
    andOps: [exp1];
}

class exp1 {
    exp: exp2;
    andOps: [exp2];
}

class exp2 {
    truth: boolean = true;
    exp: exp3;
    relOps: [[rel_op, exp4]]

}

class exp3 {
    exp: exp4;
    addOps: [[add_op, exp4]]
}

class exp4 {
    exp: exp5;
    multOps: [[mult_op, exp5]]
}

class exp5 {
    addOp: add_op;
    exp: exp6;

}

class exp6 {}

class begin_end_exp6 extends sequence {}

class dereference {}

class application {}

class structure_creation {}

class value_constructor {}

class vector_constr {}

class range {}

class image_constr {}

class subimage_constr {}

class picture_constr {}

class literal {}

class int_literal {
    value: number;
}

class real_literal {}

class boolean_literal {}

class string_literal {}

class char {}

class special_character {}

class special_follow {}

class pixel_literal {}

class pntr_literal {}

class file_literal {}

class lab {}

class rab {}

class lsb {}

class rsb {}

class star {}

class bar {}

class add_op {}

class mult_op {}

class pixel_op {}

class int_mult_op {}

class real_mult_op {}

class pic_op {}

class rel_op {}

class eq_op {}

class compar_op {}

class type_op {}

class arrow {}

class double_quote {}

class single_quote {}

class identifier {}

class id {}

class id_follow {}

class standard_exp {}

class standard_name {}

class standard_id {}

// terminals

class abort extends clause { static terminal: String  = "abort"; }

class letter { static terminal: String; }

class a extends letter { terminal = "a"; }
class b extends letter { terminal = "b"; }
class c extends letter { terminal = "c"; }
class d extends letter { terminal = "d"; }
class e extends letter { terminal = "e"; }
class f extends letter { terminal = "f"; }
class g extends letter { terminal = "g"; }
class h extends letter { terminal = "h"; }
class i extends letter { terminal = "i"; }
class j extends letter { terminal = "j"; }
class k extends letter { terminal = "k"; }
class l extends letter { terminal = "l"; }
class m extends letter { terminal = "m"; }
class n extends letter { terminal = "n"; }
class o extends letter { terminal = "o"; }
class p extends letter { terminal = "p"; }
class q extends letter { terminal = "q"; }
class r extends letter { terminal = "r"; }
class s extends letter { terminal = "s"; }
class t extends letter { terminal = "t"; }
class u extends letter { terminal = "u"; }
class v extends letter { terminal = "v"; }
class w extends letter { terminal = "w"; }
class x extends letter { terminal = "x"; }
class y extends letter { terminal = "y"; }
class z extends letter { terminal = "z"; }
class A extends letter { terminal = "A"; }
class B extends letter { terminal = "B"; }
class C extends letter { terminal = "C"; }
class D extends letter { terminal = "D"; }
class E extends letter { terminal = "E"; }
class F extends letter { terminal = "F"; }
class G extends letter { terminal = "G"; }
class H extends letter { terminal = "H"; }
class I extends letter { terminal = "I"; }
class J extends letter { terminal = "J"; }
class K extends letter { terminal = "K"; }
class L extends letter { terminal = "L"; }
class M extends letter { terminal = "M"; }
class N extends letter { terminal = "N"; }
class O extends letter { terminal = "O"; }
class P extends letter { terminal = "P"; }
class Q extends letter { terminal = "Q"; }
class R extends letter { terminal = "R"; }
class S extends letter { terminal = "S"; }
class T extends letter { terminal = "T"; }
class U extends letter { terminal = "U"; }
class V extends letter { terminal = "V"; }
class W extends letter { terminal = "W"; }
class X extends letter { terminal = "X"; }
class Y extends letter { terminal = "Y"; }
class Z extends letter { terminal = "Z"; }

class digit { static terminal: String; }

class d0 extends digit { terminal = "0"; }
class d1 extends digit { terminal = "1"; }
class d2 extends digit { terminal = "2"; }
class d3 extends digit { terminal = "3"; }
class d4 extends digit { terminal = "4"; }
class d5 extends digit { terminal = "5"; }
class d6 extends digit { terminal = "6"; }
class d7 extends digit { terminal = "7"; }
class d8 extends digit { terminal = "8"; }
class d9 extends digit { terminal = "9"; }

class writer { static terminal: String; }

class write extends writer { terminal = "write" }
class output extends writer { terminal = "output" }
class outbyte extends writer { terminal = "out.byte" }
class out16 extends writer { terminal = "out.16" }
class out32 extends writer { terminal = "out.32" }

class raster_op { static terminal: String; }

class ror extends raster_op { terminal = "ror" }
class rand extends raster_op { terminal = "rand" }
class xor extends raster_op { terminal = "xor" }
class copy extends raster_op { terminal = "copy" }
class nand extends raster_op { terminal = "nand" }
class nor extends raster_op { terminal = "nor" }
class not extends raster_op { terminal = "not" }
class xnor  extends raster_op { terminal = "xnor " }


class ASTGenerator {

    private input:[lexedItem];

    constructor(input: [lexedItem]) {
        this.input = input;
    }

    private accept(sym: lexedItem, toBe: lexType):Boolean {
        return sym.getType() == toBe;
    }

    private expect(sym: lexedItem, toBe: lexType):Boolean {
        if (sym.getType() != toBe) {
            this.err(sym, toBe);
            return false;
        }
        return true;
    }

    public err(sym: lexedItem, toBe: lexType) {

    }

    public program(): program {
        var token: lexedItem = this.input[0];
        var p: program = new program();
        if (token.getType() != lexType.EOF) {
            p.sequence = this.sequence();
        }
        return p;
    }

    public sequence(): sequence {
        var token: lexedItem = this.input[0];
        var s: sequence = new sequence();
        if (Matcher.matchClause(token.getType())) {
            s.item = this.clause();
        }
        return s;
    }

    public write_list():write_list {

        var wl = new write_list();
        wl.clause1 = this.clause();

        if (this.input[0].getType() == lexType.COMMA) {
            this.input.shift();
            wl.clause2 = this.clause();
        }

        if (this.input[0].getType() == lexType.COMMA) {
            this.input.shift();
            wl.write_list = this.write_list();
        }

        return wl;
    }

    private clause():clause {
        var type: lexType = this.input[0].getType();

        if (type == lexType.WRITE_CLAUSE_WRITE) {
            return this.write_clause_write();
        }

        if (type == lexType.INT_LITERAL) {
            return this.int_literal();
        }

        return null;
    }

    private write_clause_write():write_clause {
        this.expect(this.input.shift(), lexType.WRITE_CLAUSE_WRITE);
        var w = new write_clause();
        w.write_list = this.write_list();
        return w;
    }

    private int_literal():int_literal {
        var i = new int_literal();
        var sym = this.input.shift();
        if (this.expect(sym, lexType.INT_LITERAL)) {
            i.value = parseInt(<string>sym.getValue());
        }
        return i;
    }
}

class Compiler {
    public static compile(p: Object): string[] {
        var compiled: string[] = [];
        return compiled;
    }

    public static compileProgram(p: program): string[] {
        var compiled: string[] = [];
        compiled = compiled.concat(this.compileSequence(p.sequence));
        return compiled;
    }

    public static compileSequence(s: sequence): string[] {
        var compiled: string[] = [];
        do {
            console.log(this.compileWriteClause(<write_clause> s.item));
            compiled = compiled.concat(this.compileWriteClause(<write_clause> s.item))
            s = s.nextSequence;
        } while (s)
        return compiled;
    }

    public static compileWriteClause(w: write_clause): string {
        var compiled: string = "console.log(";
        compiled = compiled.concat(this.compileWriteList(w.write_list));
        compiled = compiled.concat(");");
        return compiled;
    }

    public static compileWriteList(w: write_list): string {
        var compiled: string = "";
        compiled = compiled.concat(this.compileIntLiteral(<int_literal> w.clause1));
        return compiled;
    }

    public static compileIntLiteral(i: int_literal): string {
        return i.value.toString();
    }
}

var asdf: ASTGenerator = new ASTGenerator([ new lexedItem(lexType.WRITE_CLAUSE_WRITE, null), new lexedItem(lexType.INT_LITERAL, "10"), new lexedItem(lexType.EOF, null)]);
console.log("hi!");
console.log(Compiler.compileProgram(asdf.program()));
