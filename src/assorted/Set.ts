export class Set<T extends Object> {
    private _dict: {} = {};

    get dict():{} {
        return this._dict;
    }

    set dict(value:{}) {
        this._dict = value;
    }

    add(item: T) {
        this.dict[item.toString()] = true;
    }

    remove(item: T) {
        delete this.dict[item.toString()];
    }

    contains(item: T) {
        return this.dict[item.toString()] !== undefined;
    }

    items(): T[] {
        return Object.keys(this.dict);
    }

    static union(setA: Set<T>, setB: Set<T>): Set<T> {
        let newSet: Set<T> = new Set<T>();
        newSet.addAll(setA.items());
        newSet.addAll(setB.items());
        return newSet;
    }

    static intersection(setA: Set<T>, setB: Set<T>): Set<T> {
        let newSet: Set<T> = new Set<T>();
        let newItems: T[] = [];

        for (let item of setA.items()) {
            if (setB.contains(item)) {
                newItems.push(item);
            }
        }

        for (let item of setB.items()) {
            if (setA.contains(item)) {
                newItems.push(item);
            }
        }

        newSet.addAll(newItems);
        return newSet;
    }

    addAll(items: T[]) {
        for (var item of items) {
            this.add(item);
        }
    }
}