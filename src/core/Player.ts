import { EventEmitter } from "events";
import { Queue } from "./Queue";
import { VoteService } from "../services/VoteService";
import { StreamService } from "../services/StreamService";
import { DJEntry } from "../models/DJEntry";

export class Player extends EventEmitter {
    private current: DJEntry | null = null;
    private voteService = new VoteService();
    private playing = false;
    private abortController: AbortController | null = null;

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
        this.abortController = new AbortController();

        this.emit("trackStart", entry.track);

        try {
            await this.streamService.play(entry.track);
            
            // Check if we were cancelled during playback
            if (this.abortController.signal.aborted) {
                return;
            }

            this.emit("trackEnd", entry.track);
        } catch (error) {
            this.emit("error", {
                type: "stream",
                track: entry.track,
                error: error instanceof Error ? error : new Error(String(error))
            });
        } finally {
            this.playing = false;
            this.abortController = null;
        }

        // Continue to next track (recursive call happens after cleanup)
        this.playNext();
    }

    vote(userId: string, type: "up" | "down") {
        try {
            this.voteService.vote(userId, type);
            this.emit("voteUpdated", this.voteService.getResults());
        } catch (error) {
            this.emit("error", {
                type: "vote",
                error: error instanceof Error ? error : new Error(String(error))
            });
        }
    }

    async skip() {
        if (!this.playing) return;

        // Signal cancellation
        if (this.abortController) {
            this.abortController.abort();
        }

        try {
            await this.streamService.stop();
        } catch (error) {
            this.emit("error", {
                type: "skip",
                error: error instanceof Error ? error : new Error(String(error))
            });
        }

        this.playing = false;
        this.abortController = null;
        
        // Continue to next track
        this.playNext();
    }

    getCurrent() {
        return this.current;
    }

    isPlaying() {
        return this.playing;
    }
}