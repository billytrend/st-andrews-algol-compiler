var obj = {};
obj['int'] = obj['real'] = 'T0';
obj['T0'] = obj['string'] = 'T1';
obj['T1'] = obj['bool'] = 'T2';
obj['T2'] = obj['pntr'] = obj['file'] = 'T3';
obj['T3'] = obj['vecT4'] = 'T4';
obj['T4'] = obj['void'] = 'T5';
obj['T5'] = obj['structure'] = obj['T4.field'] = obj['T5.procedure'] = 'T6';

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
    "void",
    "T4",
    "structure",
    "T4.field",
    "T5.procedure",
    "T5"
];

export function parentClass(cl: string): string {
    return obj[cl];
};

export function isWithinClass(cl: string, maybeSuper: string): boolean {
    if (!maybeSuper) {
        return true;
    } else if (maybeSuper === 'E') {
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