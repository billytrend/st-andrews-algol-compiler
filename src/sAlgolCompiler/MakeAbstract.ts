import * as C from "./GeneratedFiles/ConcreteSyntax";
import * as A from "./AbstractSyntax";


export function program(prog: C.program_sequence_question_mark): A.Program {
    let out: A.Program = new A.Program();
    out.sequence = sequence(prog.sequence_0);
    return out;
}

export function sequence(seq: C.sequence): A.Sequence {

    let out: A.Sequence = new A.Sequence();

    while (seq) {
        if (seq instanceof C.sequence_declaration_maybe_underscore_9tcgc8) {
            let typed = <C.sequence_declaration_maybe_underscore_9tcgc8>seq;
            out.clauses.push(thing_declaration(typed.declaration_0));

            if (typed.maybe_9tcgc8_1 instanceof C.maybe_9tcgc8_semi_colon_sequence) {
                seq = (<C.maybe_9tcgc8_semi_colon_sequence>typed.maybe_9tcgc8_1).sequence_1;
            }
        } else if (seq instanceof C.sequence_clause_maybe_underscore_9tcgc8) {

        }

    }

    return out;
}

export function if_clause(if_cl:C.clause_if_clause_do_clause): A.Conditional {
    let out = new A.Conditional();
    out.test = clause(if_cl.clause_1);
    out.thenCl = clause(if_cl.clause_3);
    return out;
}

export function if_else_clause(if_cl:C.clause_if_clause_then_clause_else_clause): A.Conditional {
    let out = new A.Conditional();
    out.test = clause(if_cl.clause_1);
    out.thenCl = clause(if_cl.clause_3);
    out.elseCl = clause(if_cl.clause_5);
    return out;
}

export function repeat_while_do(loop:C.clause_repeat_clause_while_clause_maybe_underscore_misevu): A.Loop {
    let out = new A.Loop();
    out.first = clause(loop.clause_1);
    out.test = clause(loop.clause_3);
    if (loop.maybe_misevu_4 instanceof C.maybe_misevu_do_clause) {
        let tight = <C.maybe_misevu_do_clause>loop.maybe_misevu_4;
        out.last = clause(tight.clause_1);
    }
    return out;
}

export function while_do(loop:C.clause_while_clause_do_clause): A.Loop {
    let out = new A.Loop();
    out.test = clause(loop.clause_1);
    out.last = clause(loop.clause_3);
    return out;
}

export function for_loop(loop:C.clause_for_identifier_equals_clause_to_clause_maybe_underscore_1sbj2iy_do_clause): A.ForLoop {
    let out = new A.ForLoop();
    out.incrVar = loop.identifier_1.flatten();
    out.initial = clause(loop.clause_3);
    out.final = clause(loop.clause_5);
    if (loop.maybe_1sbj2iy_6 instanceof C.maybe_1sbj2iy_by_clause) {
        let tight = <C.maybe_1sbj2iy_by_clause>loop.maybe_1sbj2iy_6;
        out.increment = clause(tight.clause_1);
    }
    out.body = clause(loop.clause_8);
    return out;
}

export function switch_statment(stmt: C.clause_case_clause_of_case_underscore_list_default_colon_clause): A.Switch {
    let out = new A.Switch();
    out.arg = stmt.clause_1;
    out.defcase = stmt.clause_5;
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

export function reassignment(reass:C.clause_name_colon_equals_clause): A.Declaration {
    let out = new A.Declaration(reass.name_0.flatten(), A.declaration_type.VAR);
    out.body = clause(reass.clause_2);
    return out;
}

export function write_clause(clause:C.clause_write_underscore_clause) {
    // TODO
}

export function recogniseRaster(raster_op_0:C.raster_op): A.operation_type {
    return A.operation_type[raster_op_0.flatten().toUpperCase()];
}

export function raster_op(rast:C.clause_raster): A.Operation {
    let out = new A.Operation();
    let tight = <C.raster_raster_underscore_op_clause_onto_clause>rast.raster_0;
    out.expressions = [
        clause(tight.clause_1),
        clause(tight.clause_3)
    ];
    out.operator = recogniseRaster(tight.raster_op_0);
    return out;
}

export function abort(): A.Application {
    return new A.Application("abort");;
}

export function clause(clause: C.clause): A.Clause {

    if (clause instanceof C.clause_if_clause_do_clause) {
        return if_clause(clause);
    } else if (clause instanceof C.clause_if_clause_then_clause_else_clause) {
        return if_else_clause(clause);
    } else if (clause instanceof C.clause_repeat_clause_while_clause_maybe_underscore_misevu) {
        return repeat_while_do(clause);
    } else if (clause instanceof C.clause_while_clause_do_clause) {
        return while_do(clause);
    } else if (clause instanceof C.clause_for_identifier_equals_clause_to_clause_maybe_underscore_1sbj2iy_do_clause) {
        return for_loop(clause);
    } else if (clause instanceof C.clause_case_clause_of_case_underscore_list_default_colon_clause) {
        return switch_statment(clause);
    } else if (clause instanceof C.clause_name_colon_equals_clause) {
        return reassignment(clause);
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


export function identifier_list(list: C.identifier_list): string[] {
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

export function field_list(list: C.field_list): A.argType[] {
    let tight = <C.field_list_type1_identifier_underscore_list_maybe_underscore_syz3x4>list;
    let out: A.argType[] = [];

    while (true) {
        let list = identifier_list(tight.identifier_list_1);
        // TODO: support more complex types
        let type = tight.type1_0.flatten().toUpperCase();

        for (let arg of list) {
            out.push(new A.argType(arg, A.salgol_types[type]));
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

export function thing_declaration(decl: C.declaration): A.Declaration {
    let out: A.Declaration;

    if (decl instanceof C.declaration_let_underscore_decl) {
        let let_decl = <C.let_decl_let_identifier_init_underscore_op_clause>decl.let_decl_0;
        out = new A.Declaration(let_decl.identifier_1.flatten(), A.declaration_type.VAR);
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
                // out.args = parameter_list(tight1.parameter_list_0);
            }
        }

    } else if (decl instanceof C.declaration_forward) {

    }

    return out;
}

// export function parameter_list(list: C.parameter_list): A.Literal {
//
// }
//
// export function parameter_list(list: C.parameter_list): A.Literal {
//
// }

export function literal(literal: C.literal): A.Literal {
    let flattened = literal.flatten();

    if (literal instanceof C.literal_real_underscore_literal) {
        return new A.Number(parseFloat(flattened));
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

export function val_cons(value_constructor:C.value_constructor):A.Expression {

    return null;
}

export function std_expr(standard_exp:C.standard_exp):A.Expression {
    let standard_exp = <C.standard_exp_standard_underscore_name_maybe_underscore_1bo5n98>standard_exp;
    let out = new A.Application(standard_exp.standard_name_0.flatten());
    if (standard_exp.maybe_1bo5n98_1 instanceof C.maybe_1bo5n98_open_parenthesis_clause_close_parenthesis) {
        let args = <C.maybe_1bo5n98_open_parenthesis_clause_close_parenthesis>standard_exp.maybe_1bo5n98_1;
        out.args = [clause(args.clause_1)];
    }
    return out;
}

export function clause_list(list: C.clause_list): A.Clause[] {
    let clauses: A.Clause[] = [];

    while (list instanceof C.clause_list_clause_maybe_underscore_1hyvkjk) {
        let comma_list = <C.clause_list_clause_maybe_underscore_1hyvkjk>list;
        clauses.push(clause(comma_list.clause_0));

        if (comma_list.maybe_1hyvkjk_1 instanceof C.maybe_1hyvkjk_comma_clause_underscore_list) {
            list = comma_list.maybe_1hyvkjk_1;
        }
    }

    return clauses;
}

export function application(application:C.application):A.Expression {
    let tightened = <C.application_identifier_maybe_underscore_1cr5dkj> application;
    let out = new A.Application(tightened.identifier_0.flatten());

    let brackets = tightened.maybe_1cr5dkj_1;
    if (brackets instanceof C.maybe_1cr5dkj_open_parenthesis_maybe_underscore_bk760w_close_parenthesis) {
        let maybeClauseList = <C.maybe_bk760w>brackets.maybe_bk760w_1;

        if (maybeClauseList instanceof C.maybe_bk760w_clause_underscore_list) {
            out.args = clause_list(brackets.maybe_bk760w_1.clause_list_0);
        }
    }

    return out;
}

export function bounds(bounds:C.exp6_bounds_underscore_op_open_parenthesis_clause_close_parenthesis):A.Expression {

    return null;
}



export function  expr(expObject: (C.expression|C.exp1|C.exp2|C.exp3|C.exp4|C.exp5|C.exp6)): A.Expression {

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


export function operation(inputExpression: (C.expression|C.exp1|C.exp2|C.exp3|C.exp4|C.exp5|C.exp6)): A.Expression {

    if(inputExpression instanceof C.expression_exp1_maybe_underscore_1muzyql) {
        let exp = <C.expression_exp1_maybe_underscore_1muzyql>inputExpression;

        let expArray = function (maybe: C.maybe_1muzyql): A.Expression[] {
            let expressions = [];

            if (maybe instanceof C.maybe_1muzyql_empty) {
                return expressions;
            } else if (maybe instanceof C.maybe_1muzyql_or_exp1_maybe_underscore_1muzyql) {
                return [expr(maybe.exp1_1)].concat(expArray(maybe.maybe_1muzyql_2));
            }
        };

        let expressions = [expr(exp.exp1_0)].concat(expArray(exp.maybe_1muzyql_1));
        return new A.Operation(expressions, A.operation_type.OR);

    }

    if(inputExpression instanceof C.exp1_exp2_maybe_underscore_bsxeh4) {
        let exp = <C.exp1_exp2_maybe_underscore_bsxeh4>inputExpression;

        let expArray = function (maybe: C.maybe_bsxeh4): A.Expression[] {
            let expressions = [];

            if (maybe instanceof C.maybe_bsxeh4_empty) {
                return expressions;
            } else if (maybe instanceof C.maybe_bsxeh4_and_exp2_maybe_underscore_bsxeh4) {
                return [expr(maybe.exp2_1)].concat(expArray(maybe.maybe_bsxeh4_2));
            }
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

    //if(exp instanceof C.exp3_exp4_maybe_underscore_1p6ahk4 && exp.maybe_1p6ahk4_1) {
    //    let exp = <exp3_exp4_maybe_underscore_1p6ahk4>exp;
    //
    //    let expEval = function (maybe: C.maybe_1p6ahk4): C.A.Expression[] {
    //        if (maybe instanceof C.maybe_1p6ahk4_empty) {
    //            return [];
    //        } else if (maybe instanceof C.maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4) {
    //            return new A.Operation(expEval(maybe.maybe_1p6ahk4_2), whichAddOp(maybe.add_op_0));
    //        }
    //    };
    //
    //    let expressions = [expr(exp.exp4_0)].concat(expArray(exp.maybe_1p6ahk4_1));
    //    return new A.Operation(expressions, A.operation_type.MUL);
    //}
    //
    //if(exp instanceof C.exp4_exp5_maybe_underscore_hufv7o && exp.maybe_hufv7o_1) {
    //    let exp = <exp1_exp2_maybe_underscore_bsxeh4>exp;
    //
    //    let expArray = function (maybe: C.maybe_bsxeh4): C.A.Expression[] {
    //        let expressions = [];
    //
    //        if (maybe instanceof C.maybe_bsxeh4_empty) {
    //            return expressions;
    //        } else if (maybe instanceof C.maybe_bsxeh4_and_exp2_maybe_underscore_bsxeh4) {
    //            return [expr(maybe.exp2_1)].concat(expArray(maybe.maybe_bsxeh4_2));
    //        }
    //    };
    //
    //    let expressions = [expr(exp.exp2_0)].concat(expArray(exp.maybe_bsxeh4_1));
    //    return new A.Operation(expressions, A.operation_type.OR);
    //}

    return null;
}

export function whichAddOp(add: C.add_op) {
    switch (add.flatten()) {
        case "+": return A.operation_type.ADD;
        case "-": return A.operation_type.SUB;
    }
}

export function whichRelOp(rel: C.rel_op): A.operation_type{
    if (rel instanceof C.rel_op_eq_underscore_op) {
        let theOp = (<C.rel_op_eq_underscore_op>C.rel_op).eq_op_0;
        if (theOp instanceof C.eq_op_equals) {
            return A.operation_type.EQ;
        } else if (theOp instanceof C.eq_op_exclamation_mark_equals) {
            return A.operation_type.NEQ;
        }
    }

    if (rel instanceof C.rel_op_compar_underscore_op) {
        let theOp = (<C.rel_op_compar_underscore_op>C.rel_op).compar_op_0;
        if (theOp instanceof C.compar_op_less_than) {
            return A.operation_type.LT;
        } else if (theOp instanceof C.compar_op_less_than_equals) {
            return A.operation_type.LEQ;
        } else if (theOp instanceof C.compar_op_greater_than) {
            return A.operation_type.GT;
        } else if (theOp instanceof C.compar_op_greater_than_equals) {
            return A.operation_type.GEQ;
        }
    }

    if (rel instanceof C.rel_op_type_underscore_op) {
        let theOp = (<C.rel_op_type_underscore_op>C.rel_op).type_op_0;
        if (theOp instanceof C.type_op_is) {
            return A.operation_type.IS;
        } else if (theOp instanceof C.type_op_isnt) {
            return A.operation_type.ISNT;
        }
    }

    return null;
};