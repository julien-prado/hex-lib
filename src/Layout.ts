import Orientation from './Orientation';
import Point from './Point';
import Hex from './Hex';

export default class Layout {
  public orientation: Orientation;

  public size: Point;

  public origin: Point;

  constructor({ orientation = Layout.pointy, size = Point.ZERO, origin = Point.ZERO }) {
    Object.assign(this, { orientation, size, origin });
  }

  public static pointy: Orientation = new Orientation(
    {
      f0: Math.sqrt(3.0),
      f1: Math.sqrt(3.0) / 2.0,
      f2: 0.0,
      f3: 3.0 / 2.0,
      b0: Math.sqrt(3.0) / 3.0,
      b1: -1.0 / 3.0,
      b2: 0.0,
      b3: 2.0 / 3.0,
      startAngle: 0.5,
    },
  );

  public static flat: Orientation = new Orientation(
    {
      f0: 3.0 / 2.0,
      f1: 0.0,
      f2: Math.sqrt(3.0) / 2.0,
      f3: Math.sqrt(3.0),
      b0: 2.0 / 3.0,
      b1: 0.0,
      b2: -1.0 / 3.0,
      b3: Math.sqrt(3.0) / 3.0,
      startAngle: 0.0,
    },
  );

  public hexToPixel({ q = 0, r = 0 } = {}): Point {
    const { orientation, size, origin } = this;
    const x: number = (orientation.f0 * q + orientation.f1 * r) * size.x;
    const y: number = (orientation.f2 * q + orientation.f3 * r) * size.y;
    return new Point({ x: x + origin.x, y: y + origin.y });
  }

  public pixelToHex({ x = 0, y = 0 } = {}): Hex {
    const { orientation, size, origin } = this;
    const pt: Point = new Point({ x: (x - origin.x) / size.x, y: (y - origin.y) / size.y });
    const q: number = orientation.b0 * pt.x + orientation.b1 * pt.y;
    const r: number = orientation.b2 * pt.x + orientation.b3 * pt.y;
    const s = -q - r;
    return new Hex({ q, r, s });
  }

  public hexCornerOffset(corner: number): Point {
    const { orientation, size } = this;
    const angle: number = (2.0 * Math.PI * (orientation.startAngle - corner)) / 6.0;
    return new Point({ x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) });
  }

  public polygonCorners({ q = 0, r = 0 } = {}): Point[] {
    const corners: Point[] = [];
    const center: Point = this.hexToPixel({ q, r });
    for (let i = 0; i < 6; i += 1) {
      const offset: Point = this.hexCornerOffset(i);
      corners.push(new Point({ x: center.x + offset.x, y: center.y + offset.y }));
    }
    return corners;
  }
}
