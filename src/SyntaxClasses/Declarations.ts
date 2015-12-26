//<declaration>
//
//	let<identifier><init_op><clause>
//	structure<identifier>[([<field_list>])]
//	procedure<identifier>[([<parameter_list>] [<arrow><type_id>])] ; <clause>
//	forward<identifier><proc_type>
//

export class Declaration {}

export class LetDeclaration extends Declaration {}
export class StructureDeclaration extends Declaration {}
export class ProcedureDeclaration extends Declaration {}
export class ForwardDeclaration extends Declaration {}

//<init_op>
//
//	=
//	:=

export enum InitOp { Equals, ColonEquals }

//
//<field_list>
//
//	<type1><identifier_list>[;<field_list>]
//

export FieldList {}

//
//<parameter_list>
//
//	<parameter>[;<parameter_list>]
//
//<parameter>
//
//	<type1><identifier_list>
//	<structure_decl>
//	<proc_type><identifier_list>
//
//<proc_type>
//
//	([<ptype_list>][<arrow><type_id>])
//
//<ptype_list>
//
//	<type1>[,<ptype_list>
//	<proc_type>[,<ptype_list>]
//	<s_decl>[,<ptype_list>]
//
//<s_decl>
//
//	structure(<type1>[,<type1>]*)
//
//<type1>
//
//	[c]<type_id>
//
//<type_id>
//
// 	int
// 	real
// 	bool
// 	string
// 	pixel
// 	pic
// 	pntr
// 	file
// 	<star><type1>
// 	#pixel
// 	#cpixel
//
//<identifier_list>
//
//	<identifier>[,<identifier_list>]