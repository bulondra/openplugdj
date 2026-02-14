export interface Store<T> {
    get(id: string): Promise<T | undefined>;
    set(id: string, value: T): Promise<void>;
    delete(id: string): Promise<void>;
    getAll(): Promise<T[]>;
    has(id: string): Promise<boolean>;
    clear(): Promise<void>;
}
