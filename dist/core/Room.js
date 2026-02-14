"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const events_1 = require("events");
const Queue_1 = require("./Queue");
const Player_1 = require("./Player");
class Room extends events_1.EventEmitter {
    constructor(id, streamService) {
        super();
        this.id = id;
        this.users = new Map();
        this.queue = new Queue_1.Queue();
        this.player = new Player_1.Player(this.queue, streamService);
        this.player.on("trackStart", t => this.emit("trackStart", t));
        this.player.on("trackEnd", t => this.emit("trackEnd", t));
        this.player.on("voteUpdated", v => this.emit("voteUpdated", v));
        this.player.on("queueEmpty", () => this.emit("queueEmpty"));
    }
    addUser(user) {
        this.users.set(user.id, user);
        this.emit("userJoined", user);
    }
    removeUser(userId) {
        const user = this.users.get(userId);
        if (!user)
            return;
        this.users.delete(userId);
        this.emit("userLeft", user);
    }
    addEntry(entry) {
        this.queue.add(entry);
        this.emit("queueUpdated", this.queue.getAll());
    }
    start() {
        this.player.playNext();
    }
}
exports.Room = Room;
