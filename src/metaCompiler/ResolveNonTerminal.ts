import {NonTerminal} from "./BNFParser/Parser";
import {Grammar} from "./BNFParser/Parser";
import {parentClass} from "./TypeClasses";
import {Terminal} from "./BNFParser/Parser";
import {Production} from "./BNFParser/Parser";
import {allTypes} from "./TypeClasses";
import {isConcrete} from "./TypeClasses";
import {isWithinClass} from "./TypeClasses";
const prefixMatch = /([a-zA-Z]*T[0-6])/;


//export function resolve(origin: NonTerminal): NonTerminal[] {
//    let prefix = getType(origin);
//    let resolutions: NonTerminal[] = [origin];
//
//    if (prefix != null) {
//        for (var parent = parentClass(prefix); parent; parent = parentClass(parent)) {
//            let newResolutionName = origin.prettyValue.replace(prefixMatch, parent);
//            resolutions.push(NonTerminal.build(newResolutionName));
//        }
//    }
//
//
//    return resolutions;
//}

export function extractType(nonTerm: NonTerminal): string {
    let prefix = nonTerm.prettyValue.match(/(?!<)([^-]*)(?=-)/);
    if (prefix == null) {
        return null;
    }
    return prefix[0];
}

export function applyType(nonTerm: NonTerminal, type: string): NonTerminal {
    let replacement = nonTerm.prettyValue.replace(/(?!<)([^-]*)(?=-)/, type);
    return NonTerminal.build(replacement);
}

export function getPossibleNonTerminals(nonTerm: NonTerminal, type: string): NonTerminal[] {
    if (!/-/g.test(nonTerm.prettyValue)) {
        return [nonTerm]
    }

    nonTerm = applyType(nonTerm, type);
    let isConc = isConcrete(type);

    return isConc ?
        getPossibleNonTerminalsForConcrete(nonTerm, type):
        getPossibleNonTerminalsForAbstract(nonTerm, type);
}

export function getPossibleNonTerminalsForConcrete(nonTerm: NonTerminal, type: string): NonTerminal[] {
    let possible: NonTerminal[] = [nonTerm];
    for (var parent = parentClass(type); parent; parent = parentClass(parent)) {
        possible.push(applyType(nonTerm, parent));
    }
    return possible;
}

export function getPossibleNonTerminalsForAbstract(nonTerm: NonTerminal, type: string): NonTerminal[] {
    let possibles: NonTerminal[] = [];
    for (let aType of allTypes) {
        possibles.push(applyType(nonTerm, aType));
        if (aType === type) {
            break;
        }
    }
    return possibles.concat(getPossibleNonTerminalsForConcrete(nonTerm, type));
}

export function shouldConstrainTypes(incomingType: string, matchedType: string) {
    return isWithinClass(incomingType, matchedType)
}