import Orientation from './Orientation';
import Point from './Point';
import Hex from './Hex';
export default class Layout {
    orientation: Orientation;
    size: Point;
    origin: Point;
    constructor({ orientation, size, origin }: {
        orientation?: Orientation;
        size?: Point;
        origin?: Point;
    });
    static pointy: Orientation;
    static flat: Orientation;
    hexToPixel({ q, r }?: {
        q?: number;
        r?: number;
    }): Point;
    pixelToHex({ x, y }?: {
        x?: number;
        y?: number;
    }): Hex;
    hexCornerOffset(corner: number): Point;
    polygonCorners({ q, r }?: {
        q?: number;
        r?: number;
    }): Point[];
}
