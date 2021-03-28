export default class Hex {
    q: number;
    r: number;
    s: number;
    constructor({ q, r, s }?: {
        q?: number;
        r?: number;
        s?: number;
    });
    add({ q, r, s }?: {
        q?: number;
        r?: number;
        s?: number;
    }): Hex;
    subtract({ q, r, s }?: {
        q?: number;
        r?: number;
        s?: number;
    }): Hex;
    scale(k: number): Hex;
    rotateLeft(): Hex;
    rotateRight(): Hex;
    static directions: Hex[];
    static direction(direction: number): Hex;
    neighbor(direction: number): Hex;
    static diagonals: Hex[];
    diagonalNeighbor(direction: number): Hex;
    len(): number;
    distance({ q, r, s }?: {
        q?: number;
        r?: number;
        s?: number;
    }): number;
    round(): Hex;
    lerp({ q, r, s }: {
        q?: number;
        r?: number;
        s?: number;
    }, t: number): Hex;
    linedraw({ q, r, s }?: {
        q?: number;
        r?: number;
        s?: number;
    }): Hex[];
    static ZERO: Hex;
}
