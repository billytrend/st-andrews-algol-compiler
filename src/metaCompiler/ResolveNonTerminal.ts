import {NonTerminal} from "./BNFParser/Parser";
import {Grammar} from "./BNFParser/Parser";
import {typeClasses} from "./TypeClasses";
import {Terminal} from "./BNFParser/Parser";
import {Production} from "./BNFParser/Parser";
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


export function resolve(origin: NonTerminal): NonTerminal[] {
    let prefix = origin.prettyValue.match(prefixMatch);
    let resolutions: NonTerminal[] = [origin];

    if (prefix == null) {
        return [origin];
    }

    for (var parent = typeClasses[prefix[0]]; parent; parent = typeClasses[parent]) {
        let newResolutionName = origin.prettyValue.replace(prefixMatch, parent);
        resolutions.push(NonTerminal.build(newResolutionName));
    }

    return resolutions;
}