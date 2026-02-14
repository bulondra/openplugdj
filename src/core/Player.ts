import { EventEmitter } from "events";
import { Queue } from "./Queue";
import { VoteService } from "../services/VoteService";
import { StreamService } from "../services/StreamService";
import { DJEntry } from "../models/DJEntry";

export class Player extends EventEmitter {
    private current: DJEntry | null = null;
    private voteService = new VoteService();
    private playing = false;

    constructor(
        private queue: Queue,
        private streamService: StreamService
    ) {
        super();
    }

    async playNext() {
        if (this.playing) return;

        const entry = this.queue.next();
        if (!entry) {
            this.emit("queueEmpty");
            return;
        }

        this.current = entry;
        this.voteService.clear();
        this.playing = true;

        this.emit("trackStart", entry.track);

        await this.streamService.play(entry.track);

        this.emit("trackEnd", entry.track);

        this.playing = false;
        this.playNext();
    }

    vote(userId: string, type: "up" | "down") {
        this.voteService.vote(userId, type);
        this.emit("voteUpdated", this.voteService.getResults());
    }

    skip() {
        this.streamService.stop();
        this.playing = false;
        this.playNext();
    }

    getCurrent() {
        return this.current;
    }
}