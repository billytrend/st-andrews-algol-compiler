import {resolve} from "url";
import {NonTerminal} from "./BNFParser/Parser";
import {Grammar} from "./BNFParser/Parser";
import {typeClasses} from "./TypeClasses";
const prefixMatch = /([a-zA-Z]*T[0-6])/;

export function resolve(origin: NonTerminal): NonTerminal[] {
    let prefix = origin.prettyValue.match(prefixMatch);
    let resolutions: NonTerminal[] = [origin];

    if (prefix == null) {
        return [origin];
    }

    for (var parent = typeClasses[prefix]; typeClasses[parent]; parent = typeClasses[parent]) {
        let newResolutionName = origin.prettyValue.replace(prefixMatch, "parent");
        resolutions.push(NonTerminal.build(newResolutionName));
    }

    return resolutions;
}