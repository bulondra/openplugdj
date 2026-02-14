import { EventEmitter } from "events";
import { Room } from "./Room";
import { MemoryStore } from "../adapters/MemoryStore";
import { StreamService } from "../services/StreamService";

export class DJ extends EventEmitter {
    private rooms = new MemoryStore<Room>();

    constructor(private streamService: StreamService) {
        super();
    }

    createRoom(id: string) {
        const room = new Room(id, this.streamService);
        this.rooms.set(id, room);
        this.emit("roomCreated", room);
        return room;
    }

    getRoom(id: string) {
        return this.rooms.get(id);
    }

    deleteRoom(id: string) {
        const room = this.rooms.get(id);
        if (!room) return;
        this.rooms.delete(id);
        this.emit("roomDeleted", room);
    }
}