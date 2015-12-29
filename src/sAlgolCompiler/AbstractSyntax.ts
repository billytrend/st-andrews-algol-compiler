class AbstractSyntaxType {}

class Literal extends AbstractSyntaxType {}

class Integer extends Literal {}
class Real extends Literal {}
class Bool extends Literal {}
class Str extends Literal {}
class Pixel extends Literal {}
class NullFile extends Literal {}
class Pointer extends Literal {}

class Operation {}

enum boolean_operator {NOT, AND, OR}
class BooleanOperation extends Operation {}

enum comparison_operator {LT, LEQ, GT, GEQ, EQ, NEQ, IS, ISNT}
class ComparisonOperation extends Operation {}

enum arithmetic_operator {ADD, SUB, MUL, DIV, INTDIV, MOD}
class ArithmeticOperation extends Operation {}

enum string_operator {JOIN}
class StringOperation extends Operation {}

enum picture_operator {SHIFT, SCALE, ROTATE, COLOUR, TEXT}
class PictureOperation extends Operation {}

class PixelExpression extends Operation {}

enum raster_operator {ROR, RAND, XOR, COPY, NAND, NOR, NOT, XNOR, LIMIT, DEPTH}
class RasterOperation extends Operation {}

class Declaration extends AbstractSyntaxType {}

class Identifier extends Declaration {}
class Sequence extends Declaration {}
class BracketedSequence extends Declaration {}

class Clause extends AbstractSyntaxType {}

class Assignment extends Clause {}
class Conditional extends Clause {}
class Case extends Clause {}
class Loop extends Clause {}
class Abort extends Clause {}

class Assignable extends Clause {}

class Procedure extends Assignable {}
class Forward extends Assignable {}
class Vector extends Assignable {}
class Structure extends Assignable {}
class Img extends Assignable {}

enum input_type {READ, READI, READR, READB, READS, PEEK, READ_A_LINE, READ_BYTE, READ_16, READ_32, EOF}
class Input extends Assignable {}