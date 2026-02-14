"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteService = void 0;
class VoteService {
    constructor() {
        this.votes = new Map();
    }
    vote(userId, type) {
        this.votes.set(userId, type);
    }
    clear() {
        this.votes.clear();
    }
    getResults() {
        let up = 0;
        let down = 0;
        for (const v of this.votes.values()) {
            if (v === "up")
                up++;
            if (v === "down")
                down++;
        }
        return { up, down, total: up - down };
    }
}
exports.VoteService = VoteService;
