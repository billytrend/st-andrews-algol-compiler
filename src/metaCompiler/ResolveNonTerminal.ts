import {NonTerminal} from "./BNFParser/Parser";
import {Grammar} from "./BNFParser/Parser";
import {parentClass} from "./TypeClasses";
import {Terminal} from "./BNFParser/Parser";
import {Production} from "./BNFParser/Parser";
import {allTypes} from "./TypeClasses";
const prefixMatch = /([a-zA-Z]*T[0-6])/;

export function getPossibleProductions(productions: {}, entry: Terminal): Production[] {
    let correspondingProductions:Production[] = [];
    let possibleNonTerms = resolve(entry);
    for (let possible of possibleNonTerms) {
        if (productions[possible.prettyValue]) {
            correspondingProductions = correspondingProductions.concat(productions[possible.prettyValue]);
        }
    }
    return correspondingProductions;
}

export function getAllNonTerms(origin: NonTerminal): NonTerminal[] {
    let thisType = getType(origin);
    if (thisType == null) return [origin];
    let all: NonTerminal[] = [];
    for (let type of allTypes)  {
        all.push(NonTerminal.build(origin.prettyValue.replace(/(?!<)[^-<]*/, type)));
    }
    return all.reverse();
}

export function resolve(origin: NonTerminal): NonTerminal[] {
    let prefix = getType(origin);
    let resolutions: NonTerminal[] = [origin];

    if (prefix != null) {
        for (var parent = parentClass(prefix); parent; parent = parentClass(parent)) {
            let newResolutionName = origin.prettyValue.replace(prefixMatch, parent);
            resolutions.push(NonTerminal.build(newResolutionName));
        }
    }


    return resolutions;
}

export function getType(nonTerm: NonTerminal) {
    let prefix = nonTerm.prettyValue.match(/(?!<)([^-<]*)/);
    if (prefix == null) {
        return null;
    }
    return prefix[0];
}