import Hex from './Hex';
export default class OffsetCoord {
    col: number;
    row: number;
    constructor({ col, row }?: {
        col?: number;
        row?: number;
    });
    static EVEN: number;
    static ODD: number;
    static qoffsetFromCube(offset: number, { q, r }?: {
        q?: number;
        r?: number;
    }): OffsetCoord;
    static qoffsetToCube(offset: number, { col, row }?: {
        col?: number;
        row?: number;
    }): Hex;
    static roffsetFromCube(offset: number, { q, r }?: {
        q?: number;
        r?: number;
    }): OffsetCoord;
    static roffsetToCube(offset: number, { col, row }?: {
        col?: number;
        row?: number;
    }): Hex;
}
