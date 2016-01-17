export class program{};
export class program0 extends program{
    public sequence0:sequence;
}
export class sequence{};
export class sequence0 extends sequence{
    public declaration0:declaration;
    public sequence1:sequence;
}
export class sequence1 extends sequence{
    public clause0:clause;
    public sequence1:sequence;
}
export class declaration{};
export class declaration0 extends declaration{
    public let_decl0:let_decl;
}
export class declaration1 extends declaration{
    public structure_decl0:structure_decl;
}
export class declaration2 extends declaration{
    public proc_decl0:proc_decl;
}
export class declaration3 extends declaration{
    public forward0:forward;
}
export class let_decl{};
export class let_decl0 extends let_decl{
    public identifier0:identifier;
    public init_op1:init_op;
    public clause2:clause;
}
export class init_op{};
export class init_op0 extends init_op{
}
export class init_op1 extends init_op{
}
export class structure_decl{};
export class structure_decl0 extends structure_decl{
    public identifier0:identifier;
    public field_list1:field_list;
}
export class field_list{};
export class field_list0 extends field_list{
    public type10:type1;
    public identifier_list1:identifier_list;
    public field_list2:field_list;
}
export class proc_decl{};
export class proc_decl0 extends proc_decl{
    public identifier0:identifier;
    public parameter_list1:parameter_list;
    public arrow2:arrow;
    public type_id3:type_id;
    public clause4:clause;
}
export class parameter_list{};
export class parameter_list0 extends parameter_list{
    public parameter0:parameter;
    public parameter_list1:parameter_list;
}
export class parameter{};
export class parameter0 extends parameter{
    public type10:type1;
    public identifier_list1:identifier_list;
}
export class parameter1 extends parameter{
    public structure_decl0:structure_decl;
}
export class parameter2 extends parameter{
    public proc_type0:proc_type;
    public identifier_list1:identifier_list;
}
export class proc_type{};
export class proc_type0 extends proc_type{
    public ptype_list0:ptype_list;
    public arrow1:arrow;
    public type_id2:type_id;
}
export class ptype_list{};
export class ptype_list0 extends ptype_list{
    public type10:type1;
    public ptype_list1:ptype_list;
}
export class ptype_list1 extends ptype_list{
    public proc_type0:proc_type;
    public ptype_list1:ptype_list;
}
export class ptype_list2 extends ptype_list{
    public s_decl0:s_decl;
    public ptype_list1:ptype_list;
}
export class s_decl{};
export class s_decl0 extends s_decl{
    public type10:type1;
    public type11:type1;
}
export class forward{};
export class forward0 extends forward{
    public identifier0:identifier;
    public proc_type1:proc_type;
}
export class type1{};
export class type10 extends type1{
    public type_id0:type_id;
}
export class type_id{};
export class type_id0 extends type_id{
}
export class type_id1 extends type_id{
}
export class type_id2 extends type_id{
}
export class type_id3 extends type_id{
}
export class type_id4 extends type_id{
}
export class type_id5 extends type_id{
}
export class type_id6 extends type_id{
}
export class type_id7 extends type_id{
}
export class type_id8 extends type_id{
    public star0:star;
    public type11:type1;
}
export class type_id9 extends type_id{
}
export class type_id10 extends type_id{
}
export class identifier_list{};
export class identifier_list0 extends identifier_list{
    public identifier0:identifier;
    public identifier_list1:identifier_list;
}
export class clause{};
export class clause0 extends clause{
    public clause0:clause;
    public clause1:clause;
}
export class clause1 extends clause{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class clause2 extends clause{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class clause3 extends clause{
    public clause0:clause;
    public clause1:clause;
}
export class clause4 extends clause{
    public identifier0:identifier;
    public clause1:clause;
    public clause2:clause;
    public clause3:clause;
    public clause4:clause;
}
export class clause5 extends clause{
    public clause0:clause;
    public case_list1:case_list;
    public clause2:clause;
}
export class clause6 extends clause{
    public name0:name;
    public clause1:clause;
}
export class clause7 extends clause{
    public write_clause0:write_clause;
}
export class clause8 extends clause{
    public raster0:raster;
}
export class clause9 extends clause{
}
export class clause10 extends clause{
    public expression0:expression;
}
export class case_list{};
export class case_list0 extends case_list{
    public clause_list0:clause_list;
    public clause1:clause;
    public case_list2:case_list;
}
export class write_clause{};
export class write_clause0 extends write_clause{
    public write_list0:write_list;
}
export class write_clause1 extends write_clause{
    public clause0:clause;
    public write_list1:write_list;
}
export class write_clause2 extends write_clause{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class write_clause3 extends write_clause{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class write_clause4 extends write_clause{
    public clause0:clause;
    public clause1:clause;
}
export class write_list{};
export class write_list0 extends write_list{
    public clause0:clause;
    public clause1:clause;
    public write_list2:write_list;
}
export class raster{};
export class raster0 extends raster{
    public raster_op0:raster_op;
    public clause1:clause;
    public clause2:clause;
}
export class raster_op{};
export class raster_op0 extends raster_op{
}
export class raster_op1 extends raster_op{
}
export class raster_op2 extends raster_op{
}
export class raster_op3 extends raster_op{
}
export class raster_op4 extends raster_op{
}
export class raster_op5 extends raster_op{
}
export class raster_op6 extends raster_op{
}
export class raster_op7 extends raster_op{
}
export class clause_list{};
export class clause_list0 extends clause_list{
    public clause0:clause;
    public clause_list1:clause_list;
}
export class expression{};
export class expression0 extends expression{
    public exp10:exp1;
    public exp11:exp1;
}
export class exp1{};
export class exp10 extends exp1{
    public exp20:exp2;
    public exp21:exp2;
}
export class exp2{};
export class exp20 extends exp2{
    public exp30:exp3;
    public rel_op1:rel_op;
    public exp32:exp3;
}
export class exp3{};
export class exp30 extends exp3{
    public exp40:exp4;
    public add_op1:add_op;
    public exp42:exp4;
}
export class exp4{};
export class exp40 extends exp4{
    public exp50:exp5;
    public mult_op1:mult_op;
    public exp52:exp5;
}
export class exp5{};
export class exp50 extends exp5{
    public add_op0:add_op;
    public exp61:exp6;
}
export class exp6{};
export class exp60 extends exp6{
    public standard_exp0:standard_exp;
}
export class exp61 extends exp6{
    public literal0:literal;
}
export class exp62 extends exp6{
    public value_constructor0:value_constructor;
}
export class exp63 extends exp6{
    public clause0:clause;
}
export class exp64 extends exp6{
    public sequence0:sequence;
}
export class exp65 extends exp6{
    public sequence0:sequence;
}
export class exp66 extends exp6{
    public expression0:expression;
    public clause1:clause;
    public bar2:bar;
    public clause3:clause;
}
export class exp67 extends exp6{
    public expression0:expression;
    public dereference1:dereference;
}
export class exp68 extends exp6{
    public application0:application;
}
export class exp69 extends exp6{
    public structure_creation0:structure_creation;
}
export class exp610 extends exp6{
    public name0:name;
}
export class exp611 extends exp6{
    public bounds_op0:bounds_op;
    public clause1:clause;
}
export class dereference{};
export class dereference0 extends dereference{
    public clause_list0:clause_list;
}
export class application{};
export class application0 extends application{
    public identifier0:identifier;
    public clause_list1:clause_list;
}
export class structure_creation{};
export class structure_creation0 extends structure_creation{
    public identifier0:identifier;
    public clause_list1:clause_list;
}
export class name{};
export class name0 extends name{
    public identifier0:identifier;
}
export class name1 extends name{
    public expression0:expression;
    public clause_list1:clause_list;
    public clause_list2:clause_list;
}
export class bounds_op{};
export class bounds_op0 extends bounds_op{
}
export class bounds_op1 extends bounds_op{
}
export class value_constructor{};
export class value_constructor0 extends value_constructor{
    public vector_constr0:vector_constr;
}
export class value_constructor1 extends value_constructor{
    public image_constr0:image_constr;
}
export class value_constructor2 extends value_constructor{
    public subimage_constr0:subimage_constr;
}
export class value_constructor3 extends value_constructor{
    public picture_constr0:picture_constr;
}
export class vector_constr{};
export class vector_constr0 extends vector_constr{
    public range0:range;
    public clause1:clause;
}
export class vector_constr1 extends vector_constr{
    public clause0:clause;
    public type11:type1;
    public lsb2:lsb;
    public clause3:clause;
    public clause4:clause;
    public rsb5:rsb;
}
export class range{};
export class range0 extends range{
    public clause0:clause;
    public clause1:clause;
    public range2:range;
}
export class image_constr{};
export class image_constr0 extends image_constr{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class subimage_constr{};
export class subimage_constr0 extends subimage_constr{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
    public clause3:clause;
    public clause4:clause;
}
export class picture_constr{};
export class picture_constr0 extends picture_constr{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class picture_constr1 extends picture_constr{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
}
export class picture_constr2 extends picture_constr{
    public clause0:clause;
    public clause1:clause;
}
export class picture_constr3 extends picture_constr{
    public clause0:clause;
    public clause1:clause;
}
export class picture_constr4 extends picture_constr{
    public clause0:clause;
    public clause1:clause;
    public clause2:clause;
    public clause3:clause;
    public clause4:clause;
}
export class picture_constr5 extends picture_constr{
    public lsb0:lsb;
    public clause1:clause;
    public clause2:clause;
    public rsb3:rsb;
}
export class literal{};
export class literal0 extends literal{
    public integer_literal0:integer_literal;
}
export class literal1 extends literal{
    public real_literal0:real_literal;
}
export class literal2 extends literal{
    public boolean_literal0:boolean_literal;
}
export class literal3 extends literal{
    public string_literal0:string_literal;
}
export class literal4 extends literal{
    public pixel_literal0:pixel_literal;
}
export class literal5 extends literal{
    public pntr_literal0:pntr_literal;
}
export class literal6 extends literal{
    public file_literal0:file_literal;
}
export class integer_literal{};
export class integer_literal0 extends integer_literal{
    public add_op0:add_op;
    public int_literal1:int_literal;
}
export class int_literal{};
export class int_literal0 extends int_literal{
    public digit0:digit;
    public digit1:digit;
}
export class real_literal{};
export class real_literal0 extends real_literal{
    public integer_literal0:integer_literal;
    public int_literal1:int_literal;
    public integer_literal2:integer_literal;
}
export class boolean_literal{};
export class boolean_literal0 extends boolean_literal{
}
export class boolean_literal1 extends boolean_literal{
}
export class string_literal{};
export class string_literal0 extends string_literal{
    public double_quote0:double_quote;
    public char1:char;
    public double_quote2:double_quote;
}
export class char{};
export class char0 extends char{
    public special_character0:special_character;
}
export class special_character{};
export class special_character0 extends special_character{
    public single_quote0:single_quote;
    public special_follow1:special_follow;
}
export class special_follow{};
export class special_follow0 extends special_follow{
}
export class special_follow1 extends special_follow{
}
export class special_follow2 extends special_follow{
}
export class special_follow3 extends special_follow{
}
export class special_follow4 extends special_follow{
}
export class special_follow5 extends special_follow{
    public single_quote0:single_quote;
}
export class special_follow6 extends special_follow{
    public double_quote0:double_quote;
}
export class pixel_literal{};
export class pixel_literal0 extends pixel_literal{
    public pixel_literal0:pixel_literal;
}
export class pixel_literal1 extends pixel_literal{
    public pixel_literal0:pixel_literal;
}
export class pntr_literal{};
export class pntr_literal0 extends pntr_literal{
}
export class file_literal{};
export class file_literal0 extends file_literal{
}
export class lab{};
export class lab0 extends lab{
}
export class rab{};
export class rab0 extends rab{
}
export class lsb{};
export class lsb0 extends lsb{
}
export class rsb{};
export class rsb0 extends rsb{
}
export class star{};
export class star0 extends star{
}
export class bar{};
export class bar0 extends bar{
}
export class add_op{};
export class add_op0 extends add_op{
}
export class add_op1 extends add_op{
}
export class mult_op{};
export class mult_op0 extends mult_op{
    public int_mult_op0:int_mult_op;
}
export class mult_op1 extends mult_op{
    public real_mult_op0:real_mult_op;
}
export class mult_op2 extends mult_op{
}
export class mult_op3 extends mult_op{
    public pic_op0:pic_op;
}
export class mult_op4 extends mult_op{
    public pixel_op0:pixel_op;
}
export class int_mult_op{};
export class int_mult_op0 extends int_mult_op{
    public star0:star;
}
export class int_mult_op1 extends int_mult_op{
}
export class int_mult_op2 extends int_mult_op{
}
export class real_mult_op{};
export class real_mult_op0 extends real_mult_op{
    public star0:star;
}
export class real_mult_op1 extends real_mult_op{
}
export class pic_op{};
export class pic_op0 extends pic_op{
}
export class pic_op1 extends pic_op{
}
export class pixel_op{};
export class pixel_op0 extends pixel_op{
}
export class rel_op{};
export class rel_op0 extends rel_op{
    public eq_op0:eq_op;
}
export class rel_op1 extends rel_op{
    public compar_op0:compar_op;
}
export class rel_op2 extends rel_op{
    public type_op0:type_op;
}
export class eq_op{};
export class eq_op0 extends eq_op{
}
export class eq_op1 extends eq_op{
}
export class compar_op{};
export class compar_op0 extends compar_op{
}
export class compar_op1 extends compar_op{
}
export class compar_op2 extends compar_op{
}
export class compar_op3 extends compar_op{
}
export class type_op{};
export class type_op0 extends type_op{
}
export class type_op1 extends type_op{
}
export class arrow{};
export class arrow0 extends arrow{
}
export class double_quote{};
export class double_quote0 extends double_quote{
}
export class single_quote{};
export class single_quote0 extends single_quote{
}
export class identifier{};
export class identifier0 extends identifier{
    public id0:id;
}
export class identifier1 extends identifier{
    public standard_id0:standard_id;
}
export class id{};
export class id0 extends id{
    public letter0:letter;
    public id_follow1:id_follow;
}
export class id_follow{};
export class id_follow0 extends id_follow{
    public letter0:letter;
    public id_follow1:id_follow;
}
export class id_follow1 extends id_follow{
    public digit0:digit;
    public id_follow1:id_follow;
}
export class id_follow2 extends id_follow{
    public id_follow0:id_follow;
}
export class letter{};
export class letter0 extends letter{
}
export class letter1 extends letter{
}
export class letter2 extends letter{
}
export class letter3 extends letter{
}
export class letter4 extends letter{
}
export class letter5 extends letter{
}
export class letter6 extends letter{
}
export class letter7 extends letter{
}
export class letter8 extends letter{
}
export class letter9 extends letter{
}
export class letter10 extends letter{
}
export class letter11 extends letter{
}
export class letter12 extends letter{
}
export class letter13 extends letter{
}
export class letter14 extends letter{
}
export class letter15 extends letter{
}
export class letter16 extends letter{
}
export class letter17 extends letter{
}
export class letter18 extends letter{
}
export class letter19 extends letter{
}
export class letter20 extends letter{
}
export class letter21 extends letter{
}
export class letter22 extends letter{
}
export class letter23 extends letter{
}
export class letter24 extends letter{
}
export class letter25 extends letter{
}
export class letter26 extends letter{
}
export class letter27 extends letter{
}
export class letter28 extends letter{
}
export class letter29 extends letter{
}
export class letter30 extends letter{
}
export class letter31 extends letter{
}
export class letter32 extends letter{
}
export class letter33 extends letter{
}
export class letter34 extends letter{
}
export class letter35 extends letter{
}
export class letter36 extends letter{
}
export class letter37 extends letter{
}
export class letter38 extends letter{
}
export class letter39 extends letter{
}
export class letter40 extends letter{
}
export class letter41 extends letter{
}
export class letter42 extends letter{
}
export class letter43 extends letter{
}
export class letter44 extends letter{
}
export class letter45 extends letter{
}
export class letter46 extends letter{
}
export class letter47 extends letter{
}
export class letter48 extends letter{
}
export class letter49 extends letter{
}
export class letter50 extends letter{
}
export class letter51 extends letter{
}
export class digit{};
export class digit0 extends digit{
}
export class digit1 extends digit{
}
export class digit2 extends digit{
}
export class digit3 extends digit{
}
export class digit4 extends digit{
}
export class digit5 extends digit{
}
export class digit6 extends digit{
}
export class digit7 extends digit{
}
export class digit8 extends digit{
}
export class digit9 extends digit{
}
export class standard_exp{};
export class standard_exp0 extends standard_exp{
    public standard_name0:standard_name;
    public clause1:clause;
}
export class standard_name{};
export class standard_name0 extends standard_name{
}
export class standard_name1 extends standard_name{
}
export class standard_name2 extends standard_name{
}
export class standard_name3 extends standard_name{
}
export class standard_name4 extends standard_name{
}
export class standard_name5 extends standard_name{
}
export class standard_name6 extends standard_name{
}
export class standard_name7 extends standard_name{
}
export class standard_name8 extends standard_name{
}
export class standard_name9 extends standard_name{
}
export class standard_name10 extends standard_name{
}
export class standard_name11 extends standard_name{
}
export class standard_name12 extends standard_name{
}
export class standard_name13 extends standard_name{
}
export class standard_id{};
export class standard_id0 extends standard_id{
}
export class standard_id1 extends standard_id{
}
export class standard_id2 extends standard_id{
}
export class standard_id3 extends standard_id{
}
export class standard_id4 extends standard_id{
}
export class standard_id5 extends standard_id{
}
export class standard_id6 extends standard_id{
}
export class standard_id7 extends standard_id{
}
export class standard_id8 extends standard_id{
}
export class standard_id9 extends standard_id{
}
export class standard_id10 extends standard_id{
}
