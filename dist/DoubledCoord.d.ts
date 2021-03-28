import Hex from './Hex';
export default class DoubledCoord {
    col: number;
    row: number;
    constructor({ col, row }?: {
        col?: number;
        row?: number;
    });
    static qdoubledFromCube({ q, r }?: {
        q?: number;
        r?: number;
    }): DoubledCoord;
    qdoubledToCube(): Hex;
    static rdoubledFromCube({ q, r }?: {
        q?: number;
        r?: number;
    }): DoubledCoord;
    rdoubledToCube(): Hex;
}
