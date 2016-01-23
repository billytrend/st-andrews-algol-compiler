var obj = {};
obj['int'] = obj['real'] = 'T0';
obj['T0'] = obj['string'] = 'T1';
obj['T1'] = obj['bool'] = 'T2';
obj['T2'] = obj['pntr'] = obj['file'] = 'T3';
obj['T3'] = obj['vecT4'] = 'T4';
obj['T4'] = obj['void'] = 'T5';
obj['T5'] = obj['structure'] = obj['T4.field'] = obj['T5.procedure'] = 'T6';

export var typeClasses = obj;