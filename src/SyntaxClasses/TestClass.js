var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lexType;
(function (lexType) {
    lexType[lexType["LET"] = 0] = "LET";
    lexType[lexType["ID"] = 1] = "ID";
    lexType[lexType["INIT_OP"] = 2] = "INIT_OP";
    lexType[lexType["EOF"] = 3] = "EOF";
    lexType[lexType["STRUCTURE"] = 4] = "STRUCTURE";
    lexType[lexType["PROCEDURE"] = 5] = "PROCEDURE";
    lexType[lexType["FORWARD"] = 6] = "FORWARD";
    lexType[lexType["WRITE_CLAUSE_WRITE"] = 7] = "WRITE_CLAUSE_WRITE";
    lexType[lexType["STANDARD_NAME"] = 8] = "STANDARD_NAME";
    lexType[lexType["IF"] = 9] = "IF";
    lexType[lexType["REPEAT"] = 10] = "REPEAT";
    lexType[lexType["WHILE"] = 11] = "WHILE";
    lexType[lexType["FOR"] = 12] = "FOR";
    lexType[lexType["CASE"] = 13] = "CASE";
    lexType[lexType["INT_LITERAL"] = 14] = "INT_LITERAL";
    lexType[lexType["COMMA"] = 15] = "COMMA";
    lexType[lexType["TILDA"] = 16] = "TILDA";
})(lexType || (lexType = {}));
var lexedItem = (function () {
    function lexedItem(type, value) {
        this.type = type;
        this.value = value;
    }
    lexedItem.prototype.getType = function () {
        return this.type;
    };
    lexedItem.prototype.getValue = function () {
        return this.value;
    };
    return lexedItem;
})();
var Matcher = (function () {
    function Matcher() {
    }
    Matcher.matchLiteral = function (type) {
        return type == lexType.INT_LITERAL;
    };
    Matcher.matchClause = function (type) {
        return this.matchWriteClause(type);
    };
    Matcher.matchWriteClause = function (type) {
        return type == lexType.WRITE_CLAUSE_WRITE;
    };
    return Matcher;
})();
// session
var program = (function () {
    function program() {
    }
    return program;
})();
var sequenceItem = (function () {
    function sequenceItem() {
    }
    return sequenceItem;
})();
var sequence = (function () {
    function sequence() {
    }
    return sequence;
})();
var declaration = (function (_super) {
    __extends(declaration, _super);
    function declaration() {
        _super.apply(this, arguments);
    }
    return declaration;
})(sequenceItem);
var let_decl = (function (_super) {
    __extends(let_decl, _super);
    function let_decl() {
        _super.apply(this, arguments);
    }
    return let_decl;
})(declaration);
// TODO: is = different to :=
var init_op = (function () {
    function init_op() {
    }
    return init_op;
})();
var structure_decl = (function (_super) {
    __extends(structure_decl, _super);
    function structure_decl() {
        _super.apply(this, arguments);
    }
    return structure_decl;
})(declaration);
var field_list = (function () {
    function field_list() {
    }
    return field_list;
})();
var proc_decl = (function (_super) {
    __extends(proc_decl, _super);
    function proc_decl() {
        _super.apply(this, arguments);
    }
    return proc_decl;
})(declaration);
var parameter = (function () {
    function parameter() {
    }
    return parameter;
})();
var parameter1 = (function (_super) {
    __extends(parameter1, _super);
    function parameter1() {
        _super.apply(this, arguments);
    }
    return parameter1;
})(parameter);
var parameter2 = (function (_super) {
    __extends(parameter2, _super);
    function parameter2() {
        _super.apply(this, arguments);
    }
    return parameter2;
})(parameter);
var ptype_listable = (function () {
    function ptype_listable() {
    }
    return ptype_listable;
})();
var proc_type = (function (_super) {
    __extends(proc_type, _super);
    function proc_type() {
        _super.apply(this, arguments);
    }
    return proc_type;
})(ptype_listable);
var s_decl = (function (_super) {
    __extends(s_decl, _super);
    function s_decl() {
        _super.apply(this, arguments);
    }
    return s_decl;
})(ptype_listable);
var forward = (function (_super) {
    __extends(forward, _super);
    function forward() {
        _super.apply(this, arguments);
    }
    return forward;
})(declaration);
var type1 = (function (_super) {
    __extends(type1, _super);
    function type1() {
        _super.apply(this, arguments);
    }
    return type1;
})(ptype_listable);
// TODO
var type_star = (function (_super) {
    __extends(type_star, _super);
    function type_star() {
        _super.apply(this, arguments);
    }
    return type_star;
})(ptype_listable);
var type_id_enum;
(function (type_id_enum) {
    type_id_enum[type_id_enum["int"] = 0] = "int";
    type_id_enum[type_id_enum["real"] = 1] = "real";
    type_id_enum[type_id_enum["bool"] = 2] = "bool";
    type_id_enum[type_id_enum["string"] = 3] = "string";
    type_id_enum[type_id_enum["pixel"] = 4] = "pixel";
    type_id_enum[type_id_enum["pic"] = 5] = "pic";
    type_id_enum[type_id_enum["pntr"] = 6] = "pntr";
    type_id_enum[type_id_enum["file"] = 7] = "file";
})(type_id_enum || (type_id_enum = {}));
var type_id_pixel_enum;
(function (type_id_pixel_enum) {
    type_id_pixel_enum[type_id_pixel_enum["pixel"] = 0] = "pixel";
    type_id_pixel_enum[type_id_pixel_enum["cpixel"] = 1] = "cpixel";
})(type_id_pixel_enum || (type_id_pixel_enum = {}));
var type_id = (function () {
    function type_id() {
    }
    return type_id;
})();
var clause = (function (_super) {
    __extends(clause, _super);
    function clause() {
        _super.apply(this, arguments);
    }
    return clause;
})(sequenceItem);
var ifDoClause = (function (_super) {
    __extends(ifDoClause, _super);
    function ifDoClause() {
        _super.apply(this, arguments);
    }
    return ifDoClause;
})(clause);
var ifThenElse = (function (_super) {
    __extends(ifThenElse, _super);
    function ifThenElse() {
        _super.apply(this, arguments);
    }
    return ifThenElse;
})(clause);
var repeatWhileDo = (function (_super) {
    __extends(repeatWhileDo, _super);
    function repeatWhileDo() {
        _super.apply(this, arguments);
    }
    return repeatWhileDo;
})(clause);
var whileDo = (function (_super) {
    __extends(whileDo, _super);
    function whileDo() {
        _super.apply(this, arguments);
    }
    return whileDo;
})(clause);
var forToByDo = (function (_super) {
    __extends(forToByDo, _super);
    function forToByDo() {
        _super.apply(this, arguments);
    }
    return forToByDo;
})(clause);
var caseOfDefault = (function (_super) {
    __extends(caseOfDefault, _super);
    function caseOfDefault() {
        _super.apply(this, arguments);
    }
    return caseOfDefault;
})(clause);
var nameClause = (function (_super) {
    __extends(nameClause, _super);
    function nameClause() {
        _super.apply(this, arguments);
    }
    return nameClause;
})(clause);
var case_list = (function () {
    function case_list() {
    }
    return case_list;
})();
var write_clause = (function (_super) {
    __extends(write_clause, _super);
    function write_clause() {
        _super.apply(this, arguments);
    }
    return write_clause;
})(clause);
var write_list = (function () {
    function write_list() {
    }
    return write_list;
})();
var raster = (function () {
    function raster() {
    }
    return raster;
})();
var expression = (function (_super) {
    __extends(expression, _super);
    function expression() {
        _super.apply(this, arguments);
    }
    return expression;
})(clause);
var exp1 = (function () {
    function exp1() {
    }
    return exp1;
})();
var exp2 = (function () {
    function exp2() {
        this.truth = true;
    }
    return exp2;
})();
var exp3 = (function () {
    function exp3() {
    }
    return exp3;
})();
var exp4 = (function () {
    function exp4() {
    }
    return exp4;
})();
var exp5 = (function () {
    function exp5() {
    }
    return exp5;
})();
var exp6 = (function () {
    function exp6() {
    }
    return exp6;
})();
var begin_end_exp6 = (function (_super) {
    __extends(begin_end_exp6, _super);
    function begin_end_exp6() {
        _super.apply(this, arguments);
    }
    return begin_end_exp6;
})(sequence);
var dereference = (function () {
    function dereference() {
    }
    return dereference;
})();
var application = (function () {
    function application() {
    }
    return application;
})();
var structure_creation = (function () {
    function structure_creation() {
    }
    return structure_creation;
})();
var value_constructor = (function () {
    function value_constructor() {
    }
    return value_constructor;
})();
var vector_constr = (function () {
    function vector_constr() {
    }
    return vector_constr;
})();
var range = (function () {
    function range() {
    }
    return range;
})();
var image_constr = (function () {
    function image_constr() {
    }
    return image_constr;
})();
var subimage_constr = (function () {
    function subimage_constr() {
    }
    return subimage_constr;
})();
var picture_constr = (function () {
    function picture_constr() {
    }
    return picture_constr;
})();
var literal = (function () {
    function literal() {
    }
    return literal;
})();
var int_literal = (function () {
    function int_literal() {
    }
    return int_literal;
})();
var real_literal = (function () {
    function real_literal() {
    }
    return real_literal;
})();
var boolean_literal = (function () {
    function boolean_literal() {
    }
    return boolean_literal;
})();
var string_literal = (function () {
    function string_literal() {
    }
    return string_literal;
})();
var char = (function () {
    function char() {
    }
    return char;
})();
var special_character = (function () {
    function special_character() {
    }
    return special_character;
})();
var special_follow = (function () {
    function special_follow() {
    }
    return special_follow;
})();
var pixel_literal = (function () {
    function pixel_literal() {
    }
    return pixel_literal;
})();
var pntr_literal = (function () {
    function pntr_literal() {
    }
    return pntr_literal;
})();
var file_literal = (function () {
    function file_literal() {
    }
    return file_literal;
})();
var lab = (function () {
    function lab() {
    }
    return lab;
})();
var rab = (function () {
    function rab() {
    }
    return rab;
})();
var lsb = (function () {
    function lsb() {
    }
    return lsb;
})();
var rsb = (function () {
    function rsb() {
    }
    return rsb;
})();
var star = (function () {
    function star() {
    }
    return star;
})();
var bar = (function () {
    function bar() {
    }
    return bar;
})();
var add_op = (function () {
    function add_op() {
    }
    return add_op;
})();
var mult_op = (function () {
    function mult_op() {
    }
    return mult_op;
})();
var pixel_op = (function () {
    function pixel_op() {
    }
    return pixel_op;
})();
var int_mult_op = (function () {
    function int_mult_op() {
    }
    return int_mult_op;
})();
var real_mult_op = (function () {
    function real_mult_op() {
    }
    return real_mult_op;
})();
var pic_op = (function () {
    function pic_op() {
    }
    return pic_op;
})();
var rel_op = (function () {
    function rel_op() {
    }
    return rel_op;
})();
var eq_op = (function () {
    function eq_op() {
    }
    return eq_op;
})();
var compar_op = (function () {
    function compar_op() {
    }
    return compar_op;
})();
var type_op = (function () {
    function type_op() {
    }
    return type_op;
})();
var arrow = (function () {
    function arrow() {
    }
    return arrow;
})();
var double_quote = (function () {
    function double_quote() {
    }
    return double_quote;
})();
var single_quote = (function () {
    function single_quote() {
    }
    return single_quote;
})();
var identifier = (function () {
    function identifier() {
    }
    return identifier;
})();
var id = (function () {
    function id() {
    }
    return id;
})();
var id_follow = (function () {
    function id_follow() {
    }
    return id_follow;
})();
var standard_exp = (function () {
    function standard_exp() {
    }
    return standard_exp;
})();
var standard_name = (function () {
    function standard_name() {
    }
    return standard_name;
})();
var standard_id = (function () {
    function standard_id() {
    }
    return standard_id;
})();
// terminals
var abort = (function (_super) {
    __extends(abort, _super);
    function abort() {
        _super.apply(this, arguments);
    }
    abort.terminal = "abort";
    return abort;
})(clause);
var letter = (function () {
    function letter() {
    }
    return letter;
})();
var a = (function (_super) {
    __extends(a, _super);
    function a() {
        _super.apply(this, arguments);
        this.terminal = "a";
    }
    return a;
})(letter);
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
        this.terminal = "b";
    }
    return b;
})(letter);
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.apply(this, arguments);
        this.terminal = "c";
    }
    return c;
})(letter);
var d = (function (_super) {
    __extends(d, _super);
    function d() {
        _super.apply(this, arguments);
        this.terminal = "d";
    }
    return d;
})(letter);
var e = (function (_super) {
    __extends(e, _super);
    function e() {
        _super.apply(this, arguments);
        this.terminal = "e";
    }
    return e;
})(letter);
var f = (function (_super) {
    __extends(f, _super);
    function f() {
        _super.apply(this, arguments);
        this.terminal = "f";
    }
    return f;
})(letter);
var g = (function (_super) {
    __extends(g, _super);
    function g() {
        _super.apply(this, arguments);
        this.terminal = "g";
    }
    return g;
})(letter);
var h = (function (_super) {
    __extends(h, _super);
    function h() {
        _super.apply(this, arguments);
        this.terminal = "h";
    }
    return h;
})(letter);
var i = (function (_super) {
    __extends(i, _super);
    function i() {
        _super.apply(this, arguments);
        this.terminal = "i";
    }
    return i;
})(letter);
var j = (function (_super) {
    __extends(j, _super);
    function j() {
        _super.apply(this, arguments);
        this.terminal = "j";
    }
    return j;
})(letter);
var k = (function (_super) {
    __extends(k, _super);
    function k() {
        _super.apply(this, arguments);
        this.terminal = "k";
    }
    return k;
})(letter);
var l = (function (_super) {
    __extends(l, _super);
    function l() {
        _super.apply(this, arguments);
        this.terminal = "l";
    }
    return l;
})(letter);
var m = (function (_super) {
    __extends(m, _super);
    function m() {
        _super.apply(this, arguments);
        this.terminal = "m";
    }
    return m;
})(letter);
var n = (function (_super) {
    __extends(n, _super);
    function n() {
        _super.apply(this, arguments);
        this.terminal = "n";
    }
    return n;
})(letter);
var o = (function (_super) {
    __extends(o, _super);
    function o() {
        _super.apply(this, arguments);
        this.terminal = "o";
    }
    return o;
})(letter);
var p = (function (_super) {
    __extends(p, _super);
    function p() {
        _super.apply(this, arguments);
        this.terminal = "p";
    }
    return p;
})(letter);
var q = (function (_super) {
    __extends(q, _super);
    function q() {
        _super.apply(this, arguments);
        this.terminal = "q";
    }
    return q;
})(letter);
var r = (function (_super) {
    __extends(r, _super);
    function r() {
        _super.apply(this, arguments);
        this.terminal = "r";
    }
    return r;
})(letter);
var s = (function (_super) {
    __extends(s, _super);
    function s() {
        _super.apply(this, arguments);
        this.terminal = "s";
    }
    return s;
})(letter);
var t = (function (_super) {
    __extends(t, _super);
    function t() {
        _super.apply(this, arguments);
        this.terminal = "t";
    }
    return t;
})(letter);
var u = (function (_super) {
    __extends(u, _super);
    function u() {
        _super.apply(this, arguments);
        this.terminal = "u";
    }
    return u;
})(letter);
var v = (function (_super) {
    __extends(v, _super);
    function v() {
        _super.apply(this, arguments);
        this.terminal = "v";
    }
    return v;
})(letter);
var w = (function (_super) {
    __extends(w, _super);
    function w() {
        _super.apply(this, arguments);
        this.terminal = "w";
    }
    return w;
})(letter);
var x = (function (_super) {
    __extends(x, _super);
    function x() {
        _super.apply(this, arguments);
        this.terminal = "x";
    }
    return x;
})(letter);
var y = (function (_super) {
    __extends(y, _super);
    function y() {
        _super.apply(this, arguments);
        this.terminal = "y";
    }
    return y;
})(letter);
var z = (function (_super) {
    __extends(z, _super);
    function z() {
        _super.apply(this, arguments);
        this.terminal = "z";
    }
    return z;
})(letter);
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
        this.terminal = "A";
    }
    return A;
})(letter);
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
        this.terminal = "B";
    }
    return B;
})(letter);
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
        this.terminal = "C";
    }
    return C;
})(letter);
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
        this.terminal = "D";
    }
    return D;
})(letter);
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
        this.terminal = "E";
    }
    return E;
})(letter);
var F = (function (_super) {
    __extends(F, _super);
    function F() {
        _super.apply(this, arguments);
        this.terminal = "F";
    }
    return F;
})(letter);
var G = (function (_super) {
    __extends(G, _super);
    function G() {
        _super.apply(this, arguments);
        this.terminal = "G";
    }
    return G;
})(letter);
var H = (function (_super) {
    __extends(H, _super);
    function H() {
        _super.apply(this, arguments);
        this.terminal = "H";
    }
    return H;
})(letter);
var I = (function (_super) {
    __extends(I, _super);
    function I() {
        _super.apply(this, arguments);
        this.terminal = "I";
    }
    return I;
})(letter);
var J = (function (_super) {
    __extends(J, _super);
    function J() {
        _super.apply(this, arguments);
        this.terminal = "J";
    }
    return J;
})(letter);
var K = (function (_super) {
    __extends(K, _super);
    function K() {
        _super.apply(this, arguments);
        this.terminal = "K";
    }
    return K;
})(letter);
var L = (function (_super) {
    __extends(L, _super);
    function L() {
        _super.apply(this, arguments);
        this.terminal = "L";
    }
    return L;
})(letter);
var M = (function (_super) {
    __extends(M, _super);
    function M() {
        _super.apply(this, arguments);
        this.terminal = "M";
    }
    return M;
})(letter);
var N = (function (_super) {
    __extends(N, _super);
    function N() {
        _super.apply(this, arguments);
        this.terminal = "N";
    }
    return N;
})(letter);
var O = (function (_super) {
    __extends(O, _super);
    function O() {
        _super.apply(this, arguments);
        this.terminal = "O";
    }
    return O;
})(letter);
var P = (function (_super) {
    __extends(P, _super);
    function P() {
        _super.apply(this, arguments);
        this.terminal = "P";
    }
    return P;
})(letter);
var Q = (function (_super) {
    __extends(Q, _super);
    function Q() {
        _super.apply(this, arguments);
        this.terminal = "Q";
    }
    return Q;
})(letter);
var R = (function (_super) {
    __extends(R, _super);
    function R() {
        _super.apply(this, arguments);
        this.terminal = "R";
    }
    return R;
})(letter);
var S = (function (_super) {
    __extends(S, _super);
    function S() {
        _super.apply(this, arguments);
        this.terminal = "S";
    }
    return S;
})(letter);
var T = (function (_super) {
    __extends(T, _super);
    function T() {
        _super.apply(this, arguments);
        this.terminal = "T";
    }
    return T;
})(letter);
var U = (function (_super) {
    __extends(U, _super);
    function U() {
        _super.apply(this, arguments);
        this.terminal = "U";
    }
    return U;
})(letter);
var V = (function (_super) {
    __extends(V, _super);
    function V() {
        _super.apply(this, arguments);
        this.terminal = "V";
    }
    return V;
})(letter);
var W = (function (_super) {
    __extends(W, _super);
    function W() {
        _super.apply(this, arguments);
        this.terminal = "W";
    }
    return W;
})(letter);
var X = (function (_super) {
    __extends(X, _super);
    function X() {
        _super.apply(this, arguments);
        this.terminal = "X";
    }
    return X;
})(letter);
var Y = (function (_super) {
    __extends(Y, _super);
    function Y() {
        _super.apply(this, arguments);
        this.terminal = "Y";
    }
    return Y;
})(letter);
var Z = (function (_super) {
    __extends(Z, _super);
    function Z() {
        _super.apply(this, arguments);
        this.terminal = "Z";
    }
    return Z;
})(letter);
var digit = (function () {
    function digit() {
    }
    return digit;
})();
var d0 = (function (_super) {
    __extends(d0, _super);
    function d0() {
        _super.apply(this, arguments);
        this.terminal = "0";
    }
    return d0;
})(digit);
var d1 = (function (_super) {
    __extends(d1, _super);
    function d1() {
        _super.apply(this, arguments);
        this.terminal = "1";
    }
    return d1;
})(digit);
var d2 = (function (_super) {
    __extends(d2, _super);
    function d2() {
        _super.apply(this, arguments);
        this.terminal = "2";
    }
    return d2;
})(digit);
var d3 = (function (_super) {
    __extends(d3, _super);
    function d3() {
        _super.apply(this, arguments);
        this.terminal = "3";
    }
    return d3;
})(digit);
var d4 = (function (_super) {
    __extends(d4, _super);
    function d4() {
        _super.apply(this, arguments);
        this.terminal = "4";
    }
    return d4;
})(digit);
var d5 = (function (_super) {
    __extends(d5, _super);
    function d5() {
        _super.apply(this, arguments);
        this.terminal = "5";
    }
    return d5;
})(digit);
var d6 = (function (_super) {
    __extends(d6, _super);
    function d6() {
        _super.apply(this, arguments);
        this.terminal = "6";
    }
    return d6;
})(digit);
var d7 = (function (_super) {
    __extends(d7, _super);
    function d7() {
        _super.apply(this, arguments);
        this.terminal = "7";
    }
    return d7;
})(digit);
var d8 = (function (_super) {
    __extends(d8, _super);
    function d8() {
        _super.apply(this, arguments);
        this.terminal = "8";
    }
    return d8;
})(digit);
var d9 = (function (_super) {
    __extends(d9, _super);
    function d9() {
        _super.apply(this, arguments);
        this.terminal = "9";
    }
    return d9;
})(digit);
var writer = (function () {
    function writer() {
    }
    return writer;
})();
var write = (function (_super) {
    __extends(write, _super);
    function write() {
        _super.apply(this, arguments);
        this.terminal = "write";
    }
    return write;
})(writer);
var output = (function (_super) {
    __extends(output, _super);
    function output() {
        _super.apply(this, arguments);
        this.terminal = "output";
    }
    return output;
})(writer);
var outbyte = (function (_super) {
    __extends(outbyte, _super);
    function outbyte() {
        _super.apply(this, arguments);
        this.terminal = "out.byte";
    }
    return outbyte;
})(writer);
var out16 = (function (_super) {
    __extends(out16, _super);
    function out16() {
        _super.apply(this, arguments);
        this.terminal = "out.16";
    }
    return out16;
})(writer);
var out32 = (function (_super) {
    __extends(out32, _super);
    function out32() {
        _super.apply(this, arguments);
        this.terminal = "out.32";
    }
    return out32;
})(writer);
var raster_op = (function () {
    function raster_op() {
    }
    return raster_op;
})();
var ror = (function (_super) {
    __extends(ror, _super);
    function ror() {
        _super.apply(this, arguments);
        this.terminal = "ror";
    }
    return ror;
})(raster_op);
var rand = (function (_super) {
    __extends(rand, _super);
    function rand() {
        _super.apply(this, arguments);
        this.terminal = "rand";
    }
    return rand;
})(raster_op);
var xor = (function (_super) {
    __extends(xor, _super);
    function xor() {
        _super.apply(this, arguments);
        this.terminal = "xor";
    }
    return xor;
})(raster_op);
var copy = (function (_super) {
    __extends(copy, _super);
    function copy() {
        _super.apply(this, arguments);
        this.terminal = "copy";
    }
    return copy;
})(raster_op);
var nand = (function (_super) {
    __extends(nand, _super);
    function nand() {
        _super.apply(this, arguments);
        this.terminal = "nand";
    }
    return nand;
})(raster_op);
var nor = (function (_super) {
    __extends(nor, _super);
    function nor() {
        _super.apply(this, arguments);
        this.terminal = "nor";
    }
    return nor;
})(raster_op);
var not = (function (_super) {
    __extends(not, _super);
    function not() {
        _super.apply(this, arguments);
        this.terminal = "not";
    }
    return not;
})(raster_op);
var xnor = (function (_super) {
    __extends(xnor, _super);
    function xnor() {
        _super.apply(this, arguments);
        this.terminal = "xnor ";
    }
    return xnor;
})(raster_op);
var ASTGenerator = (function () {
    function ASTGenerator(input) {
        this.input = input;
    }
    ASTGenerator.prototype.accept = function (sym, toBe) {
        return sym.getType() == toBe;
    };
    ASTGenerator.prototype.expect = function (sym, toBe) {
        if (sym.getType() != toBe) {
            this.err(sym, toBe);
            return false;
        }
        return true;
    };
    ASTGenerator.prototype.err = function (sym, toBe) {
    };
    ASTGenerator.prototype.program = function () {
        var token = this.input[0];
        var p = new program();
        if (token.getType() != lexType.EOF) {
            p.sequence = this.sequence();
        }
        return p;
    };
    ASTGenerator.prototype.sequence = function () {
        var token = this.input[0];
        var s = new sequence();
        if (Matcher.matchClause(token.getType())) {
            s.item = this.clause();
        }
        return s;
    };
    ASTGenerator.prototype.write_list = function () {
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
    };
    ASTGenerator.prototype.clause = function () {
        var type = this.input[0].getType();
        if (type == lexType.WRITE_CLAUSE_WRITE) {
            return this.write_clause_write();
        }
        if (type == lexType.INT_LITERAL) {
            return this.int_literal();
        }
        return null;
    };
    ASTGenerator.prototype.write_clause_write = function () {
        this.expect(this.input.shift(), lexType.WRITE_CLAUSE_WRITE);
        var w = new write_clause();
        w.write_list = this.write_list();
        return w;
    };
    ASTGenerator.prototype.int_literal = function () {
        var i = new int_literal();
        var sym = this.input.shift();
        if (this.expect(sym, lexType.INT_LITERAL)) {
            i.value = parseInt(sym.getValue());
        }
        return i;
    };
    return ASTGenerator;
})();
var Compiler = (function () {
    function Compiler() {
    }
    Compiler.compile = function (p) {
        var compiled = [];
        return compiled;
    };
    Compiler.compileProgram = function (p) {
        var compiled = [];
        compiled = compiled.concat(this.compileSequence(p.sequence));
        return compiled;
    };
    Compiler.compileSequence = function (s) {
        var compiled = [];
        do {
            console.log(this.compileWriteClause(s.item));
            compiled = compiled.concat(this.compileWriteClause(s.item));
            s = s.nextSequence;
        } while (s);
        return compiled;
    };
    Compiler.compileWriteClause = function (w) {
        var compiled = "console.log(";
        compiled = compiled.concat(this.compileWriteList(w.write_list));
        compiled = compiled.concat(");");
        return compiled;
    };
    Compiler.compileWriteList = function (w) {
        var compiled = "";
        compiled = compiled.concat(this.compileIntLiteral(w.clause1));
        return compiled;
    };
    Compiler.compileIntLiteral = function (i) {
        return i.value.toString();
    };
    return Compiler;
})();
var asdf = new ASTGenerator([new lexedItem(lexType.WRITE_CLAUSE_WRITE, null), new lexedItem(lexType.INT_LITERAL, "10"), new lexedItem(lexType.EOF, null)]);
console.log("hi!");
console.log(Compiler.compileProgram(asdf.program()));
//# sourceMappingURL=TestClass.js.map