import Redis from "ioredis";
import { Store } from "./Store";

export class RedisStore<T> implements Store<T> {
    private redis: Redis;
    private namespace: string;

    constructor(redisUrl: string, namespace: string) {
        this.redis = new Redis(redisUrl);
        this.namespace = namespace;
    }

    private key(id: string) {
        return `${this.namespace}:${id}`;
    }

    async get(id: string): Promise<T | undefined> {
        const data = await this.redis.get(this.key(id));
        if (!data) return undefined;
        return JSON.parse(data) as T;
    }

    async set(id: string, value: T): Promise<void> {
        await this.redis.set(this.key(id), JSON.stringify(value));
    }

    async delete(id: string): Promise<void> {
        await this.redis.del(this.key(id));
    }

    async getAll(): Promise<T[]> {
        const keys = await this.redis.keys(`${this.namespace}:*`);
        if (!keys.length) return [];

        const values = await this.redis.mget(...keys);
        return values
            .filter(Boolean)
            .map(v => JSON.parse(v!) as T);
    }

    async has(id: string): Promise<boolean> {
        const exists = await this.redis.exists(this.key(id));
        return exists === 1;
    }

    async clear(): Promise<void> {
        const keys = await this.redis.keys(`${this.namespace}:*`);
        if (keys.length) {
            await this.redis.del(...keys);
        }
    }
}