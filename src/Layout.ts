import Orientation from './Orientation';
import Point from './Point';
import Hex from './Hex';

export default class Layout {
  public orientation: Orientation=Layout.pointy;

  public size: Point= Point.point0;

  public origin: Point= Point.point0;

  constructor(s: { orientation: Orientation, size: Point, origin: Point }) {
    Object.assign(this, s);
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

  public hexToPixel(h: Hex): Point {
    const M: Orientation = this.orientation;
    const { size } = this;
    const { origin } = this;
    const x: number = (M.f0 * h.q + M.f1 * h.r) * size.x;
    const y: number = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return new Point({ x: x + origin.x, y: y + origin.y });
  }

  public pixelToHex(p: Point): Hex {
    const M: Orientation = this.orientation;
    const { size } = this;
    const { origin } = this;
    const pt: Point = new Point({ x: (p.x - origin.x) / size.x, y: (p.y - origin.y) / size.y });
    const q: number = M.b0 * pt.x + M.b1 * pt.y;
    const r: number = M.b2 * pt.x + M.b3 * pt.y;
    const s = -q - r;
    return new Hex({ q, r, s });
  }

  public hexCornerOffset(corner: number): Point {
    const M: Orientation = this.orientation;
    const { size } = this;
    const angle: number = (2.0 * Math.PI * (M.startAngle - corner)) / 6.0;
    return new Point({ x: size.x * Math.cos(angle), y: size.y * Math.sin(angle) });
  }

  public polygonCorners(h: Hex): Point[] {
    const corners: Point[] = [];
    const center: Point = this.hexToPixel(h);
    for (let i = 0; i < 6; i += 1) {
      const offset: Point = this.hexCornerOffset(i);
      corners.push(new Point({ x: center.x + offset.x, y: center.y + offset.y }));
    }
    return corners;
  }
}
