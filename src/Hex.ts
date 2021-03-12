export default class Hex {
  public q: number=0;

  public r: number=0;

  public s: number=0;

  constructor(s: { q: number, r: number, s: number}) {
    if (Math.round(s.q + s.r + s.s) !== 0) throw new Error('q + r + s must be 0');
    Object.assign(this, s);
  }

  public add(b: Hex): Hex {
    return new Hex({ q: this.q + b.q, r: this.r + b.r, s: this.s + b.s });
  }


  public subtract(b: Hex): Hex {
    return new Hex({ q: this.q - b.q, r: this.r - b.r, s: this.s - b.s });
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

  public distance(b: Hex): number {
    return this.subtract(b).len();
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

  public lerp(b: Hex, t: number): Hex {
    return new Hex(
      {
        q: this.q * (1.0 - t) + b.q * t,
        r: this.r * (1.0 - t) + b.r * t,
        s: this.s * (1.0 - t) + b.s * t,
      },
    );
  }

  public linedraw(b: Hex): Hex[] {
    const N: number = this.distance(b);
    const aNudge: Hex = new Hex({ q: this.q + 1e-06, r: this.r + 1e-06, s: this.s - 2e-06 });
    const bNudge: Hex = new Hex({ q: b.q + 1e-06, r: b.r + 1e-06, s: b.s - 2e-06 });
    const results: Hex[] = [];
    const step: number = 1.0 / Math.max(N, 1);
    for (let i = 0; i <= N; i += 1) {
      results.push(aNudge.lerp(bNudge, step * i).round());
    }
    return results;
  }

  public static hex0 = new Hex({ q: 0, r: 0, s: 0 });
}
