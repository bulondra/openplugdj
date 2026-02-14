import { EventEmitter } from "events";
import { Queue } from "./Queue";
import { Player } from "./Player";
import { User } from "../models/User";
import { DJEntry } from "../models/DJEntry";
import { StreamService } from "../services/StreamService";
export declare class Room extends EventEmitter {
    id: string;
    private users;
    queue: Queue;
    player: Player;
    constructor(id: string, streamService: StreamService);
    addUser(user: User): void;
    removeUser(userId: string): void;
    addEntry(entry: DJEntry): void;
    start(): void;
}
