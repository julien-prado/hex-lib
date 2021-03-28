export default class Hex {
  public q: number;

  public r: number;

  public s: number;

  constructor({ q = 0, r = 0, s = -q - r } = {}) {
    if (Math.round(q + r + s) !== 0) throw new Error('q + r + s must be 0');
    Object.assign(this, { q, r, s });
  }

  public add({ q = 0, r = 0, s = 0 } = {}): Hex {
    return new Hex({ q: this.q + q, r: this.r + r, s: this.s + s });
  }

  public subtract({ q = 0, r = 0, s = 0 } = {}): Hex {
    return new Hex({ q: this.q - q, r: this.r - r, s: this.s - s });
  }

  public scale(k: number): Hex {
    return new Hex({ q: this.q * k, r: this.r * k, s: this.s * k });
  }

  public rotateLeft(): Hex {
    return new Hex({ q: -this.s, r: -this.q, s: -this.r });
  }

  public rotateRight(): Hex {
    return new Hex({ q: -this.r, r: -this.s, s: -this.q });
  }

  public static directions: Hex[] = [
    new Hex({ q: 1, r: 0, s: -1 }),
    new Hex({ q: 1, r: -1, s: 0 }),
    new Hex({ q: 0, r: -1, s: 1 }),
    new Hex({ q: -1, r: 0, s: 1 }),
    new Hex({ q: -1, r: 1, s: 0 }),
    new Hex({ q: 0, r: 1, s: -1 }),
  ];

  public static direction(direction: number): Hex {
    return Hex.directions[direction];
  }

  public neighbor(direction: number): Hex {
    return this.add(Hex.direction(direction));
  }

  public static diagonals: Hex[] = [
    new Hex({ q: 2, r: -1, s: -1 }),
    new Hex({ q: 1, r: -2, s: 1 }),
    new Hex({ q: -1, r: -1, s: 2 }),
    new Hex({ q: -2, r: 1, s: 1 }),
    new Hex({ q: -1, r: 2, s: -1 }),
    new Hex({ q: 1, r: 1, s: -2 }),
  ];

  public diagonalNeighbor(direction: number): Hex {
    return this.add(Hex.diagonals[direction]);
  }

  public len(): number {
    return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
  }

  public distance({ q = 0, r = 0, s = 0 } = {}): number {
    return this.subtract({ q, r, s }).len();
  }

  public round(): Hex {
    let q: number = Math.round(this.q);
    let r: number = Math.round(this.r);
    let s: number = Math.round(this.s);
    const qDiff: number = Math.abs(q - this.q);
    const rDiff: number = Math.abs(r - this.r);
    const sDiff: number = Math.abs(s - this.s);
    if (qDiff > rDiff && qDiff > sDiff) {
      q = -r - s;
    } else if (rDiff > sDiff) {
      r = -q - s;
    } else {
      s = -q - r;
    }
    return new Hex({ q, r, s });
  }

  public lerp({ q = 0, r = 0, s = 0 } = {}, t: number): Hex {
    return new Hex(
      {
        q: this.q * (1.0 - t) + q * t,
        r: this.r * (1.0 - t) + r * t,
        s: this.s * (1.0 - t) + s * t,
      },
    );
  }

  public linedraw({ q = 0, r = 0, s = 0 } = {}): Hex[] {
    const N: number = this.distance({ q, r, s });
    const aNudge: Hex = new Hex({ q: this.q + 1e-06, r: this.r + 1e-06, s: this.s - 2e-06 });
    const bNudge: Hex = new Hex({ q: q + 1e-06, r: r + 1e-06, s: s - 2e-06 });
    const results: Hex[] = [];
    const step: number = 1.0 / Math.max(N, 1);
    for (let i = 0; i <= N; i += 1) {
      results.push(aNudge.lerp(bNudge, step * i).round());
    }
    return results;
  }

  public static ZERO = new Hex();
}
