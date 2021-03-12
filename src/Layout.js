"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orientation_1 = __importDefault(require("./Orientation"));
const Point_1 = __importDefault(require("./Point"));
const Hex_1 = __importDefault(require("./Hex"));
class Layout {
    constructor(s) {
        this.orientation = Layout.pointy;
        this.size = Point_1.default.point0;
        this.origin = Point_1.default.point0;
        Object.assign(this, s);
    }
    hexToPixel(h) {
        const M = this.orientation;
        const { size } = this;
        const { origin } = this;
        const x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        const y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point_1.default({ x: x + origin.x, y: y + origin.y });
    }
    pixelToHex(p) {
        const M = this.orientation;
        const { size } = this;
        const { origin } = this;
        const pt = new Point_1.default({ x: (p.x - origin.x) / size.x, y: (p.y - origin.y) / size.y });
        const q = M.b0 * pt.x + M.b1 * pt.y;
        const r = M.b2 * pt.x + M.b3 * pt.y;
        const s = -q - r;
        return new Hex_1.default({ q, r, s });
    }
    hexCornerOffset(corner) {
        const M = this.orientation;
        const { size } = this;
        const angle = (2.0 * Math.PI * (M.startAngle - corner)) / 6.0;
        return new Point_1.default({ x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) });
    }
    polygonCorners(h) {
        const corners = [];
        const center = this.hexToPixel(h);
        for (let i = 0; i < 6; i += 1) {
            const offset = this.hexCornerOffset(i);
            corners.push(new Point_1.default({ x: center.x + offset.x, y: center.y + offset.y }));
        }
        return corners;
    }
}
exports.default = Layout;
Layout.pointy = new Orientation_1.default({
    f0: Math.sqrt(3.0),
    f1: Math.sqrt(3.0) / 2.0,
    f2: 0.0,
    f3: 3.0 / 2.0,
    b0: Math.sqrt(3.0) / 3.0,
    b1: -1.0 / 3.0,
    b2: 0.0,
    b3: 2.0 / 3.0,
    startAngle: 0.5,
});
Layout.flat = new Orientation_1.default({
    f0: 3.0 / 2.0,
    f1: 0.0,
    f2: Math.sqrt(3.0) / 2.0,
    f3: Math.sqrt(3.0),
    b0: 2.0 / 3.0,
    b1: 0.0,
    b2: -1.0 / 3.0,
    b3: Math.sqrt(3.0) / 3.0,
    startAngle: 0.0,
});
