"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const events_1 = require("events");
const VoteService_1 = require("../services/VoteService");
class Player extends events_1.EventEmitter {
    constructor(queue, streamService) {
        super();
        this.queue = queue;
        this.streamService = streamService;
        this.current = null;
        this.voteService = new VoteService_1.VoteService();
        this.playing = false;
    }
    async playNext() {
        if (this.playing)
            return;
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
    vote(userId, type) {
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
exports.Player = Player;
