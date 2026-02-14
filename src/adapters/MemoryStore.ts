import { Store } from "./Store";

export class MemoryStore<T> implements Store<T> {
    private map = new Map<string, T>();

    async get(id: string): Promise<T | undefined> {
        return this.map.get(id);
    }

    async set(id: string, value: T): Promise<void> {
        this.map.set(id, value);
    }

    async delete(id: string): Promise<void> {
        this.map.delete(id);
    }

    async getAll(): Promise<T[]> {
        return Array.from(this.map.values());
    }

    async has(id: string): Promise<boolean> {
        return this.map.has(id);
    }

    async clear(): Promise<void> {
        this.map.clear();
    }
}