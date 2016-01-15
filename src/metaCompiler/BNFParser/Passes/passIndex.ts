import {MakeClassDefinitions} from './MakeClassDefinitions';
import {MakeDoupleDispatch} from './MakeDoupleDispatch';
import {MakeLexer} from './MakeLexer';
import {MakeVisitorTraversal} from './MakeVisitorTraversal';
import {ReformatBNF} from './ReformatBNF';
import {ValidateBNF} from './ValidateBNF';
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";
import {MakeLexerEnum} from "./MakeLexerEnum";

export function buildVisitor(visitorName: string): AbstractVisitor {
    switch (visitorName) {
        case "MakeDoupleDispatch": return new MakeDoupleDispatch();
        case "MakeLexer" : return new MakeLexer();
        case "MakeVisitorTraversal" : return new MakeVisitorTraversal();
        case "ReformatBNF" : return new ReformatBNF();
        case "ValidateBNF" : return new ValidateBNF();
        case "MakeLexerEnum" : return new MakeLexerEnum();
    }
}