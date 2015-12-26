//<clause>
//
//	if<clause>do<clause>
//	if<clause>then<clause>else<clause>
//	repeat<clause>while<clause>[do<clause>]
//	while<clause>do<clause>
//	for<identifier>=<clause>to<clause>[by<clause>]do<clause>
//	case<clause>of<case_list>default :<clause>
//	<name>:=<clause>
//	<write_clause>
//	<raster>
//	abort
//	<expression>
//

export class Clause {}

export class IfDoClause extends Clause {}
export class IfThenClause extends Clause {}
export class RepeatWhileClause extends Clause {}
export class WhileDoClause extends Clause {}
export class ForClause extends Clause {}
export class CaseClause extends Clause {}
export class NameClause extends Clause {}
export class WriteClause extends Clause {}
export class RasterClause extends Clause {}


//<case_list>
//
//	<clause_list>:<clause>;[<case_list>]
//
//<write_clause>
//
//	write<write_list>
//	output <clause>,<write_list>
//	out.byte<clause>,<clause>,<clause>
//	out.16<clause>,<clause>,<clause>
//	out.32<clause>,<clause>
//
//<write_list>
//
//	<clause>[:<clause>][,<write_list>]
//
//<raster>
//
//	<raster_op><clause>onto<clause>
//
//<raster_op>
//
//	ror
//	rand
//	xor
//	copy
//	nand
//	nor
//	not
//	xnor
//
//<clause_list>
//
//	<clause>[,<clause_list>]
//