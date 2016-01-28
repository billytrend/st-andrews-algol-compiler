var obj = {};
obj['int'] = obj['real'] = 'T0';
obj['T0'] = obj['string'] = 'T1';
obj['T1'] = obj['bool'] = 'T2';
obj['T2'] = obj['pntr'] = obj['file'] = 'T3';
obj['T3'] = obj['vecT4'] = 'T4';
obj['T4'] = obj['void'] = 'T5';
obj['T5'] = obj['structure'] = obj['T4.field'] = obj['T5.procedure'] = 'T6';

var concrete = {};
concrete["int"] =
concrete["real"] =
concrete["T0"] =
concrete["string"] =
concrete["bool"] =
concrete["pntr"] =
concrete["file"] =
concrete["vecT4"] =
concrete["void"] =
concrete["structure"] =
concrete["T4.field"] =
concrete["T5.procedure"] = true;

export var allTypes = [
    "int",
    "real",
    "T0",
    "string",
    "T1",
    "bool",
    "T2",
    "pntr",
    "file",
    "T3",
    "vecT4",
    "T4",
    "void",
    "T5",
    "structure",
    "T4.field",
    "T5.procedure",
    "T6"
];

export function isConcrete(type: string) {
    return concrete[type];
}

export function parentClass(cl: string): string {
    return obj[cl];
};

export function ltEqClass(cl: string, maybeSuper: string): boolean {
    if (!maybeSuper) {
        return true;
    } else if (maybeSuper === 'E') {
        return true;
    } else if (maybeSuper === cl) {
        return true;
    } else if (/^T/.test(maybeSuper)) {
        for (var parent = parentClass(cl); parent; parent = parentClass(parent)) {
            if (parent === maybeSuper) {
                return true;
            }
        }
    }

    return false;
}