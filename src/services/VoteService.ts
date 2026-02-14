export class VoteService {
    private votes = new Map<string, "up" | "down">();

    vote(userId: string, type: "up" | "down") {
        this.votes.set(userId, type);
    }

    clear() {
        this.votes.clear();
    }

    getResults() {
        let up = 0;
        let down = 0;

        for (const v of this.votes.values()) {
            if (v === "up") up++;
            if (v === "down") down++;
        }

        return { up, down, total: up - down };
    }
}