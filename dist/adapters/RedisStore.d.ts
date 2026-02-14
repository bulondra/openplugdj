import { Store } from "./Store";
export declare class RedisStore<T> implements Store<T> {
    private redis;
    private namespace;
    constructor(redisUrl: string, namespace: string);
    private key;
    get(id: string): Promise<T | undefined>;
    set(id: string, value: T): Promise<void>;
    delete(id: string): Promise<void>;
    getAll(): Promise<T[]>;
    has(id: string): Promise<boolean>;
    clear(): Promise<void>;
}
