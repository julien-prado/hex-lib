"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(s) {
        this.x = 0;
        this.y = 0;
        Object.assign(this, s);
    }
}
exports.default = Point;
Point.point0 = new Point({ x: 0, y: 0 });
