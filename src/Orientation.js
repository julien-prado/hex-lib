"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Orientation {
    constructor(s) {
        this.f0 = 0;
        this.f1 = 0;
        this.f2 = 0;
        this.f3 = 0;
        this.b0 = 0;
        this.b1 = 0;
        this.b2 = 0;
        this.b3 = 0;
        this.startAngle = 0;
        Object.assign(this, s);
    }
}
exports.default = Orientation;
