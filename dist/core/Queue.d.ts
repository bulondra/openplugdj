import { DJEntry } from "../models/DJEntry";
export declare class Queue {
    private entries;
    add(entry: DJEntry): void;
    next(): DJEntry | undefined;
    remove(entryId: string): void;
    reorder(from: number, to: number): void;
    getAll(): DJEntry[];
    size(): number;
    clear(): void;
}
