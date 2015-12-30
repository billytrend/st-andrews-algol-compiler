export class Set<T extends Object> {
    private _dict: {} = {};

    get dict():{} {
        return this._dict;
    }

    set dict(value:{}) {
        this._dict = value;
    }

    add(item: T) {
        this.dict[item.toString()] = item;
    }

    remove(item: T) {
        delete this.dict[item.toString()];
    }

    contains(item: T) {
        return this.dict[item.toString()] !== undefined;
    }

    items(): T[] {
        return Object.keys(this.dict).map((key) => this.dict[key]);
    }

    static union<A>(sets: Set<A>[]): Set<A> {
        let newSet: Set<A> = new Set<A>();
        for (var aSet of sets) {
            newSet.addAll(aSet.items());
        }
        return newSet;
    }

    static intersection<A>(setA: Set<A>, setB: Set<A>): Set<A> {
        let newSet: Set<A> = new Set<A>();
        let newItems: A[] = [];

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