export declare class VoteService {
    private votes;
    vote(userId: string, type: "up" | "down"): void;
    clear(): void;
    getResults(): {
        up: number;
        down: number;
        total: number;
    };
}
