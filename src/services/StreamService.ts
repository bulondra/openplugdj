import { Track } from "../models/Track";

export interface StreamService {
    play(track: Track): Promise<void>;
    stop(): Promise<void>;
}