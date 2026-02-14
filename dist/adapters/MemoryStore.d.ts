import { Store } from "./Store";
export declare class MemoryStore<T> implements Store<T> {
    private map;
    get(id: string): Promise<T | undefined>;
    set(id: string, value: T): Promise<void>;
    delete(id: string): Promise<void>;
    getAll(): Promise<T[]>;
    has(id: string): Promise<boolean>;
    clear(): Promise<void>;
}
