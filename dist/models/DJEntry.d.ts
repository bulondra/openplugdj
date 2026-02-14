import { Track } from "./Track";
export interface DJEntry {
    id: string;
    track: Track;
    userId: string;
    position: number;
    createdAt: number;
}
