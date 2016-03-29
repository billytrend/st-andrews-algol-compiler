import * as C from "./GeneratedFiles/ConcreteSyntax";
import * as A from "./AbstractSyntax";
import {operation_type} from "./AbstractSyntax";
import {write_type} from "./AbstractSyntax";

export var flatten = program;
class ProcedureType {
    args: A.Type[] = [];
    result: A.Type;
    identifier: string = "";
}

function program(prog: C.program): A.Program {
    let tight = <C.program_sequence_question_mark>prog;
    let out: A.Program = new A.Program();
    out.sequence = sequence(tight.sequence_0);
    return out;
}

function sequence(seq: C.sequence): A.Sequence {
    let out: A.Sequence = new A.Sequence();

    while (true) {
        if (seq instanceof C.sequence_declaration_maybe_underscore_9tcgc8) {
            let tight = <C.sequence_declaration_maybe_underscore_9tcgc8>seq;
            out.clauses.push(thing_declaration(tight.declaration_0));

            if (tight.maybe_9tcgc8_1 instanceof C.maybe_9tcgc8_semi_colon_sequence) {
                seq = (<C.maybe_9tcgc8_semi_colon_sequence>tight.maybe_9tcgc8_1).sequence_1;
            } else {
                break;
            }
        } else if (seq instanceof C.sequence_clause_maybe_underscore_9tcgc8) {
            let tight = <C.sequence_clause_maybe_underscore_9tcgc8>seq;
            out.clauses.push(clause(tight.clause_0));

            if (tight.maybe_9tcgc8_1 instanceof C.maybe_9tcgc8_semi_colon_sequence) {
                seq = (<C.maybe_9tcgc8_semi_colon_sequence>tight.maybe_9tcgc8_1).sequence_1;
            } else {
                break;
            }
        } else {
            break;
        }
    }

    return out;
}

function if_clause(if_cl:C.clause_if_clause_disambiguated_underscore_less_than_clause_greater_than): A.Conditional {
    let out = new A.Conditional();
    out.test = clause(if_cl.clause_1);

    if (if_cl.disambiguated_clause_2 instanceof C.disambiguated_clause_do_clause) {
        let tight = <C.disambiguated_clause_do_clause>if_cl.disambiguated_clause_2;
        out.thenCl = clause(tight.clause_1);
    } else if (if_cl.disambiguated_clause_2 instanceof C.disambiguated_clause_then_clause_else_clause) {
        let tight = <C.disambiguated_clause_then_clause_else_clause>if_cl.disambiguated_clause_2;
        out.thenCl = clause(tight.clause_1);
        out.elseCl = clause(tight.clause_3);
    }
    return out;
}

function repeat_while_do(loop:C.clause_repeat_clause_while_clause_maybe_underscore_misevu): A.Loop {
    let out = new A.Loop();
    out.first = clause(loop.clause_1);
    out.test = clause(loop.clause_3);
    if (loop.maybe_misevu_4 instanceof C.maybe_misevu_do_clause) {
        let tight = <C.maybe_misevu_do_clause>loop.maybe_misevu_4;
        out.last = clause(tight.clause_1);
    }
    return out;
}

function while_do(loop:C.clause_while_clause_do_clause): A.Loop {
    let out = new A.Loop();
    out.test = clause(loop.clause_1);
    out.last = clause(loop.clause_3);
    return out;
}

function for_loop(loop:C.clause_for_identifier_equals_clause_to_clause_maybe_underscore_1sbj2iy_do_clause): A.ForLoop {
    let out = new A.ForLoop();
    out.initial = new A.Declaration(loop.identifier_1.flatten(), A.declaration_type.VAR_DECL);
    out.initial.body = clause(loop.clause_3);
    out.final = clause(loop.clause_5);
    if (loop.maybe_1sbj2iy_6 instanceof C.maybe_1sbj2iy_by_clause) {
        let tight = <C.maybe_1sbj2iy_by_clause>loop.maybe_1sbj2iy_6;
        out.increment = clause(tight.clause_1);
    }
    out.body = clause(loop.clause_8);
    return out;
}

function switch_statment(stmt: C.clause_case_clause_of_case_underscore_list_default_colon_clause): A.Switch {
    let out = new A.Switch();
    out.arg = clause(stmt.clause_1);
    out.defcase = clause(stmt.clause_5);
    let case_list = stmt.case_list_3;
    while (case_list instanceof C.case_list_clause_underscore_list_colon_clause_semi_colon_maybe_underscore_ymf5h5) {
        let list = <C.case_list_clause_underscore_list_colon_clause_semi_colon_maybe_underscore_ymf5h5>case_list;
        out.cases.push(
            clause_list(list.clause_list_0),
            clause(list.clause_2)
        );
        case_list = list.maybe_ymf5h5_4['case_list_0'];
    }

    return out;
}

function write_clause(wr_clause:C.clause_write_underscore_clause) {
    if (wr_clause.write_clause_0 instanceof  C.write_clause_write_write_underscore_list) {
        let out = new A.Application("write");
        out.shouldTypeCheck = false;
        out.returnType = new A.Type(A.concrete_type.void);
        out.applType = A.declaration_type.PROC;
        let tight = <C.write_clause_write_write_underscore_list>wr_clause.write_clause_0;
        if (tight.write_list_1 instanceof C.write_list) {
            let write_list = <C.write_list_clause_maybe_underscore_160tn3f_maybe_underscore_1k3m0xc>tight.write_list_1;
            while (true) {
                out.args.push(clause(write_list.clause_0));
                if (write_list.maybe_1k3m0xc_2 instanceof C.maybe_1k3m0xc_comma_write_underscore_list) {
                    let tight = <C.maybe_1k3m0xc_comma_write_underscore_list>write_list.maybe_1k3m0xc_2;
                    write_list = <C.write_list_clause_maybe_underscore_160tn3f_maybe_underscore_1k3m0xc>tight.write_list_1;
                } else {
                    break;
                }
            }
        }
        return out;
    }
}

function recogniseRaster(raster_op_0:C.raster_op): A.operation_type {
    return A.operation_type[raster_op_0.flatten().toUpperCase()];
}

function raster_op(rast:C.clause_raster): A.Operation {
    let out = new A.Operation();
    let tight = <C.raster_raster_underscore_op_clause_onto_clause>rast.raster_0;
    out.expressions = [
        clause(tight.clause_1),
        clause(tight.clause_3)
    ];
    out.operator = recogniseRaster(tight.raster_op_0);
    return out;
}

function abort(): A.Application {
    let out = new A.Application("abort");
    out.shouldTypeCheck = false;
    out.applType = A.declaration_type.PROC;
    return out;
}

function clause(clause: C.clause): A.Clause {

    if (clause instanceof C.clause_if_clause_disambiguated_underscore_less_than_clause_greater_than) {
        return if_clause(clause);
    } else if (clause instanceof C.clause_repeat_clause_while_clause_maybe_underscore_misevu) {
        return repeat_while_do(clause);
    } else if (clause instanceof C.clause_while_clause_do_clause) {
        return while_do(clause);
    } else if (clause instanceof C.clause_for_identifier_equals_clause_to_clause_maybe_underscore_1sbj2iy_do_clause) {
        return for_loop(clause);
    } else if (clause instanceof C.clause_case_clause_of_case_underscore_list_default_colon_clause) {
        return switch_statment(clause);
    } else if (clause instanceof C.clause_write_underscore_clause) {
        return write_clause(clause);
    } else if (clause instanceof C.clause_raster) {
        return raster_op(clause);
    } else if (clause instanceof C.clause_abort) {
        return abort();
    } else if (clause instanceof C.clause_expression) {
        return expr(clause.expression_0);
    }
}


function identifier_list(list: C.identifier_list): string[] {
    let tight = <C.identifier_list_identifier_maybe_underscore_d7691q> list;
    let out: string[] = [];
    while (true) {
        out.push(tight.identifier_0.flatten());
        if (tight.maybe_d7691q_1 instanceof C.maybe_d7691q_comma_identifier_underscore_list) {
            let tight1 = <C.maybe_d7691q_comma_identifier_underscore_list>tight.maybe_d7691q_1;
            tight = <C.identifier_list_identifier_maybe_underscore_d7691q>tight1.identifier_list_1;
        } else {
            return out;
        }
    }
    return out;
}


function type_id(id: C.type_id): A.Type {
    let out = new A.Type();

    while (true) {
        if (id instanceof C.type_id_star_type1) {
            let tight = <C.type_id_star_type1>id;
            id = tight.type1_1;
            out.constantStack.push(A.type_prefix.star);
            let t1 = type1(tight.type1_1);
            out.constantStack = out.constantStack.concat(t1.constantStack);
            out.type = t1.type;
        } else {
            out.type = A.concrete_type[id.flatten().toLowerCase()];
            break;
        }
    }

    return out;
}

function type1(t: C.type1): A.Type {
    let tight = <C.type1_maybe_underscore_pba0tv_type_underscore_id>t;
    let isConstant = tight.maybe_pba0tv_0 instanceof C.maybe_pba0tv_c;
    let out = type_id(tight.type_id_1);
    if (isConstant) {
        out.constantStack.unshift(A.type_prefix.constant);
    }
    return out;
}

function field_list(list: C.field_list): A.Declaration[] {
    let tight = <C.field_list_type1_identifier_underscore_list_maybe_underscore_syz3x4>list;
    let out: A.Declaration[] = [];

    while (true) {
        let list = identifier_list(tight.identifier_list_1);

        for (let arg of list) {
            let decl = new A.Declaration(arg, A.declaration_type.VAR_DECL);
            decl.returnType = type1(tight.type1_0);
            out.push(decl);
        }

        if (tight.maybe_syz3x4_2 instanceof  C.maybe_syz3x4_semi_colon_field_underscore_list) {
            let tight1 = <C.maybe_syz3x4_semi_colon_field_underscore_list>tight.maybe_syz3x4_2;
            tight = <C.field_list_type1_identifier_underscore_list_maybe_underscore_syz3x4>tight1.field_list_1;
        } else {
            break;
        }
    }

    return out;
}

function thing_declaration(decl: C.declaration): A.Declaration {
    let out: A.Declaration;

    if (decl instanceof C.declaration_let_underscore_decl) {
        let let_decl = <C.let_decl_let_identifier_init_underscore_op_clause>decl.let_decl_0;
        let constant = let_decl.init_op_2 instanceof C.init_op_colon_equals ?
            A.declaration_type.CONS_DECL : A.declaration_type.VAR_DECL;
        out = new A.Declaration(let_decl.identifier_1.flatten(), constant);

        out.body = clause(let_decl.clause_3);
    } else if (decl instanceof C.declaration_structure_underscore_decl) {
        let structure_decl = <C.structure_decl_structure_identifier_maybe_underscore_1digw99>decl.structure_decl_0;
        out = new A.Declaration(structure_decl.identifier_1.flatten(), A.declaration_type.STRUCT);
        if (structure_decl.maybe_1digw99_2 instanceof C.maybe_1digw99_open_parenthesis_maybe_underscore_1a1as4v_close_parenthesis) {
            let tight = <C.maybe_1digw99_open_parenthesis_maybe_underscore_1a1as4v_close_parenthesis>structure_decl.maybe_1digw99_2;

            if (tight.maybe_1a1as4v_1 instanceof C.maybe_1a1as4v_field_underscore_list) {
                let tight1 = <C.maybe_1a1as4v_field_underscore_list>tight.maybe_1a1as4v_1;
                out.args = field_list(tight1.field_list_0);
            }
        }
    } else if (decl instanceof C.declaration_proc_underscore_decl) {
        let proc_decl = <C.proc_decl_procedure_identifier_maybe_underscore_1uryuqr_semi_colon_clause>decl.proc_decl_0;
        out = new A.Declaration(proc_decl.identifier_1.flatten(), A.declaration_type.PROC);

        if (proc_decl.maybe_1uryuqr_2 instanceof C.maybe_1uryuqr_open_parenthesis_maybe_underscore_1yynizo_maybe_underscore_154oq1b_close_parenthesis) {
            let tight = <C.maybe_1uryuqr_open_parenthesis_maybe_underscore_1yynizo_maybe_underscore_154oq1b_close_parenthesis>proc_decl.maybe_1uryuqr_2;

            if (tight.maybe_1yynizo_1 instanceof C.maybe_1yynizo_parameter_underscore_list) {
                let tight1 = <C.maybe_1yynizo_parameter_underscore_list>tight.maybe_1yynizo_1;
                out.args = parameter_list(tight1.parameter_list_0);
            }

            if (tight.maybe_154oq1b_2 instanceof C.maybe_154oq1b_arrow_type_underscore_id) {
                let tight1 = <C.maybe_154oq1b_arrow_type_underscore_id>tight.maybe_154oq1b_2;
                out.returnType = type_id(tight1.type_id_1);
            }
        }

        if (!out.returnType) {
            out.returnType = new A.Type(A.concrete_type.void);
        }

        out.body = clause(proc_decl.clause_4);
        if (!(out.body instanceof A.Sequence)) {
            let seq = new A.Sequence();
            seq.clauses = [out.body];
            out.body = seq;
        }

    } else if (decl instanceof C.declaration_forward) {
        let tight = <C.declaration_forward>decl;
        out = for_decl(tight.forward_0);
    }

    return out;
}

function for_decl(forward: C.forward): A.Declaration {
    let tight = <C.forward_forward_identifier_proc_underscore_type>forward;
    let decl = proc_type(tight.proc_type_2);
    decl.identifier = tight.identifier_1.flatten();
    return decl;
}

function ptype_list(list: C.ptype_list): A.Type[] {
    let out: A.Type[] = [];
    while (true) {
        if(list instanceof C.ptype_list_type1_maybe_underscore_1lamsg5) {
            let tight = <C.ptype_list_type1_maybe_underscore_1lamsg5> list;
            out.push(type1(tight.type1_0));
        } else if(list instanceof C.ptype_list_proc_underscore_type_maybe_underscore_1lamsg5) {
            let tight = <C.ptype_list_proc_underscore_type_maybe_underscore_1lamsg5> list;
            let procType = proc_type(tight.proc_type_0);
            out = out.concat(procType[0]);
        } else if(list instanceof C.ptype_list_s_underscore_decl_maybe_underscore_1lamsg5) {
            let tight = <C.ptype_list_s_underscore_decl_maybe_underscore_1lamsg5> list;
            out.push(thing_declaration(tight.s_decl_0));
        }
        let tight = <
            C.ptype_list_type1_maybe_underscore_1lamsg5 |
            C.ptype_list_proc_underscore_type_maybe_underscore_1lamsg5 |
            C.ptype_list_s_underscore_decl_maybe_underscore_1lamsg5>list;

        if (tight.maybe_1lamsg5_1 instanceof C.maybe_1lamsg5_comma_ptype_underscore_list) {
            let tight1 = <C.maybe_1lamsg5_comma_ptype_underscore_list>tight.maybe_1lamsg5_1;
            list = tight1.ptype_list_1;
        } else {
            break;
        }
    }

    return out;
}

function proc_type(proc_type: C.proc_type): A.Declaration {
    let tight = <C.proc_type_open_parenthesis_maybe_underscore_8jf5s5_maybe_underscore_154oq1b_close_parenthesis>proc_type;
    let out = new A.Declaration(null, A.declaration_type.FORWARD);
    if (tight.maybe_8jf5s5_1 instanceof C.maybe_8jf5s5_ptype_underscore_list) {
        let tight1 = <C.maybe_8jf5s5_ptype_underscore_list>tight.maybe_8jf5s5_1;
        let list = tight1.ptype_list_0;
        out.args = ptype_list(list).map(x => new A.Declaration(null, A.declaration_type.VAR_DECL, x));
    }

    if (tight.maybe_154oq1b_2 instanceof C.maybe_154oq1b_arrow_type_underscore_id) {
        let tight1 = <C.maybe_154oq1b_arrow_type_underscore_id>tight.maybe_154oq1b_2;
        out.returnType = type_id(tight1.type_id_1);
    }

    return out;
}

function parameter(parameter: C.parameter): A.Declaration[] {
    if (parameter instanceof C.parameter_type1_identifier_underscore_list) {
        let tight = <C.parameter_type1_identifier_underscore_list>parameter;
        let id_list = identifier_list(tight.identifier_list_1);
        return id_list.map(id => {
            let decl = new A.Declaration(id, A.declaration_type.VAR_DECL);
            decl.returnType = type1(tight.type1_0);
            return decl;
        });

    } else if (parameter instanceof C.parameter_structure_underscore_decl) {
        let tight = <C.parameter_structure_underscore_decl>parameter;
        return [thing_declaration(tight.structure_decl_0)];

    } else if (parameter instanceof C.parameter_proc_underscore_type_identifier_underscore_list) {
        let tight = <C.parameter_proc_underscore_type_identifier_underscore_list>parameter;
        //return [thing_declaration(tight.)];
    }
}

function parameter_list(list: C.parameter_list): A.Declaration[] {
    let tight = <C.parameter_list_parameter_maybe_underscore_9w498z>list;
    let out: A.Declaration[] = [];

    while (true) {
        out = out.concat(parameter(tight.parameter_0));

        if (tight.maybe_9w498z_1 instanceof C.maybe_9w498z_semi_colon_parameter_underscore_list) {
            let tight1 = <C.maybe_9w498z_semi_colon_parameter_underscore_list>tight.maybe_9w498z_1;
            tight = <C.parameter_list_parameter_maybe_underscore_9w498z>tight1.parameter_list_1;
        } else {
            break;
        }
    }

    return out;
}

// function parameter_list(list: C.parameter_list): A.Literal {
//
// }

function literal(literal: C.literal): A.Literal {
    let flattened = literal.flatten();

    if (literal instanceof C.literal_real_underscore_literal) {
        return new A.Number(parseFloat(flattened), flattened.indexOf(".") != -1);
    }else if (literal instanceof C.literal_boolean_underscore_literal) {
        return new A.Bool(flattened == 'true');
    }else if (literal instanceof C.literal_string_underscore_literal) {
        return new A.Str(flattened);
    }else if (literal instanceof C.literal_pixel_underscore_literal) {
        // TODO
        return new A.Pixel(parseFloat(flattened));
    }else if (literal instanceof C.literal_pntr_underscore_literal) {
        return new A.Pointer(parseFloat(flattened));
    }else if (literal instanceof C.literal_file_underscore_literal) {
        return new A.NullFile(null);
    }

    return null;
}


function vector(vector: C.vector_constr): A.Vector {
    let out = new A.Vector();
    if(vector instanceof C.vector_constr_vector_range_of_clause) {
        let tight = <C.vector_constr_vector_range_of_clause>vector;
        // TODO
    } else if(vector instanceof C.vector_constr_at_symbol_clause_of_type1_lsb_clause_underscore_list_rsb) {
        let tight = <C.vector_constr_at_symbol_clause_of_type1_lsb_clause_underscore_list_rsb>vector;
        out.innerType = type1(tight.type1_3);
        //out.innerType.constantStack.unshift(A.type_prefix.star);
        out.values = clause_list(tight.clause_list_5);
        out.lb = clause(tight.clause_1);
        out.returnType = type1(tight.type1_3);
        out.returnType.constantStack.unshift(A.type_prefix.star);
    }

    return out;
}

function val_cons(value_constructor:C.value_constructor):A.Expression {
    if (value_constructor instanceof C.value_constructor_vector_underscore_constr) {
        let tight = <C.value_constructor_vector_underscore_constr>value_constructor;
        return vector(tight.vector_constr_0);
    } else if (value_constructor instanceof C.value_constructor_image_underscore_constr) {
        let tight = <C.value_constructor_image_underscore_constr>value_constructor;

    } else if (value_constructor instanceof C.value_constructor_subimage_underscore_constr) {
        let tight = <C.value_constructor_subimage_underscore_constr>value_constructor;

    } else if (value_constructor instanceof C.value_constructor_picture_underscore_constr) {
        let tight = <C.value_constructor_picture_underscore_constr>value_constructor;

    }
    return null;
}

function std_expr(standard_exp:C.standard_exp):A.Expression {
    let standard_exp = <C.standard_exp_standard_underscore_name_maybe_underscore_1bo5n98>standard_exp;
    let out = new A.Application(standard_exp.standard_name_0.flatten());
    if (standard_exp.maybe_1bo5n98_1 instanceof C.maybe_1bo5n98_open_parenthesis_clause_close_parenthesis) {
        let args = <C.maybe_1bo5n98_open_parenthesis_clause_close_parenthesis>standard_exp.maybe_1bo5n98_1;
        out.args = [clause(args.clause_1)];
    }
    return out;
}

function clause_list(list: C.clause_list): A.Clause[] {
    let clauses: A.Clause[] = [];

    while (true) {
        let comma_list = <C.clause_list_clause_maybe_underscore_1hyvkjk>list;
        clauses.push(clause(comma_list.clause_0));

        if (comma_list.maybe_1hyvkjk_1 instanceof C.maybe_1hyvkjk_comma_clause_underscore_list) {
            let tight = <C.maybe_1hyvkjk_comma_clause_underscore_list>comma_list.maybe_1hyvkjk_1;
            list = tight.clause_list_1;
        } else {
            break;
        }
    }

    return clauses;
}

function application(application:C.application):A.Expression {
    let tightened = <C.application_identifier_maybe_underscore_254f26> application;
    let tight1 = tightened.maybe_254f26_1;
    let out;

    if (tight1 instanceof C.maybe_254f26_app_underscore_tail) {
        let tail = tight1.app_tail_0;
        if (tail instanceof C.app_tail_colon_equals_clause) {
            out = new A.Declaration(tightened.identifier_0.flatten(), A.declaration_type.VAR_ASS);
            out.body = clause(tail.clause_1);
            out.returnType = new A.Type(A.concrete_type.void);
        } else if (tail instanceof C.app_tail_maybe_underscore_1cr5dkj) {
            out = new A.Application(tightened.identifier_0.flatten());
            let brackets = tail.maybe_1cr5dkj_0;
            while (true) {
                if (brackets instanceof C.maybe_1cr5dkj_open_parenthesis_maybe_underscore_bk760w_close_parenthesis_maybe_underscore_1cr5dkj) {
                    let tight = <C.maybe_1cr5dkj_open_parenthesis_maybe_underscore_bk760w_close_parenthesis_maybe_underscore_1cr5dkj>brackets;
                    let maybeClauseList = <C.maybe_bk760w>brackets.maybe_bk760w_1;

                    if (maybeClauseList instanceof C.maybe_bk760w_clause_underscore_list) {
                        out.args = out.args.concat(clause_list(brackets.maybe_bk760w_1.clause_list_0));
                    }

                    brackets = tight.maybe_1cr5dkj_3;
                } else {
                    break;
                }
            }
        }
    } else {
        out = new A.Application(tightened.identifier_0.flatten());
    }


    return out;
}

function bounds(bounds:C.exp6_bounds_underscore_op_open_parenthesis_clause_close_parenthesis):A.Expression {
    return null;
}

function  expr(expObject: (C.expression|C.exp1|C.exp2|C.exp3|C.exp4|C.exp5|C.exp6)): A.Expression {

    if (expObject['maybe_1muzyql_1'] ||
        expObject['maybe_bsxeh4_1']||
        (expObject['maybe_11y77da_0'] || expObject['maybe_u2lq49_2']) ||
        expObject['maybe_1p6ahk4_1']||
        expObject['maybe_hufv7o_1']||
        expObject['maybe_ihpz75_']) {

        return operation(expObject);
    }

    if (expObject instanceof C.expression_exp1_maybe_underscore_1muzyql) {
        return expr(expObject.exp1_0);
    }

    if (expObject instanceof C.exp1_exp2_maybe_underscore_bsxeh4) {
        return expr(expObject.exp2_0);
    }

    if (expObject instanceof C.exp2_maybe_underscore_11y77da_exp3_maybe_underscore_u2lq49) {
        return expr(expObject.exp3_1);
    }

    if (expObject instanceof C.exp3_exp4_maybe_underscore_1p6ahk4) {
        return expr(expObject.exp4_0);
    }

    if (expObject instanceof C.exp4_exp5_maybe_underscore_hufv7o) {
        return expr(expObject.exp5_0);
    }

    if (expObject instanceof C.exp5_maybe_underscore_ihpz75_exp6) {
        return expr(expObject.exp6_1);
    }

    if (expObject instanceof C.exp6_standard_underscore_exp) {
        let typed = <C.exp6_standard_underscore_exp>expObject;
        return std_expr(typed.standard_exp_0);

    } else if (expObject instanceof C.exp6_literal) {
        let typed = <C.exp6_literal>expObject;
        return literal(typed.literal_0);

    } else if (expObject instanceof C.exp6_value_underscore_constructor) {
        let typed = <C.exp6_value_underscore_constructor>expObject;
        return val_cons(typed.value_constructor_0);

    } else if (expObject instanceof C.exp6_open_parenthesis_clause_close_parenthesis) {
        let typed = <C.exp6_open_parenthesis_clause_close_parenthesis>expObject;
        return clause(typed.clause_1);

    } else if (expObject instanceof C.exp6_begin_maybe_underscore_1ute4jz_end || expObject instanceof C.exp6_opening_brace_maybe_underscore_1ute4jz_closing_brace) {
        let typed = <C.exp6_begin_maybe_underscore_1ute4jz_end>expObject;
        if (typed.maybe_1ute4jz_1 instanceof C.maybe_1ute4jz_sequence) {
            return sequence((<C.maybe_1ute4jz_sequence>typed.maybe_1ute4jz_1).sequence_0);
        } else {
            return new A.Sequence();
        }
    } else if (expObject instanceof C.exp6_application) {
        let typed = <C.exp6_application>expObject;
        return application(typed.application_0);

    } else if (expObject instanceof C.exp6_bounds_underscore_op_open_parenthesis_clause_close_parenthesis) {
        let typed = <C.exp6_bounds_underscore_op_open_parenthesis_clause_close_parenthesis>expObject;
        return bounds(typed);

    }
}

function and_tail(out:A.Operation, tail: C.maybe_1p6ahk4) {
    let farLeft = out;

    while (true) {
        if (tail instanceof C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4) {
            let tight = <C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4>tail;
            if (tight.maybe_1p6ahk4_2 instanceof C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4) {
                let op = new A.Operation();
                let tight1 = <C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4>tight.maybe_1p6ahk4_2;
                op.operator = whichAddOp(tight1.add_op_0);
                op.expressions.push(expr(tight.exp4_1));
                farLeft.expressions.push(op);
                farLeft = op;
                tail = tight.maybe_1p6ahk4_2;
            } else {
                farLeft.expressions.push(expr(tight.exp4_1));
                break;
            }
        } else {
            break;
        }
    }

    return out;
}

function mul_tail(out:A.Operation, tail: C.maybe_hufv7o) {
    let farLeft = out;

    while (true) {
        if (tail instanceof C.maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o) {
            let tight = <C.maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o>tail;
            if (tight.maybe_hufv7o_2 instanceof C.maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o) {
                let op = new A.Operation();
                let tight1 = <C.maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o>tight.maybe_hufv7o_2;
                op.operator = whichMulOp(tight1.mult_op_0);
                op.expressions.push(expr(tight.exp5_1));
                farLeft.expressions.push(op);
                farLeft = op;
                tail = tight.maybe_hufv7o_2;
            } else {
                farLeft.expressions.push(expr(tight.exp5_1));
                break;
            }
        } else {
            break;
        }
    }

    return out;
}


function operation(inputExpression: (C.expression|C.exp1|C.exp2|C.exp3|C.exp4|C.exp5|C.exp6)): A.Expression {

    if(inputExpression instanceof C.expression_exp1_maybe_underscore_1muzyql) {
        let exp = <C.expression_exp1_maybe_underscore_1muzyql>inputExpression;

        let expArray = function (maybe: C.maybe_1muzyql): A.Expression[] {
            if (maybe instanceof C.maybe_1muzyql_or_exp1_maybe_underscore_1muzyql) {
                return [expr(maybe.exp1_1)].concat(expArray(maybe.maybe_1muzyql_2));
            }

            return [];
        };

        let expressions = [expr(exp.exp1_0)].concat(expArray(exp.maybe_1muzyql_1));
        return new A.Operation(expressions, A.operation_type.OR);

    }

    if(inputExpression instanceof C.exp1_exp2_maybe_underscore_bsxeh4) {
        let exp = <C.exp1_exp2_maybe_underscore_bsxeh4>inputExpression;

        let expArray = function (maybe: C.maybe_bsxeh4): A.Expression[] {
            if (maybe instanceof C.maybe_bsxeh4_and_exp2_maybe_underscore_bsxeh4) {
                return [expr(maybe.exp2_1)].concat(expArray(maybe.maybe_bsxeh4_2));
            }

            return [];
        };

        let expressions = [expr(exp.exp2_0)].concat(expArray(exp.maybe_bsxeh4_1));
        return new A.Operation(expressions, A.operation_type.OR);
    }

    if(inputExpression instanceof C.exp2_maybe_underscore_11y77da_exp3_maybe_underscore_u2lq49) {
        let maybeNotted: A.Expression;
        let exp = <C.exp2_maybe_underscore_11y77da_exp3_maybe_underscore_u2lq49>inputExpression;

        if (exp.maybe_11y77da_0) {
            maybeNotted = new A.Operation([expr(exp.exp3_1)], A.operation_type.NOT);
        }

        if (exp.maybe_u2lq49_2 instanceof C.maybe_u2lq49_rel_underscore_op_exp3) {
            let typed = <C.maybe_u2lq49_rel_underscore_op_exp3>exp.maybe_u2lq49_2;
            let left = maybeNotted ? maybeNotted : expr(exp.exp3_1);
            let right = expr(typed.exp3_1);

            return new A.Operation([left, right], whichRelOp(typed.rel_op_0));
        }

        return maybeNotted ? maybeNotted : expr(exp.exp3_1);
    }

    if(inputExpression instanceof C.exp3_exp4_maybe_underscore_1p6ahk4) {
        let tight = <C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4>inputExpression.maybe_1p6ahk4_1;
        let exp = <C.exp3_exp4_maybe_underscore_1p6ahk4>inputExpression;
        let out = new A.Operation([expr(exp.exp4_0)], whichAddOp(tight.add_op_0));
        return and_tail(out, exp.maybe_1p6ahk4_1)
    }

    if(inputExpression instanceof C.exp4_exp5_maybe_underscore_hufv7o) {
        let tight = <C.maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o>inputExpression.maybe_hufv7o_1;
        let exp = <C.exp4_exp5_maybe_underscore_hufv7o>inputExpression;
        let out = new A.Operation([expr(exp.exp5_0)], whichMulOp(tight.mult_op_0));
        return mul_tail(out, exp.maybe_hufv7o_1);
    }

    return null;
}

function whichAddOp(add: C.add_op) {
    let str = add.flatten();
    if (/\+/.test(str)) {
        return A.operation_type.ADD;
    } else if (/\-/.test(str)) {
        return A.operation_type.SUB;
    }
}

function whichMulOp(add: C.add_op) {
    let str = add.flatten();
    if (/\//.test(str)) {
        return A.operation_type.DIV;
    } else if (/\*/.test(str)) {
        return A.operation_type.MUL;
    }
}

function whichRelOp(rel: C.rel_op): A.operation_type{
    let str = rel.flatten();
    if (/\!=/.test(str)) {
        return A.operation_type.NEQ;
    } else if (/<=/.test(str)) {
        return A.operation_type.LEQ;
    } else if (/</.test(str)) {
        return A.operation_type.LT;
    } else if (/>=/.test(str)) {
        return A.operation_type.GEQ;
    } else if (/>/.test(str)) {
        return A.operation_type.GT;
    } else if (/=/.test(str)) {
        return A.operation_type.EQ;
    } else if (/is/.test(str)) {
        return A.operation_type.IS;
    } else if (/isnt/.test(str)) {
        return A.operation_type.ISNT;
    }
    return null;
};
