import * as ConcreteSyntax from '../GeneratedFiles/ConcreteSyntax';

//noinspection TypeScriptUnresolvedVariable
ConcreteSyntax.let_decl_let_identifier_init_underscore_op_clause = ConcreteSyntax.let_decl_let_identifier_init_underscore_op_clause.bind(null, true);
ConcreteSyntax.identifier_id = ConcreteSyntax.identifier_id.bind(null, true);

ConcreteSyntax.structure_decl_structure_identifier_maybe_underscore_1digw99.prototype.compile = function() {
    return "";
};

ConcreteSyntax.proc_decl_procedure_identifier_maybe_underscore_1uryuqr_semi_colon_clause.prototype.compile = function() {
    return "" +
    "\nfunction " + this.identifier_1.compile() + this.maybe_1uryuqr_2.compile() + "{\n" + this.clause_4.compile() + "};";
};

ConcreteSyntax.maybe_1uryuqr_open_parenthesis_maybe_underscore_1yynizo_maybe_underscore_154oq1b_close_parenthesis.prototype.compile = function() {
    return "(" + this.maybe_1yynizo_1.compile() + ")";
};

ConcreteSyntax.maybe_154oq1b_arrow_type_underscore_id.prototype.compile = function() {
    return "";
};

ConcreteSyntax.identifier_list_identifier_maybe_underscore_d7691q.prototype.compile = function() {
    return this.identifier_0.compile() + (this.maybe_d7691q_1 ? ", " + this.maybe_d7691q_1.compile() : "");
};


module.exports = ConcreteSyntax;