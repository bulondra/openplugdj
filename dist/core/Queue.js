"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this.entries = [];
    }
    add(entry) {
        this.entries.push(entry);
    }
    next() {
        return this.entries.shift();
    }
    remove(entryId) {
        this.entries = this.entries.filter(e => e.id !== entryId);
    }
    reorder(from, to) {
        const [item] = this.entries.splice(from, 1);
        this.entries.splice(to, 0, item);
    }
    getAll() {
        return [...this.entries];
    }
    size() {
        return this.entries.length;
    }
    clear() {
        this.entries = [];
    }
}
exports.Queue = Queue;
