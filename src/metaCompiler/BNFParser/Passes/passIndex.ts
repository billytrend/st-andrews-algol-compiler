import {MakeClassDefinitions} from './MakeClassDefinitions';
import {MakeDoupleDispatch} from './MakeDoupleDispatch';
import {MakeLexer} from './MakeLexer';
import {MakeVisitor} from './MakeVisitor';
import {ReformatBNF} from './ReformatBNF';
import {ValidateBNF} from './ValidateBNF';
import {AbstractVisitor} from "../AbstractManipulators/AbstractVisitor";

export function buildVisitor(visitorName: string): AbstractVisitor {
    switch (visitorName) {
        case "MakeDoupleDispatch": return new MakeDoupleDispatch();
        case "MakeLexer" : return new MakeLexer();
        case "MakeVisitor" : return new MakeVisitor();
        case "ReformatBNF" : return new ReformatBNF();
        case "ValidateBNF" : return new ValidateBNF();
    }
}

export var passes: Object = {
    MakeClassDefinitions: MakeClassDefinitions,
    MakeDoupleDispatch: MakeDoupleDispatch,
    MakeLexer: MakeLexer,
    MakeVisitor: MakeVisitor,
    ReformatBNF: ReformatBNF,
    ValidateBNF: ValidateBNF
};