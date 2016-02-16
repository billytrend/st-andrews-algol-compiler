import {SalgolParseSymbol, SalgolTerminalClass} from '../GeneratedFileHelpers/SalgolParseSymbol'
export class program extends SalgolParseSymbol {};
export class program_sequence_question_mark extends program{
    public sequence_0:sequence;
    public question_mark_1: SalgolTerminalClass;
}
export class maybe_9tcgc8 extends SalgolParseSymbol {};
export class maybe_9tcgc8_empty extends maybe_9tcgc8{
}
export class maybe_9tcgc8_semi_colon_sequence extends maybe_9tcgc8{
    public semi_colon_0: SalgolTerminalClass;
    public sequence_1:sequence;
}
export class sequence extends SalgolParseSymbol {};
export class sequence_declaration_maybe_underscore_9tcgc8 extends sequence{
    public declaration_0:declaration;
    public maybe_9tcgc8_1:maybe_9tcgc8;
}
export class sequence_clause_maybe_underscore_9tcgc8 extends sequence{
    public clause_0:clause;
    public maybe_9tcgc8_1:maybe_9tcgc8;
}
export class declaration extends SalgolParseSymbol {};
export class declaration_let_underscore_decl extends declaration{
    public let_decl_0:let_decl;
}
export class declaration_structure_underscore_decl extends declaration{
    public structure_decl_0:structure_decl;
}
export class declaration_proc_underscore_decl extends declaration{
    public proc_decl_0:proc_decl;
}
export class declaration_forward extends declaration{
    public forward_0:forward;
}
export class let_decl extends SalgolParseSymbol {};
export class let_decl_let_identifier_init_underscore_op_clause extends let_decl{
    public let_0: SalgolTerminalClass;
    public identifier_1:identifier;
    public init_op_2:init_op;
    public clause_3:clause;
}
export class init_op extends SalgolParseSymbol {};
export class init_op_equals extends init_op{
    public equals_0: SalgolTerminalClass;
}
export class init_op_colon_equals extends init_op{
    public colon_equals_0: SalgolTerminalClass;
}
export class maybe_1a1as4v extends SalgolParseSymbol {};
export class maybe_1a1as4v_empty extends maybe_1a1as4v{
}
export class maybe_1a1as4v_field_underscore_list extends maybe_1a1as4v{
    public field_list_0:field_list;
}
export class maybe_1digw99 extends SalgolParseSymbol {};
export class maybe_1digw99_empty extends maybe_1digw99{
}
export class maybe_1digw99_open_parenthesis_maybe_underscore_1a1as4v_close_parenthesis extends maybe_1digw99{
    public open_parenthesis_0: SalgolTerminalClass;
    public maybe_1a1as4v_1:maybe_1a1as4v;
    public close_parenthesis_2: SalgolTerminalClass;
}
export class structure_decl extends SalgolParseSymbol {};
export class structure_decl_structure_identifier_maybe_underscore_1digw99 extends structure_decl{
    public structure_0: SalgolTerminalClass;
    public identifier_1:identifier;
    public maybe_1digw99_2:maybe_1digw99;
}
export class maybe_syz3x4 extends SalgolParseSymbol {};
export class maybe_syz3x4_empty extends maybe_syz3x4{
}
export class maybe_syz3x4_semi_colon_field_underscore_list extends maybe_syz3x4{
    public semi_colon_0: SalgolTerminalClass;
    public field_list_1:field_list;
}
export class field_list extends SalgolParseSymbol {};
export class field_list_type1_identifier_underscore_list_maybe_underscore_syz3x4 extends field_list{
    public type1_0:type1;
    public identifier_list_1:identifier_list;
    public maybe_syz3x4_2:maybe_syz3x4;
}
export class maybe_1yynizo extends SalgolParseSymbol {};
export class maybe_1yynizo_empty extends maybe_1yynizo{
}
export class maybe_1yynizo_parameter_underscore_list extends maybe_1yynizo{
    public parameter_list_0:parameter_list;
}
export class maybe_154oq1b extends SalgolParseSymbol {};
export class maybe_154oq1b_empty extends maybe_154oq1b{
}
export class maybe_154oq1b_arrow_type_underscore_id extends maybe_154oq1b{
    public arrow_0:arrow;
    public type_id_1:type_id;
}
export class maybe_1uryuqr extends SalgolParseSymbol {};
export class maybe_1uryuqr_empty extends maybe_1uryuqr{
}
export class maybe_1uryuqr_open_parenthesis_maybe_underscore_1yynizo_maybe_underscore_154oq1b_close_parenthesis extends maybe_1uryuqr{
    public open_parenthesis_0: SalgolTerminalClass;
    public maybe_1yynizo_1:maybe_1yynizo;
    public maybe_154oq1b_2:maybe_154oq1b;
    public close_parenthesis_3: SalgolTerminalClass;
}
export class proc_decl extends SalgolParseSymbol {};
export class proc_decl_procedure_identifier_maybe_underscore_1uryuqr_semi_colon_clause extends proc_decl{
    public procedure_0: SalgolTerminalClass;
    public identifier_1:identifier;
    public maybe_1uryuqr_2:maybe_1uryuqr;
    public semi_colon_3: SalgolTerminalClass;
    public clause_4:clause;
}
export class maybe_9w498z extends SalgolParseSymbol {};
export class maybe_9w498z_empty extends maybe_9w498z{
}
export class maybe_9w498z_semi_colon_parameter_underscore_list extends maybe_9w498z{
    public semi_colon_0: SalgolTerminalClass;
    public parameter_list_1:parameter_list;
}
export class parameter_list extends SalgolParseSymbol {};
export class parameter_list_parameter_maybe_underscore_9w498z extends parameter_list{
    public parameter_0:parameter;
    public maybe_9w498z_1:maybe_9w498z;
}
export class parameter extends SalgolParseSymbol {};
export class parameter_type1_identifier_underscore_list extends parameter{
    public type1_0:type1;
    public identifier_list_1:identifier_list;
}
export class parameter_structure_underscore_decl extends parameter{
    public structure_decl_0:structure_decl;
}
export class parameter_proc_underscore_type_identifier_underscore_list extends parameter{
    public proc_type_0:proc_type;
    public identifier_list_1:identifier_list;
}
export class maybe_8jf5s5 extends SalgolParseSymbol {};
export class maybe_8jf5s5_empty extends maybe_8jf5s5{
}
export class maybe_8jf5s5_ptype_underscore_list extends maybe_8jf5s5{
    public ptype_list_0:ptype_list;
}
export class proc_type extends SalgolParseSymbol {};
export class proc_type_open_parenthesis_maybe_underscore_8jf5s5_maybe_underscore_154oq1b_close_parenthesis extends proc_type{
    public open_parenthesis_0: SalgolTerminalClass;
    public maybe_8jf5s5_1:maybe_8jf5s5;
    public maybe_154oq1b_2:maybe_154oq1b;
    public close_parenthesis_3: SalgolTerminalClass;
}
export class maybe_1lamsg5 extends SalgolParseSymbol {};
export class maybe_1lamsg5_empty extends maybe_1lamsg5{
}
export class maybe_1lamsg5_comma_ptype_underscore_list extends maybe_1lamsg5{
    public comma_0: SalgolTerminalClass;
    public ptype_list_1:ptype_list;
}
export class ptype_list extends SalgolParseSymbol {};
export class ptype_list_type1_maybe_underscore_1lamsg5 extends ptype_list{
    public type1_0:type1;
    public maybe_1lamsg5_1:maybe_1lamsg5;
}
export class ptype_list_proc_underscore_type_maybe_underscore_1lamsg5 extends ptype_list{
    public proc_type_0:proc_type;
    public maybe_1lamsg5_1:maybe_1lamsg5;
}
export class ptype_list_s_underscore_decl_maybe_underscore_1lamsg5 extends ptype_list{
    public s_decl_0:s_decl;
    public maybe_1lamsg5_1:maybe_1lamsg5;
}
export class maybe_9jn6t5 extends SalgolParseSymbol {};
export class maybe_9jn6t5_empty extends maybe_9jn6t5{
}
export class maybe_9jn6t5_comma_type1_maybe_underscore_9jn6t5 extends maybe_9jn6t5{
    public comma_0: SalgolTerminalClass;
    public type1_1:type1;
    public maybe_9jn6t5_2:maybe_9jn6t5;
}
export class s_decl extends SalgolParseSymbol {};
export class s_decl_structure_open_parenthesis_type1_maybe_underscore_9jn6t5_close_parenthesis extends s_decl{
    public structure_open_parenthesis_0: SalgolTerminalClass;
    public type1_1:type1;
    public maybe_9jn6t5_2:maybe_9jn6t5;
    public close_parenthesis_3: SalgolTerminalClass;
}
export class forward extends SalgolParseSymbol {};
export class forward_forward_identifier_proc_underscore_type extends forward{
    public forward_0: SalgolTerminalClass;
    public identifier_1:identifier;
    public proc_type_2:proc_type;
}
export class maybe_pba0tv extends SalgolParseSymbol {};
export class maybe_pba0tv_empty extends maybe_pba0tv{
}
export class maybe_pba0tv_c extends maybe_pba0tv{
    public c_0: SalgolTerminalClass;
}
export class type1 extends SalgolParseSymbol {};
export class type1_maybe_underscore_pba0tv_type_underscore_id extends type1{
    public maybe_pba0tv_0:maybe_pba0tv;
    public type_id_1:type_id;
}
export class type_id extends SalgolParseSymbol {};
export class type_id_int extends type_id{
    public int_0: SalgolTerminalClass;
}
export class type_id_real extends type_id{
    public real_0: SalgolTerminalClass;
}
export class type_id_bool extends type_id{
    public bool_0: SalgolTerminalClass;
}
export class type_id_string extends type_id{
    public string_0: SalgolTerminalClass;
}
export class type_id_pixel extends type_id{
    public pixel_0: SalgolTerminalClass;
}
export class type_id_pic extends type_id{
    public pic_0: SalgolTerminalClass;
}
export class type_id_pntr extends type_id{
    public pntr_0: SalgolTerminalClass;
}
export class type_id_file extends type_id{
    public file_0: SalgolTerminalClass;
}
export class type_id_star_type1 extends type_id{
    public star_0:star;
    public type1_1:type1;
}
export class type_id_number_pixel extends type_id{
    public number_pixel_0: SalgolTerminalClass;
}
export class type_id_number_cpixel extends type_id{
    public number_cpixel_0: SalgolTerminalClass;
}
export class maybe_d7691q extends SalgolParseSymbol {};
export class maybe_d7691q_empty extends maybe_d7691q{
}
export class maybe_d7691q_comma_identifier_underscore_list extends maybe_d7691q{
    public comma_0: SalgolTerminalClass;
    public identifier_list_1:identifier_list;
}
export class identifier_list extends SalgolParseSymbol {};
export class identifier_list_identifier_maybe_underscore_d7691q extends identifier_list{
    public identifier_0:identifier;
    public maybe_d7691q_1:maybe_d7691q;
}
export class clause extends SalgolParseSymbol {};
export class clause_if_clause_do_clause extends clause{
    public if_0: SalgolTerminalClass;
    public clause_1:clause;
    public do_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class clause_if_clause_then_clause_else_clause extends clause{
    public if_0: SalgolTerminalClass;
    public clause_1:clause;
    public then_2: SalgolTerminalClass;
    public clause_3:clause;
    public else_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class clause_repeat_clause_while_clause_maybe_underscore_misevu extends clause{
    public repeat_0: SalgolTerminalClass;
    public clause_1:clause;
    public while_2: SalgolTerminalClass;
    public clause_3:clause;
    public maybe_misevu_4:maybe_misevu;
}
export class clause_while_clause_do_clause extends clause{
    public while_0: SalgolTerminalClass;
    public clause_1:clause;
    public do_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class clause_for_identifier_equals_clause_to_clause_maybe_underscore_1sbj2iy_do_clause extends clause{
    public for_0: SalgolTerminalClass;
    public identifier_1:identifier;
    public equals_2: SalgolTerminalClass;
    public clause_3:clause;
    public to_4: SalgolTerminalClass;
    public clause_5:clause;
    public maybe_1sbj2iy_6:maybe_1sbj2iy;
    public do_7: SalgolTerminalClass;
    public clause_8:clause;
}
export class clause_case_clause_of_case_underscore_list_default_colon_clause extends clause{
    public case_0: SalgolTerminalClass;
    public clause_1:clause;
    public of_2: SalgolTerminalClass;
    public case_list_3:case_list;
    public default_colon_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class clause_name_colon_equals_clause extends clause{
    public name_0:name;
    public colon_equals_1: SalgolTerminalClass;
    public clause_2:clause;
}
export class clause_write_underscore_clause extends clause{
    public write_clause_0:write_clause;
}
export class clause_raster extends clause{
    public raster_0:raster;
}
export class clause_abort extends clause{
    public abort_0: SalgolTerminalClass;
}
export class clause_expression extends clause{
    public expression_0:expression;
}
export class maybe_misevu extends SalgolParseSymbol {};
export class maybe_misevu_empty extends maybe_misevu{
}
export class maybe_misevu_do_clause extends maybe_misevu{
    public do_0: SalgolTerminalClass;
    public clause_1:clause;
}
export class maybe_1sbj2iy extends SalgolParseSymbol {};
export class maybe_1sbj2iy_empty extends maybe_1sbj2iy{
}
export class maybe_1sbj2iy_by_clause extends maybe_1sbj2iy{
    public by_0: SalgolTerminalClass;
    public clause_1:clause;
}
export class maybe_ymf5h5 extends SalgolParseSymbol {};
export class maybe_ymf5h5_empty extends maybe_ymf5h5{
}
export class maybe_ymf5h5_case_underscore_list extends maybe_ymf5h5{
    public case_list_0:case_list;
}
export class case_list extends SalgolParseSymbol {};
export class case_list_clause_underscore_list_colon_clause_semi_colon_maybe_underscore_ymf5h5 extends case_list{
    public clause_list_0:clause_list;
    public colon_1: SalgolTerminalClass;
    public clause_2:clause;
    public semi_colon_3: SalgolTerminalClass;
    public maybe_ymf5h5_4:maybe_ymf5h5;
}
export class write_clause extends SalgolParseSymbol {};
export class write_clause_write_write_underscore_list extends write_clause{
    public write_0: SalgolTerminalClass;
    public write_list_1:write_list;
}
export class write_clause_output_clause_comma_write_underscore_list extends write_clause{
    public output_0: SalgolTerminalClass;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public write_list_3:write_list;
}
export class write_clause_out_period_byte_clause_comma_clause_comma_clause extends write_clause{
    public out_period_byte_0: SalgolTerminalClass;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public clause_3:clause;
    public comma_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class write_clause_out_period_16_clause_comma_clause_comma_clause extends write_clause{
    public out_period_one_six_0: SalgolTerminalClass;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public clause_3:clause;
    public comma_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class write_clause_out_period_32_clause_comma_clause extends write_clause{
    public out_period_three_two_0: SalgolTerminalClass;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class maybe_160tn3f extends SalgolParseSymbol {};
export class maybe_160tn3f_empty extends maybe_160tn3f{
}
export class maybe_160tn3f_colon_clause extends maybe_160tn3f{
    public colon_0: SalgolTerminalClass;
    public clause_1:clause;
}
export class maybe_1k3m0xc extends SalgolParseSymbol {};
export class maybe_1k3m0xc_empty extends maybe_1k3m0xc{
}
export class maybe_1k3m0xc_comma_write_underscore_list extends maybe_1k3m0xc{
    public comma_0: SalgolTerminalClass;
    public write_list_1:write_list;
}
export class write_list extends SalgolParseSymbol {};
export class write_list_clause_maybe_underscore_160tn3f_maybe_underscore_1k3m0xc extends write_list{
    public clause_0:clause;
    public maybe_160tn3f_1:maybe_160tn3f;
    public maybe_1k3m0xc_2:maybe_1k3m0xc;
}
export class raster extends SalgolParseSymbol {};
export class raster_raster_underscore_op_clause_onto_clause extends raster{
    public raster_op_0:raster_op;
    public clause_1:clause;
    public onto_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class raster_op extends SalgolParseSymbol {};
export class raster_op_ror extends raster_op{
    public ror_0: SalgolTerminalClass;
}
export class raster_op_rand extends raster_op{
    public rand_0: SalgolTerminalClass;
}
export class raster_op_xor extends raster_op{
    public xor_0: SalgolTerminalClass;
}
export class raster_op_copy extends raster_op{
    public copy_0: SalgolTerminalClass;
}
export class raster_op_nand extends raster_op{
    public nand_0: SalgolTerminalClass;
}
export class raster_op_nor extends raster_op{
    public nor_0: SalgolTerminalClass;
}
export class raster_op_not extends raster_op{
    public not_0: SalgolTerminalClass;
}
export class raster_op_xnor extends raster_op{
    public xnor_0: SalgolTerminalClass;
}
export class maybe_1hyvkjk extends SalgolParseSymbol {};
export class maybe_1hyvkjk_empty extends maybe_1hyvkjk{
}
export class maybe_1hyvkjk_comma_clause_underscore_list extends maybe_1hyvkjk{
    public comma_0: SalgolTerminalClass;
    public clause_list_1:clause_list;
}
export class clause_list extends SalgolParseSymbol {};
export class clause_list_clause_maybe_underscore_1hyvkjk extends clause_list{
    public clause_0:clause;
    public maybe_1hyvkjk_1:maybe_1hyvkjk;
}
export class maybe_1muzyql extends SalgolParseSymbol {};
export class maybe_1muzyql_empty extends maybe_1muzyql{
}
export class maybe_1muzyql_or_exp1_maybe_underscore_1muzyql extends maybe_1muzyql{
    public or_0: SalgolTerminalClass;
    public exp1_1:exp1;
    public maybe_1muzyql_2:maybe_1muzyql;
}
export class expression extends SalgolParseSymbol {};
export class expression_exp1_maybe_underscore_1muzyql extends expression{
    public exp1_0:exp1;
    public maybe_1muzyql_1:maybe_1muzyql;
}
export class maybe_bsxeh4 extends SalgolParseSymbol {};
export class maybe_bsxeh4_empty extends maybe_bsxeh4{
}
export class maybe_bsxeh4_and_exp2_maybe_underscore_bsxeh4 extends maybe_bsxeh4{
    public and_0: SalgolTerminalClass;
    public exp2_1:exp2;
    public maybe_bsxeh4_2:maybe_bsxeh4;
}
export class exp1 extends SalgolParseSymbol {};
export class exp1_exp2_maybe_underscore_bsxeh4 extends exp1{
    public exp2_0:exp2;
    public maybe_bsxeh4_1:maybe_bsxeh4;
}
export class maybe_11y77da extends SalgolParseSymbol {};
export class maybe_11y77da_empty extends maybe_11y77da{
}
export class maybe_11y77da_tilde extends maybe_11y77da{
    public tilde_0: SalgolTerminalClass;
}
export class maybe_u2lq49 extends SalgolParseSymbol {};
export class maybe_u2lq49_empty extends maybe_u2lq49{
}
export class maybe_u2lq49_rel_underscore_op_exp3 extends maybe_u2lq49{
    public rel_op_0:rel_op;
    public exp3_1:exp3;
}
export class exp2 extends SalgolParseSymbol {};
export class exp2_maybe_underscore_11y77da_exp3_maybe_underscore_u2lq49 extends exp2{
    public maybe_11y77da_0:maybe_11y77da;
    public exp3_1:exp3;
    public maybe_u2lq49_2:maybe_u2lq49;
}
export class maybe_1p6ahk4 extends SalgolParseSymbol {};
export class maybe_1p6ahk4_empty extends maybe_1p6ahk4{
}
export class maybe_1p6ahk4_add_underscore_op_exp4_maybe_underscore_1p6ahk4 extends maybe_1p6ahk4{
    public add_op_0:add_op;
    public exp4_1:exp4;
    public maybe_1p6ahk4_2:maybe_1p6ahk4;
}
export class exp3 extends SalgolParseSymbol {};
export class exp3_exp4_maybe_underscore_1p6ahk4 extends exp3{
    public exp4_0:exp4;
    public maybe_1p6ahk4_1:maybe_1p6ahk4;
}
export class maybe_hufv7o extends SalgolParseSymbol {};
export class maybe_hufv7o_empty extends maybe_hufv7o{
}
export class maybe_hufv7o_mult_underscore_op_exp5_maybe_underscore_hufv7o extends maybe_hufv7o{
    public mult_op_0:mult_op;
    public exp5_1:exp5;
    public maybe_hufv7o_2:maybe_hufv7o;
}
export class exp4 extends SalgolParseSymbol {};
export class exp4_exp5_maybe_underscore_hufv7o extends exp4{
    public exp5_0:exp5;
    public maybe_hufv7o_1:maybe_hufv7o;
}
export class maybe_ihpz75 extends SalgolParseSymbol {};
export class maybe_ihpz75_empty extends maybe_ihpz75{
}
export class maybe_ihpz75_add_underscore_op extends maybe_ihpz75{
    public add_op_0:add_op;
}
export class exp5 extends SalgolParseSymbol {};
export class exp5_maybe_underscore_ihpz75_exp6 extends exp5{
    public maybe_ihpz75_0:maybe_ihpz75;
    public exp6_1:exp6;
}
export class exp6 extends SalgolParseSymbol {};
export class exp6_standard_underscore_exp extends exp6{
    public standard_exp_0:standard_exp;
}
export class exp6_literal extends exp6{
    public literal_0:literal;
}
export class exp6_value_underscore_constructor extends exp6{
    public value_constructor_0:value_constructor;
}
export class exp6_open_parenthesis_clause_close_parenthesis extends exp6{
    public open_parenthesis_0: SalgolTerminalClass;
    public clause_1:clause;
    public close_parenthesis_2: SalgolTerminalClass;
}
export class exp6_begin_maybe_underscore_1ute4jz_end extends exp6{
    public begin_0: SalgolTerminalClass;
    public maybe_1ute4jz_1:maybe_1ute4jz;
    public end_2: SalgolTerminalClass;
}
export class exp6_opening_brace_maybe_underscore_1ute4jz_closing_brace extends exp6{
    public opening_brace_0: SalgolTerminalClass;
    public maybe_1ute4jz_1:maybe_1ute4jz;
    public closing_brace_2: SalgolTerminalClass;
}
export class exp6_application extends exp6{
    public application_0:application;
}
export class exp6_bounds_underscore_op_open_parenthesis_clause_close_parenthesis extends exp6{
    public bounds_op_0:bounds_op;
    public open_parenthesis_1: SalgolTerminalClass;
    public clause_2:clause;
    public close_parenthesis_3: SalgolTerminalClass;
}
export class maybe_1ute4jz extends SalgolParseSymbol {};
export class maybe_1ute4jz_empty extends maybe_1ute4jz{
}
export class maybe_1ute4jz_sequence extends maybe_1ute4jz{
    public sequence_0:sequence;
}
export class dereference extends SalgolParseSymbol {};
export class dereference_clause_underscore_list extends dereference{
    public clause_list_0:clause_list;
}
export class maybe_bk760w extends SalgolParseSymbol {};
export class maybe_bk760w_empty extends maybe_bk760w{
}
export class maybe_bk760w_clause_underscore_list extends maybe_bk760w{
    public clause_list_0:clause_list;
}
export class maybe_1cr5dkj extends SalgolParseSymbol {};
export class maybe_1cr5dkj_empty extends maybe_1cr5dkj{
}
export class maybe_1cr5dkj_open_parenthesis_maybe_underscore_bk760w_close_parenthesis extends maybe_1cr5dkj{
    public open_parenthesis_0: SalgolTerminalClass;
    public maybe_bk760w_1:maybe_bk760w;
    public close_parenthesis_2: SalgolTerminalClass;
}
export class application extends SalgolParseSymbol {};
export class application_identifier_maybe_underscore_1cr5dkj extends application{
    public identifier_0:identifier;
    public maybe_1cr5dkj_1:maybe_1cr5dkj;
}
export class name extends SalgolParseSymbol {};
export class name_identifier extends name{
    public identifier_0:identifier;
}
export class bounds_op extends SalgolParseSymbol {};
export class bounds_op_upb extends bounds_op{
    public upb_0: SalgolTerminalClass;
}
export class bounds_op_lwb extends bounds_op{
    public lwb_0: SalgolTerminalClass;
}
export class value_constructor extends SalgolParseSymbol {};
export class value_constructor_vector_underscore_constr extends value_constructor{
    public vector_constr_0:vector_constr;
}
export class value_constructor_image_underscore_constr extends value_constructor{
    public image_constr_0:image_constr;
}
export class value_constructor_subimage_underscore_constr extends value_constructor{
    public subimage_constr_0:subimage_constr;
}
export class value_constructor_picture_underscore_constr extends value_constructor{
    public picture_constr_0:picture_constr;
}
export class vector_constr extends SalgolParseSymbol {};
export class vector_constr_vector_range_of_clause extends vector_constr{
    public vector_0: SalgolTerminalClass;
    public range_1:range;
    public of_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class vector_constr_at_symbol_clause_of_type1_lsb_clause_maybe_underscore_pw0ykd_rsb extends vector_constr{
    public at_symbol_0: SalgolTerminalClass;
    public clause_1:clause;
    public of_2: SalgolTerminalClass;
    public type1_3:type1;
    public lsb_4:lsb;
    public clause_5:clause;
    public maybe_pw0ykd_6:maybe_pw0ykd;
    public rsb_7:rsb;
}
export class maybe_pw0ykd extends SalgolParseSymbol {};
export class maybe_pw0ykd_empty extends maybe_pw0ykd{
}
export class maybe_pw0ykd_comma_clause_maybe_underscore_pw0ykd extends maybe_pw0ykd{
    public comma_0: SalgolTerminalClass;
    public clause_1:clause;
    public maybe_pw0ykd_2:maybe_pw0ykd;
}
export class maybe_th40dr extends SalgolParseSymbol {};
export class maybe_th40dr_empty extends maybe_th40dr{
}
export class maybe_th40dr_comma_range extends maybe_th40dr{
    public comma_0: SalgolTerminalClass;
    public range_1:range;
}
export class range extends SalgolParseSymbol {};
export class range_clause_colon_colon_clause_maybe_underscore_th40dr extends range{
    public clause_0:clause;
    public colon_colon_1: SalgolTerminalClass;
    public clause_2:clause;
    public maybe_th40dr_3:maybe_th40dr;
}
export class image_constr extends SalgolParseSymbol {};
export class image_constr_image_clause_by_clause_of_clause extends image_constr{
    public image_0: SalgolTerminalClass;
    public clause_1:clause;
    public by_2: SalgolTerminalClass;
    public clause_3:clause;
    public of_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class maybe_rzy1r0 extends SalgolParseSymbol {};
export class maybe_rzy1r0_empty extends maybe_rzy1r0{
}
export class maybe_rzy1r0_to_clause_by_clause extends maybe_rzy1r0{
    public to_0: SalgolTerminalClass;
    public clause_1:clause;
    public by_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class maybe_12c0adh extends SalgolParseSymbol {};
export class maybe_12c0adh_empty extends maybe_12c0adh{
}
export class maybe_12c0adh_at_clause_comma_clause extends maybe_12c0adh{
    public at_0: SalgolTerminalClass;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class subimage_constr extends SalgolParseSymbol {};
export class subimage_constr_limit_clause_maybe_underscore_rzy1r0_maybe_underscore_12c0adh extends subimage_constr{
    public limit_0: SalgolTerminalClass;
    public clause_1:clause;
    public maybe_rzy1r0_2:maybe_rzy1r0;
    public maybe_12c0adh_3:maybe_12c0adh;
}
export class picture_constr extends SalgolParseSymbol {};
export class picture_constr_shift_clause_by_clause_comma_clause extends picture_constr{
    public shift_0: SalgolTerminalClass;
    public clause_1:clause;
    public by_2: SalgolTerminalClass;
    public clause_3:clause;
    public comma_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class picture_constr_scale_clause_by_clause_comma_clause extends picture_constr{
    public scale_0: SalgolTerminalClass;
    public clause_1:clause;
    public by_2: SalgolTerminalClass;
    public clause_3:clause;
    public comma_4: SalgolTerminalClass;
    public clause_5:clause;
}
export class picture_constr_rotate_clause_by_clause extends picture_constr{
    public rotate_0: SalgolTerminalClass;
    public clause_1:clause;
    public by_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class picture_constr_colour_clause_in_clause extends picture_constr{
    public colour_0: SalgolTerminalClass;
    public clause_1:clause;
    public in_2: SalgolTerminalClass;
    public clause_3:clause;
}
export class picture_constr_text_clause_from_clause_comma_clause_to_clause_comma_clause extends picture_constr{
    public text_0: SalgolTerminalClass;
    public clause_1:clause;
    public from_2: SalgolTerminalClass;
    public clause_3:clause;
    public comma_4: SalgolTerminalClass;
    public clause_5:clause;
    public to_6: SalgolTerminalClass;
    public clause_7:clause;
    public comma_8: SalgolTerminalClass;
    public clause_9:clause;
}
export class picture_constr_lsb_clause_comma_clause_rsb extends picture_constr{
    public lsb_0:lsb;
    public clause_1:clause;
    public comma_2: SalgolTerminalClass;
    public clause_3:clause;
    public rsb_4:rsb;
}
export class literal extends SalgolParseSymbol {};
export class literal_real_underscore_literal extends literal{
    public real_literal_0:real_literal;
}
export class literal_boolean_underscore_literal extends literal{
    public boolean_literal_0:boolean_literal;
}
export class literal_string_underscore_literal extends literal{
    public string_literal_0:string_literal;
}
export class literal_pixel_underscore_literal extends literal{
    public pixel_literal_0:pixel_literal;
}
export class literal_pntr_underscore_literal extends literal{
    public pntr_literal_0:pntr_literal;
}
export class literal_file_underscore_literal extends literal{
    public file_literal_0:file_literal;
}
export class maybe_ei32sn extends SalgolParseSymbol {};
export class maybe_ei32sn_empty extends maybe_ei32sn{
}
export class maybe_ei32sn_digit_maybe_underscore_ei32sn extends maybe_ei32sn{
    public digit_0:digit;
    public maybe_ei32sn_1:maybe_ei32sn;
}
export class int_literal extends SalgolParseSymbol {};
export class int_literal_digit_maybe_underscore_ei32sn extends int_literal{
    public digit_0:digit;
    public maybe_ei32sn_1:maybe_ei32sn;
}
export class maybe_1jhzvth extends SalgolParseSymbol {};
export class maybe_1jhzvth_empty extends maybe_1jhzvth{
}
export class maybe_1jhzvth_period_int_underscore_literal extends maybe_1jhzvth{
    public period_0: SalgolTerminalClass;
    public int_literal_1:int_literal;
}
export class maybe_rxdl06 extends SalgolParseSymbol {};
export class maybe_rxdl06_empty extends maybe_rxdl06{
}
export class maybe_rxdl06_e_maybe_underscore_ihpz75_int_underscore_literal extends maybe_rxdl06{
    public e_0: SalgolTerminalClass;
    public maybe_ihpz75_1:maybe_ihpz75;
    public int_literal_2:int_literal;
}
export class real_literal extends SalgolParseSymbol {};
export class real_literal_maybe_underscore_ihpz75_int_underscore_literal_maybe_underscore_1jhzvth_maybe_underscore_rxdl06 extends real_literal{
    public maybe_ihpz75_0:maybe_ihpz75;
    public int_literal_1:int_literal;
    public maybe_1jhzvth_2:maybe_1jhzvth;
    public maybe_rxdl06_3:maybe_rxdl06;
}
export class boolean_literal extends SalgolParseSymbol {};
export class boolean_literal_true_val extends boolean_literal{
    public true_val_0: SalgolTerminalClass;
}
export class boolean_literal_false_val extends boolean_literal{
    public false_val_0: SalgolTerminalClass;
}
export class maybe_1nfudoo extends SalgolParseSymbol {};
export class maybe_1nfudoo_empty extends maybe_1nfudoo{
}
export class maybe_1nfudoo_char_maybe_underscore_1nfudoo extends maybe_1nfudoo{
    public char_0:char;
    public maybe_1nfudoo_1:maybe_1nfudoo;
}
export class string_literal extends SalgolParseSymbol {};
export class string_literal_double_underscore_quote_maybe_underscore_1nfudoo_double_underscore_quote extends string_literal{
    public double_quote_0:double_quote;
    public maybe_1nfudoo_1:maybe_1nfudoo;
    public double_quote_2:double_quote;
}
export class char extends SalgolParseSymbol {};
export class char_exclamation_mark extends char{
    public exclamation_mark_0: SalgolTerminalClass;
}
export class char_number extends char{
    public number_0: SalgolTerminalClass;
}
export class char_dollar extends char{
    public dollar_0: SalgolTerminalClass;
}
export class char_percent extends char{
    public percent_0: SalgolTerminalClass;
}
export class char_ampersand extends char{
    public ampersand_0: SalgolTerminalClass;
}
export class char_open_parenthesis extends char{
    public open_parenthesis_0: SalgolTerminalClass;
}
export class char_close_parenthesis extends char{
    public close_parenthesis_0: SalgolTerminalClass;
}
export class char_asterisk extends char{
    public asterisk_0: SalgolTerminalClass;
}
export class char_plus extends char{
    public plus_0: SalgolTerminalClass;
}
export class char_comma extends char{
    public comma_0: SalgolTerminalClass;
}
export class char_hyphen extends char{
    public hyphen_0: SalgolTerminalClass;
}
export class char_period extends char{
    public period_0: SalgolTerminalClass;
}
export class char_forward_slash extends char{
    public forward_slash_0: SalgolTerminalClass;
}
export class char_zero extends char{
    public zero_0: SalgolTerminalClass;
}
export class char_one extends char{
    public one_0: SalgolTerminalClass;
}
export class char_two extends char{
    public two_0: SalgolTerminalClass;
}
export class char_three extends char{
    public three_0: SalgolTerminalClass;
}
export class char_four extends char{
    public four_0: SalgolTerminalClass;
}
export class char_five extends char{
    public five_0: SalgolTerminalClass;
}
export class char_six extends char{
    public six_0: SalgolTerminalClass;
}
export class char_seven extends char{
    public seven_0: SalgolTerminalClass;
}
export class char_eight extends char{
    public eight_0: SalgolTerminalClass;
}
export class char_nine extends char{
    public nine_0: SalgolTerminalClass;
}
export class char_colon extends char{
    public colon_0: SalgolTerminalClass;
}
export class char_semi_colon extends char{
    public semi_colon_0: SalgolTerminalClass;
}
export class char_less_than extends char{
    public less_than_0: SalgolTerminalClass;
}
export class char_equals extends char{
    public equals_0: SalgolTerminalClass;
}
export class char_greater_than extends char{
    public greater_than_0: SalgolTerminalClass;
}
export class char_question_mark extends char{
    public question_mark_0: SalgolTerminalClass;
}
export class char_at_symbol extends char{
    public at_symbol_0: SalgolTerminalClass;
}
export class char_a extends char{
    public a_0: SalgolTerminalClass;
}
export class char_b extends char{
    public b_0: SalgolTerminalClass;
}
export class char_c extends char{
    public c_0: SalgolTerminalClass;
}
export class char_d extends char{
    public d_0: SalgolTerminalClass;
}
export class char_e extends char{
    public e_0: SalgolTerminalClass;
}
export class char_f extends char{
    public f_0: SalgolTerminalClass;
}
export class char_g extends char{
    public g_0: SalgolTerminalClass;
}
export class char_h extends char{
    public h_0: SalgolTerminalClass;
}
export class char_i extends char{
    public i_0: SalgolTerminalClass;
}
export class char_j extends char{
    public j_0: SalgolTerminalClass;
}
export class char_k extends char{
    public k_0: SalgolTerminalClass;
}
export class char_l extends char{
    public l_0: SalgolTerminalClass;
}
export class char_m extends char{
    public m_0: SalgolTerminalClass;
}
export class char_n extends char{
    public n_0: SalgolTerminalClass;
}
export class char_o extends char{
    public o_0: SalgolTerminalClass;
}
export class char_p extends char{
    public p_0: SalgolTerminalClass;
}
export class char_q extends char{
    public q_0: SalgolTerminalClass;
}
export class char_r extends char{
    public r_0: SalgolTerminalClass;
}
export class char_s extends char{
    public s_0: SalgolTerminalClass;
}
export class char_t extends char{
    public t_0: SalgolTerminalClass;
}
export class char_u extends char{
    public u_0: SalgolTerminalClass;
}
export class char_v extends char{
    public v_0: SalgolTerminalClass;
}
export class char_w extends char{
    public w_0: SalgolTerminalClass;
}
export class char_x extends char{
    public x_0: SalgolTerminalClass;
}
export class char_y extends char{
    public y_0: SalgolTerminalClass;
}
export class char_z extends char{
    public z_0: SalgolTerminalClass;
}
export class char_opening_bracket extends char{
    public opening_bracket_0: SalgolTerminalClass;
}
export class char_backslash extends char{
    public backslash_0: SalgolTerminalClass;
}
export class char_closing_bracket extends char{
    public closing_bracket_0: SalgolTerminalClass;
}
export class char_caret extends char{
    public caret_0: SalgolTerminalClass;
}
export class char_underscore extends char{
    public underscore_0: SalgolTerminalClass;
}
export class char_grave_accent extends char{
    public grave_accent_0: SalgolTerminalClass;
}
export class char_a extends char{
    public a_0: SalgolTerminalClass;
}
export class char_b extends char{
    public b_0: SalgolTerminalClass;
}
export class char_c extends char{
    public c_0: SalgolTerminalClass;
}
export class char_d extends char{
    public d_0: SalgolTerminalClass;
}
export class char_e extends char{
    public e_0: SalgolTerminalClass;
}
export class char_f extends char{
    public f_0: SalgolTerminalClass;
}
export class char_g extends char{
    public g_0: SalgolTerminalClass;
}
export class char_h extends char{
    public h_0: SalgolTerminalClass;
}
export class char_i extends char{
    public i_0: SalgolTerminalClass;
}
export class char_j extends char{
    public j_0: SalgolTerminalClass;
}
export class char_k extends char{
    public k_0: SalgolTerminalClass;
}
export class char_l extends char{
    public l_0: SalgolTerminalClass;
}
export class char_m extends char{
    public m_0: SalgolTerminalClass;
}
export class char_n extends char{
    public n_0: SalgolTerminalClass;
}
export class char_o extends char{
    public o_0: SalgolTerminalClass;
}
export class char_p extends char{
    public p_0: SalgolTerminalClass;
}
export class char_q extends char{
    public q_0: SalgolTerminalClass;
}
export class char_r extends char{
    public r_0: SalgolTerminalClass;
}
export class char_s extends char{
    public s_0: SalgolTerminalClass;
}
export class char_t extends char{
    public t_0: SalgolTerminalClass;
}
export class char_u extends char{
    public u_0: SalgolTerminalClass;
}
export class char_v extends char{
    public v_0: SalgolTerminalClass;
}
export class char_w extends char{
    public w_0: SalgolTerminalClass;
}
export class char_x extends char{
    public x_0: SalgolTerminalClass;
}
export class char_y extends char{
    public y_0: SalgolTerminalClass;
}
export class char_z extends char{
    public z_0: SalgolTerminalClass;
}
export class char_opening_brace extends char{
    public opening_brace_0: SalgolTerminalClass;
}
export class char_vertical_bar extends char{
    public vertical_bar_0: SalgolTerminalClass;
}
export class char_closing_brace extends char{
    public closing_brace_0: SalgolTerminalClass;
}
export class char_tilde extends char{
    public tilde_0: SalgolTerminalClass;
}
export class char_special_underscore_character extends char{
    public special_character_0:special_character;
}
export class special_character extends SalgolParseSymbol {};
export class special_character_single_underscore_quote_special_underscore_follow extends special_character{
    public single_quote_0:single_quote;
    public special_follow_1:special_follow;
}
export class special_follow extends SalgolParseSymbol {};
export class special_follow_n extends special_follow{
    public n_0: SalgolTerminalClass;
}
export class special_follow_p extends special_follow{
    public p_0: SalgolTerminalClass;
}
export class special_follow_o extends special_follow{
    public o_0: SalgolTerminalClass;
}
export class special_follow_t extends special_follow{
    public t_0: SalgolTerminalClass;
}
export class special_follow_b extends special_follow{
    public b_0: SalgolTerminalClass;
}
export class special_follow_single_underscore_quote extends special_follow{
    public single_quote_0:single_quote;
}
export class special_follow_double_underscore_quote extends special_follow{
    public double_quote_0:double_quote;
}
export class maybe_1566mcm extends SalgolParseSymbol {};
export class maybe_1566mcm_empty extends maybe_1566mcm{
}
export class maybe_1566mcm_ampersand_pixel_underscore_literal extends maybe_1566mcm{
    public ampersand_0: SalgolTerminalClass;
    public pixel_literal_1:pixel_literal;
}
export class pixel_literal extends SalgolParseSymbol {};
export class pixel_literal_on_maybe_underscore_1566mcm extends pixel_literal{
    public on_0: SalgolTerminalClass;
    public maybe_1566mcm_1:maybe_1566mcm;
}
export class pixel_literal_off_maybe_underscore_1566mcm extends pixel_literal{
    public off_0: SalgolTerminalClass;
    public maybe_1566mcm_1:maybe_1566mcm;
}
export class pntr_literal extends SalgolParseSymbol {};
export class pntr_literal_nil extends pntr_literal{
    public nil_0: SalgolTerminalClass;
}
export class file_literal extends SalgolParseSymbol {};
export class file_literal_nullfile extends file_literal{
    public nullfile_0: SalgolTerminalClass;
}
export class lab extends SalgolParseSymbol {};
export class lab_less_than extends lab{
    public less_than_0: SalgolTerminalClass;
}
export class rab extends SalgolParseSymbol {};
export class rab_greater_than extends rab{
    public greater_than_0: SalgolTerminalClass;
}
export class lsb extends SalgolParseSymbol {};
export class lsb_opening_bracket extends lsb{
    public opening_bracket_0: SalgolTerminalClass;
}
export class rsb extends SalgolParseSymbol {};
export class rsb_closing_bracket extends rsb{
    public closing_bracket_0: SalgolTerminalClass;
}
export class star extends SalgolParseSymbol {};
export class star_asterisk extends star{
    public asterisk_0: SalgolTerminalClass;
}
export class bar extends SalgolParseSymbol {};
export class bar_vertical_bar extends bar{
    public vertical_bar_0: SalgolTerminalClass;
}
export class add_op extends SalgolParseSymbol {};
export class add_op_plus extends add_op{
    public plus_0: SalgolTerminalClass;
}
export class add_op_hyphen extends add_op{
    public hyphen_0: SalgolTerminalClass;
}
export class mult_op extends SalgolParseSymbol {};
export class mult_op_int_underscore_mult_underscore_op extends mult_op{
    public int_mult_op_0:int_mult_op;
}
export class mult_op_real_underscore_mult_underscore_op extends mult_op{
    public real_mult_op_0:real_mult_op;
}
export class mult_op_plus_plus extends mult_op{
    public plus_plus_0: SalgolTerminalClass;
}
export class mult_op_pic_underscore_op extends mult_op{
    public pic_op_0:pic_op;
}
export class mult_op_pixel_underscore_op extends mult_op{
    public pixel_op_0:pixel_op;
}
export class int_mult_op extends SalgolParseSymbol {};
export class int_mult_op_star extends int_mult_op{
    public star_0:star;
}
export class int_mult_op_div extends int_mult_op{
    public div_0: SalgolTerminalClass;
}
export class int_mult_op_rem extends int_mult_op{
    public rem_0: SalgolTerminalClass;
}
export class real_mult_op extends SalgolParseSymbol {};
export class real_mult_op_star extends real_mult_op{
    public star_0:star;
}
export class real_mult_op_forward_slash extends real_mult_op{
    public forward_slash_0: SalgolTerminalClass;
}
export class pic_op extends SalgolParseSymbol {};
export class pic_op_caret extends pic_op{
    public caret_0: SalgolTerminalClass;
}
export class pic_op_ampersand extends pic_op{
    public ampersand_0: SalgolTerminalClass;
}
export class pixel_op extends SalgolParseSymbol {};
export class pixel_op_ampersand extends pixel_op{
    public ampersand_0: SalgolTerminalClass;
}
export class rel_op extends SalgolParseSymbol {};
export class rel_op_eq_underscore_op extends rel_op{
    public eq_op_0:eq_op;
}
export class rel_op_compar_underscore_op extends rel_op{
    public compar_op_0:compar_op;
}
export class rel_op_type_underscore_op extends rel_op{
    public type_op_0:type_op;
}
export class eq_op extends SalgolParseSymbol {};
export class eq_op_equals extends eq_op{
    public equals_0: SalgolTerminalClass;
}
export class eq_op_exclamation_mark_equals extends eq_op{
    public exclamation_mark_equals_0: SalgolTerminalClass;
}
export class compar_op extends SalgolParseSymbol {};
export class compar_op_less_than extends compar_op{
    public less_than_0: SalgolTerminalClass;
}
export class compar_op_less_than_equals extends compar_op{
    public less_than_equals_0: SalgolTerminalClass;
}
export class compar_op_greater_than extends compar_op{
    public greater_than_0: SalgolTerminalClass;
}
export class compar_op_greater_than_equals extends compar_op{
    public greater_than_equals_0: SalgolTerminalClass;
}
export class type_op extends SalgolParseSymbol {};
export class type_op_is extends type_op{
    public is_0: SalgolTerminalClass;
}
export class type_op_isnt extends type_op{
    public isnt_0: SalgolTerminalClass;
}
export class arrow extends SalgolParseSymbol {};
export class arrow_hyphen_greater_than extends arrow{
    public hyphen_0: SalgolTerminalClass;
    public greater_than_1: SalgolTerminalClass;
}
export class double_quote extends SalgolParseSymbol {};
export class double_quote_double_quote_mark extends double_quote{
    public double_quote_mark_0: SalgolTerminalClass;
}
export class single_quote extends SalgolParseSymbol {};
export class single_quote_single_quote_mark extends single_quote{
    public single_quote_mark_0: SalgolTerminalClass;
}
export class identifier extends SalgolParseSymbol {};
export class identifier_id extends identifier{
    public id_0:id;
}
export class identifier_standard_underscore_id extends identifier{
    public standard_id_0:standard_id;
}
export class maybe_1iw9v8z extends SalgolParseSymbol {};
export class maybe_1iw9v8z_empty extends maybe_1iw9v8z{
}
export class maybe_1iw9v8z_id_underscore_follow extends maybe_1iw9v8z{
    public id_follow_0:id_follow;
}
export class id extends SalgolParseSymbol {};
export class id_letter_maybe_underscore_1iw9v8z extends id{
    public letter_0:letter;
    public maybe_1iw9v8z_1:maybe_1iw9v8z;
}
export class id_follow extends SalgolParseSymbol {};
export class id_follow_letter_maybe_underscore_1iw9v8z extends id_follow{
    public letter_0:letter;
    public maybe_1iw9v8z_1:maybe_1iw9v8z;
}
export class id_follow_digit_maybe_underscore_1iw9v8z extends id_follow{
    public digit_0:digit;
    public maybe_1iw9v8z_1:maybe_1iw9v8z;
}
export class id_follow_period_maybe_underscore_1iw9v8z extends id_follow{
    public period_0: SalgolTerminalClass;
    public maybe_1iw9v8z_1:maybe_1iw9v8z;
}
export class letter extends SalgolParseSymbol {};
export class letter_a extends letter{
    public a_0: SalgolTerminalClass;
}
export class letter_b extends letter{
    public b_0: SalgolTerminalClass;
}
export class letter_c extends letter{
    public c_0: SalgolTerminalClass;
}
export class letter_d extends letter{
    public d_0: SalgolTerminalClass;
}
export class letter_e extends letter{
    public e_0: SalgolTerminalClass;
}
export class letter_f extends letter{
    public f_0: SalgolTerminalClass;
}
export class letter_g extends letter{
    public g_0: SalgolTerminalClass;
}
export class letter_h extends letter{
    public h_0: SalgolTerminalClass;
}
export class letter_i extends letter{
    public i_0: SalgolTerminalClass;
}
export class letter_j extends letter{
    public j_0: SalgolTerminalClass;
}
export class letter_k extends letter{
    public k_0: SalgolTerminalClass;
}
export class letter_l extends letter{
    public l_0: SalgolTerminalClass;
}
export class letter_m extends letter{
    public m_0: SalgolTerminalClass;
}
export class letter_n extends letter{
    public n_0: SalgolTerminalClass;
}
export class letter_o extends letter{
    public o_0: SalgolTerminalClass;
}
export class letter_p extends letter{
    public p_0: SalgolTerminalClass;
}
export class letter_q extends letter{
    public q_0: SalgolTerminalClass;
}
export class letter_r extends letter{
    public r_0: SalgolTerminalClass;
}
export class letter_s extends letter{
    public s_0: SalgolTerminalClass;
}
export class letter_t extends letter{
    public t_0: SalgolTerminalClass;
}
export class letter_u extends letter{
    public u_0: SalgolTerminalClass;
}
export class letter_v extends letter{
    public v_0: SalgolTerminalClass;
}
export class letter_w extends letter{
    public w_0: SalgolTerminalClass;
}
export class letter_x extends letter{
    public x_0: SalgolTerminalClass;
}
export class letter_y extends letter{
    public y_0: SalgolTerminalClass;
}
export class letter_z extends letter{
    public z_0: SalgolTerminalClass;
}
export class letter_a extends letter{
    public a_0: SalgolTerminalClass;
}
export class letter_b extends letter{
    public b_0: SalgolTerminalClass;
}
export class letter_c extends letter{
    public c_0: SalgolTerminalClass;
}
export class letter_d extends letter{
    public d_0: SalgolTerminalClass;
}
export class letter_e extends letter{
    public e_0: SalgolTerminalClass;
}
export class letter_f extends letter{
    public f_0: SalgolTerminalClass;
}
export class letter_g extends letter{
    public g_0: SalgolTerminalClass;
}
export class letter_h extends letter{
    public h_0: SalgolTerminalClass;
}
export class letter_i extends letter{
    public i_0: SalgolTerminalClass;
}
export class letter_j extends letter{
    public j_0: SalgolTerminalClass;
}
export class letter_k extends letter{
    public k_0: SalgolTerminalClass;
}
export class letter_l extends letter{
    public l_0: SalgolTerminalClass;
}
export class letter_m extends letter{
    public m_0: SalgolTerminalClass;
}
export class letter_n extends letter{
    public n_0: SalgolTerminalClass;
}
export class letter_o extends letter{
    public o_0: SalgolTerminalClass;
}
export class letter_p extends letter{
    public p_0: SalgolTerminalClass;
}
export class letter_q extends letter{
    public q_0: SalgolTerminalClass;
}
export class letter_r extends letter{
    public r_0: SalgolTerminalClass;
}
export class letter_s extends letter{
    public s_0: SalgolTerminalClass;
}
export class letter_t extends letter{
    public t_0: SalgolTerminalClass;
}
export class letter_u extends letter{
    public u_0: SalgolTerminalClass;
}
export class letter_v extends letter{
    public v_0: SalgolTerminalClass;
}
export class letter_w extends letter{
    public w_0: SalgolTerminalClass;
}
export class letter_x extends letter{
    public x_0: SalgolTerminalClass;
}
export class letter_y extends letter{
    public y_0: SalgolTerminalClass;
}
export class letter_z extends letter{
    public z_0: SalgolTerminalClass;
}
export class digit extends SalgolParseSymbol {};
export class digit_zero extends digit{
    public zero_0: SalgolTerminalClass;
}
export class digit_one extends digit{
    public one_0: SalgolTerminalClass;
}
export class digit_two extends digit{
    public two_0: SalgolTerminalClass;
}
export class digit_three extends digit{
    public three_0: SalgolTerminalClass;
}
export class digit_four extends digit{
    public four_0: SalgolTerminalClass;
}
export class digit_five extends digit{
    public five_0: SalgolTerminalClass;
}
export class digit_six extends digit{
    public six_0: SalgolTerminalClass;
}
export class digit_seven extends digit{
    public seven_0: SalgolTerminalClass;
}
export class digit_eight extends digit{
    public eight_0: SalgolTerminalClass;
}
export class digit_nine extends digit{
    public nine_0: SalgolTerminalClass;
}
export class maybe_1bo5n98 extends SalgolParseSymbol {};
export class maybe_1bo5n98_empty extends maybe_1bo5n98{
}
export class maybe_1bo5n98_open_parenthesis_clause_close_parenthesis extends maybe_1bo5n98{
    public open_parenthesis_0: SalgolTerminalClass;
    public clause_1:clause;
    public close_parenthesis_2: SalgolTerminalClass;
}
export class standard_exp extends SalgolParseSymbol {};
export class standard_exp_standard_underscore_name_maybe_underscore_1bo5n98 extends standard_exp{
    public standard_name_0:standard_name;
    public maybe_1bo5n98_1:maybe_1bo5n98;
}
export class standard_name extends SalgolParseSymbol {};
export class standard_name_upb extends standard_name{
    public upb_0: SalgolTerminalClass;
}
export class standard_name_lwb extends standard_name{
    public lwb_0: SalgolTerminalClass;
}
export class standard_name_eof extends standard_name{
    public eof_0: SalgolTerminalClass;
}
export class standard_name_read_period_a_period_line extends standard_name{
    public read_period_a_period_line_0: SalgolTerminalClass;
}
export class standard_name_read extends standard_name{
    public read_0: SalgolTerminalClass;
}
export class standard_name_readi extends standard_name{
    public readi_0: SalgolTerminalClass;
}
export class standard_name_readr extends standard_name{
    public readr_0: SalgolTerminalClass;
}
export class standard_name_readb extends standard_name{
    public readb_0: SalgolTerminalClass;
}
export class standard_name_peek extends standard_name{
    public peek_0: SalgolTerminalClass;
}
export class standard_name_reads extends standard_name{
    public reads_0: SalgolTerminalClass;
}
export class standard_name_read_period_name extends standard_name{
    public read_period_name_0: SalgolTerminalClass;
}
export class standard_name_read_period_byte extends standard_name{
    public read_period_byte_0: SalgolTerminalClass;
}
export class standard_name_read_period_16 extends standard_name{
    public read_period_one_six_0: SalgolTerminalClass;
}
export class standard_name_read_period_32 extends standard_name{
    public read_period_three_two_0: SalgolTerminalClass;
}
export class standard_id extends SalgolParseSymbol {};
export class standard_id_r_period_w extends standard_id{
    public r_period_w_0: SalgolTerminalClass;
}
export class standard_id_i_period_w extends standard_id{
    public i_period_w_0: SalgolTerminalClass;
}
export class standard_id_s_period_w extends standard_id{
    public s_period_w_0: SalgolTerminalClass;
}
export class standard_id_s_period_o extends standard_id{
    public s_period_o_0: SalgolTerminalClass;
}
export class standard_id_s_period_i extends standard_id{
    public s_period_i_0: SalgolTerminalClass;
}
export class standard_id_maxint extends standard_id{
    public maxint_0: SalgolTerminalClass;
}
export class standard_id_maxreal extends standard_id{
    public maxreal_0: SalgolTerminalClass;
}
export class standard_id_epsilon extends standard_id{
    public epsilon_0: SalgolTerminalClass;
}
export class standard_id_pi extends standard_id{
    public pi_0: SalgolTerminalClass;
}
export class standard_id_cursor extends standard_id{
    public cursor_0: SalgolTerminalClass;
}
export class standard_id_screen extends standard_id{
    public screen_0: SalgolTerminalClass;
}
