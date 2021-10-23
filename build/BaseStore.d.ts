interface objarr extends Object {
    [name: string]: unknown;
}
export default class BaseStore<K, V> extends Map<K, V> {
    private _array;
    private _obj;
    constructor(entries?: ReadonlyArray<readonly [K, V]> | null);
    has(k: K): boolean;
    get(k: K): V | undefined;
    set(k: K, v: V): this;
    clearArray(): void;
    delete(k: K): boolean;
    clear(): void;
    array(): V[];
    keyArray(): objarr;
    find(fn: (value: V, key: K, obj: this) => boolean): V | undefined;
    find<T>(fn: (this: T, value: V, key: K, obj: this) => boolean, thisArg: T): V | undefined;
}
export {};
