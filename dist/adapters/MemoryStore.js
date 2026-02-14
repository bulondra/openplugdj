"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor() {
        this.map = new Map();
    }
    async get(id) {
        return this.map.get(id);
    }
    async set(id, value) {
        this.map.set(id, value);
    }
    async delete(id) {
        this.map.delete(id);
    }
    async getAll() {
        return Array.from(this.map.values());
    }
    async has(id) {
        return this.map.has(id);
    }
    async clear() {
        this.map.clear();
    }
}
exports.MemoryStore = MemoryStore;
