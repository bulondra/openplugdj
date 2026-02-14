import { EventEmitter } from "events";
import { Room } from "./Room";
import { StreamService } from "../services/StreamService";
export declare class DJ extends EventEmitter {
    private streamService;
    private rooms;
    constructor(streamService: StreamService);
    createRoom(id: string): Room;
    getRoom(id: string): Promise<Room | undefined>;
    deleteRoom(id: string): void;
}
