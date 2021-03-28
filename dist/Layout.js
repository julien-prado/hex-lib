import Orientation from './Orientation';
import Point from './Point';
import Hex from './Hex';
export default class Layout {
    constructor({ orientation = Layout.pointy, size = Point.ZERO, origin = Point.ZERO }) {
        Object.assign(this, { orientation, size, origin });
    }
    hexToPixel({ q = 0, r = 0 } = {}) {
        const { orientation, size, origin } = this;
        const x = (orientation.f0 * q + orientation.f1 * r) * size.x;
        const y = (orientation.f2 * q + orientation.f3 * r) * size.y;
        return new Point({ x: x + origin.x, y: y + origin.y });
    }
    pixelToHex({ x = 0, y = 0 } = {}) {
        const { orientation, size, origin } = this;
        const pt = new Point({ x: (x - origin.x) / size.x, y: (y - origin.y) / size.y });
        const q = orientation.b0 * pt.x + orientation.b1 * pt.y;
        const r = orientation.b2 * pt.x + orientation.b3 * pt.y;
        const s = -q - r;
        return new Hex({ q, r, s });
    }
    hexCornerOffset(corner) {
        const { orientation, size } = this;
        const angle = (2.0 * Math.PI * (orientation.startAngle - corner)) / 6.0;
        return new Point({ x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) });
    }
    polygonCorners({ q = 0, r = 0 } = {}) {
        const corners = [];
        const center = this.hexToPixel({ q, r });
        for (let i = 0; i < 6; i += 1) {
            const offset = this.hexCornerOffset(i);
            corners.push(new Point({ x: center.x + offset.x, y: center.y + offset.y }));
        }
        return corners;
    }
}
Layout.pointy = new Orientation({
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
Layout.flat = new Orientation({
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
