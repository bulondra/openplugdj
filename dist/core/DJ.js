"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJ = void 0;
const events_1 = require("events");
const Room_1 = require("./Room");
const MemoryStore_1 = require("../adapters/MemoryStore");
class DJ extends events_1.EventEmitter {
    constructor(streamService) {
        super();
        this.streamService = streamService;
        this.rooms = new MemoryStore_1.MemoryStore();
    }
    createRoom(id) {
        const room = new Room_1.Room(id, this.streamService);
        this.rooms.set(id, room);
        this.emit("roomCreated", room);
        return room;
    }
    getRoom(id) {
        return this.rooms.get(id);
    }
    deleteRoom(id) {
        const room = this.rooms.get(id);
        if (!room)
            return;
        this.rooms.delete(id);
        this.emit("roomDeleted", room);
    }
}
exports.DJ = DJ;
