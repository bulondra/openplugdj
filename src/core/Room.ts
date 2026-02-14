import { EventEmitter } from "events";
import { Queue } from "./Queue";
import { Player } from "./Player";
import { User } from "../models/User";
import { DJEntry } from "../models/DJEntry";
import { StreamService } from "../services/StreamService";

export class Room extends EventEmitter {
    private users = new Map<string, User>();
    public queue = new Queue();
    public player: Player;

    constructor(
        public id: string,
        streamService: StreamService
    ) {
        super();

        this.player = new Player(this.queue, streamService);

        this.player.on("trackStart", t => this.emit("trackStart", t));
        this.player.on("trackEnd", t => this.emit("trackEnd", t));
        this.player.on("voteUpdated", v => this.emit("voteUpdated", v));
        this.player.on("queueEmpty", () => this.emit("queueEmpty"));
    }

    addUser(user: User) {
        this.users.set(user.id, user);
        this.emit("userJoined", user);
    }

    removeUser(userId: string) {
        const user = this.users.get(userId);
        if (!user) return;
        this.users.delete(userId);
        this.emit("userLeft", user);
    }

    addEntry(entry: DJEntry) {
        this.queue.add(entry);
        this.emit("queueUpdated", this.queue.getAll());
    }

    start() {
        this.player.playNext();
    }
}