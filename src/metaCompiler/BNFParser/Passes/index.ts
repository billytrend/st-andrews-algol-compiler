import {MakeClassDefinitions} from './MakeClassDefinitions.ts';
import {MakeDoupleDispatch} from './MakeDoupleDispatch.ts';
import {MakeLexer} from './MakeLexer.ts';
import {MakeVisitor} from './MakeVisitor.ts';
import {ReformatBNF} from './ReformatBNF.ts';
import {ValidateBNF} from './ValidateBNF.ts';

export var passes = {
    MakeClassDefinitions: MakeClassDefinitions,
    MakeDoupleDispatch: MakeDoupleDispatch,
    MakeLexer: MakeLexer,
    MakeVisitor: MakeVisitor,
    ReformatBNF: ReformatBNF,
    ValidateBNF: ValidateBNF
};