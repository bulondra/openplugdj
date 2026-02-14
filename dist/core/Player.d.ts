import { EventEmitter } from "events";
import { Queue } from "./Queue";
import { StreamService } from "../services/StreamService";
import { DJEntry } from "../models/DJEntry";
export declare class Player extends EventEmitter {
    private queue;
    private streamService;
    private current;
    private voteService;
    private playing;
    constructor(queue: Queue, streamService: StreamService);
    playNext(): Promise<void>;
    vote(userId: string, type: "up" | "down"): void;
    skip(): void;
    getCurrent(): DJEntry | null;
}
