import { Track } from "../models/Track";

export interface MetadataService {
    resolve(url: string): Promise<Partial<Track>>;
}