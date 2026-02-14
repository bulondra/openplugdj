"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStore = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisStore {
    constructor(redisUrl, namespace) {
        this.redis = new ioredis_1.default(redisUrl);
        this.namespace = namespace;
    }
    key(id) {
        return `${this.namespace}:${id}`;
    }
    async get(id) {
        const data = await this.redis.get(this.key(id));
        if (!data)
            return undefined;
        return JSON.parse(data);
    }
    async set(id, value) {
        await this.redis.set(this.key(id), JSON.stringify(value));
    }
    async delete(id) {
        await this.redis.del(this.key(id));
    }
    async getAll() {
        const keys = await this.redis.keys(`${this.namespace}:*`);
        if (!keys.length)
            return [];
        const values = await this.redis.mget(...keys);
        return values
            .filter(Boolean)
            .map(v => JSON.parse(v));
    }
    async has(id) {
        const exists = await this.redis.exists(this.key(id));
        return exists === 1;
    }
    async clear() {
        const keys = await this.redis.keys(`${this.namespace}:*`);
        if (keys.length) {
            await this.redis.del(...keys);
        }
    }
}
exports.RedisStore = RedisStore;
