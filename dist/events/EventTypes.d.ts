import { Track } from "../models/Track";
import { DJEntry } from "../models/DJEntry";
import { User } from "../models/User";
export interface RoomEvents {
    userJoined: (user: User) => void;
    userLeft: (user: User) => void;
    trackStart: (track: Track) => void;
    trackEnd: (track: Track) => void;
    queueUpdated: (entries: DJEntry[]) => void;
    voteUpdated: (votes: {
        up: number;
        down: number;
    }) => void;
    queueEmpty: () => void;
}
