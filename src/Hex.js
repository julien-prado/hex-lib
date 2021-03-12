"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hex {
    constructor(s) {
        this.q = 0;
        this.r = 0;
        this.s = 0;
        if (Math.round(s.q + s.r + s.s) !== 0)
            throw new Error('q + r + s must be 0');
        Object.assign(this, s);
    }
    add(b) {
        return new Hex({ q: this.q + b.q, r: this.r + b.r, s: this.s + b.s });
    }
    subtract(b) {
        return new Hex({ q: this.q - b.q, r: this.r - b.r, s: this.s - b.s });
    }
    scale(k) {
        return new Hex({ q: this.q * k, r: this.r * k, s: this.s * k });
    }
    rotateLeft() {
        return new Hex({ q: -this.s, r: -this.q, s: -this.r });
    }
    rotateRight() {
        return new Hex({ q: -this.r, r: -this.s, s: -this.q });
    }
    static direction(direction) {
        return Hex.directions[direction];
    }
    neighbor(direction) {
        return this.add(Hex.direction(direction));
    }
    diagonalNeighbor(direction) {
        return this.add(Hex.diagonals[direction]);
    }
    len() {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }
    distance(b) {
        return this.subtract(b).len();
    }
    round() {
        let q = Math.round(this.q);
        let r = Math.round(this.r);
        let s = Math.round(this.s);
        const qDiff = Math.abs(q - this.q);
        const rDiff = Math.abs(r - this.r);
        const sDiff = Math.abs(s - this.s);
        if (qDiff > rDiff && qDiff > sDiff) {
            q = -r - s;
        }
        else if (rDiff > sDiff) {
            r = -q - s;
        }
        else {
            s = -q - r;
        }
        return new Hex({ q, r, s });
    }
    lerp(b, t) {
        return new Hex({
            q: this.q * (1.0 - t) + b.q * t,
            r: this.r * (1.0 - t) + b.r * t,
            s: this.s * (1.0 - t) + b.s * t,
        });
    }
    linedraw(b) {
        const N = this.distance(b);
        const aNudge = new Hex({ q: this.q + 1e-06, r: this.r + 1e-06, s: this.s - 2e-06 });
        const bNudge = new Hex({ q: b.q + 1e-06, r: b.r + 1e-06, s: b.s - 2e-06 });
        const results = [];
        const step = 1.0 / Math.max(N, 1);
        for (let i = 0; i <= N; i += 1) {
            results.push(aNudge.lerp(bNudge, step * i).round());
        }
        return results;
    }
}
exports.default = Hex;
Hex.directions = [
    new Hex({ q: 1, r: 0, s: -1 }),
    new Hex({ q: 1, r: -1, s: 0 }),
    new Hex({ q: 0, r: -1, s: 1 }),
    new Hex({ q: -1, r: 0, s: 1 }),
    new Hex({ q: -1, r: 1, s: 0 }),
    new Hex({ q: 0, r: 1, s: -1 }),
];
Hex.diagonals = [
    new Hex({ q: 2, r: -1, s: -1 }),
    new Hex({ q: 1, r: -2, s: 1 }),
    new Hex({ q: -1, r: -1, s: 2 }),
    new Hex({ q: -2, r: 1, s: 1 }),
    new Hex({ q: -1, r: 2, s: -1 }),
    new Hex({ q: 1, r: 1, s: -2 }),
];
Hex.hex0 = new Hex({ q: 0, r: 0, s: 0 });
