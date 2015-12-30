/// <reference path="../../typings/tsd.d.ts" />
import * as lodash from 'lodash';

export function intuitDelimeters(terminals: string[]) {
    let delimeters: string[] = [];

    for (var terminal of terminals) {
        let reg = new RegExp(lodash.escapeRegExp(terminal), "i");
        let isDelimeter = true;
        for (var otherTerminal of terminals) {
            if (terminal != otherTerminal && reg.test(otherTerminal)) {
                isDelimeter = false;
                break;
            }
        }

        if (isDelimeter) {
            delimeters.push(terminal)
        }
    }

    return delimeters;
}