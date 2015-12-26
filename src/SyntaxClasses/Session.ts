//<program>
//
//	<sequence>?
//

import {Declaration} from "Declarations";
import {Clause} from "./Clauses";
class Program {}

//<sequence>
//
//	<declaration>[;<sequence>]
//	<clause>[;<sequence>]

class Sequence {}

class DeclarationSequence extends Sequence {
    declaration : Declaration;
    sequence: Sequence;
}

class ClauseSequence extends Sequence {
    clause : Clause;
    sequence: Sequence;
}