export class Map<Key extends Object, Val> {
    private _dict: {} = {};
    private _keys: {} = {};

    get dict():{} {
        return this._dict;
    }

    set dict(value:{}) {
        this._dict = value;
    }

    get keys():{} {
        return this._keys;
    }

    set keys(value:{}) {
        this._keys = value;
    }

    put(key: Key, item: Val) {
        this.dict[key.toString()] = item;
        this.keys[key.toString()] = key;
    }

    get(key: Key): Val {
        return this.dict[key.toString()];
    }

    remove(key: Key) {
        delete this.dict[key.toString()];
        delete this.keys[key.toString()];
    }

    contains(key: Key) {
        return this.dict[key.toString()] !== undefined;
    }

    items(): [Key, Val][] {
        return Object.keys(this.dict).map((key): [Key, Val] => [this.keys[key], this.dict[key]]);
    }

}