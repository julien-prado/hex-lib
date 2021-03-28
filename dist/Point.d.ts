export default class Point {
    x: number;
    y: number;
    constructor({ x, y }?: {
        x?: number;
        y?: number;
    });
    static ZERO: Point;
}
