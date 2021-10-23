"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseStore extends Map {
    _array;
    _obj;
    constructor(entries) {
        super(entries);
        Object.defineProperty(this, '_array', { value: null,
            writable: true,
            configurable: true });
        Object.defineProperty(this, '_obj', { value: null,
            writable: true,
            configurable: true });
    }
    has(k) {
        return super.has(k);
    }
    get(k) {
        return super.get(k);
    }
    set(k, v) {
        this._array = null;
        return super.set(k, v);
    }
    clearArray() {
        this._array = null;
        this._obj = null;
    }
    delete(k) {
        this._array = null;
        this._obj = null;
        return super.delete(k);
    }
    clear() {
        return super.clear();
    }
    array() {
        if (!this._array || this._array.length !== this.size) {
            this._array = [...this.values()];
        }
        return this._array;
    }
    keyArray() {
        if (!this._obj || Object.keys(this._obj).length !== this.size) {
            this._obj = Object.fromEntries(this);
        }
        return this._obj;
    }
    find(fn, thisArg) {
        if (typeof thisArg !== 'undefined') {
            fn = fn.bind(thisArg);
        }
        for (const [key, val] of this) {
            if (fn(val, key, this)) {
                return val;
            }
        }
        // eslint-disable-next-line no-undefined
        return undefined;
    }
}
exports.default = BaseStore;
