import { DJEntry } from "../models/DJEntry";

export class Queue {
    private entries: DJEntry[] = [];

    add(entry: DJEntry) {
        this.entries.push(entry);
    }

    next(): DJEntry | undefined {
        return this.entries.shift();
    }

    remove(entryId: string) {
        this.entries = this.entries.filter(e => e.id !== entryId);
    }

    reorder(from: number, to: number) {
        // Validate bounds
        if (from < 0 || from >= this.entries.length) {
            throw new Error(`Invalid 'from' index: ${from}. Queue length: ${this.entries.length}`);
        }
        if (to < 0 || to >= this.entries.length) {
            throw new Error(`Invalid 'to' index: ${to}. Queue length: ${this.entries.length}`);
        }
        if (from === to) {
            return; // No-op
        }

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