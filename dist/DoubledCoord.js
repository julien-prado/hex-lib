import Hex from './Hex';
export default class DoubledCoord {
    constructor({ col = 0, row = 0 } = {}) {
        this.col = 0;
        this.row = 0;
        Object.assign(this, { col, row });
    }
    static qdoubledFromCube({ q = 0, r = 0 } = {}) {
        const col = q;
        const row = 2 * r + q;
        return new DoubledCoord({ col, row });
    }
    qdoubledToCube() {
        const q = this.col;
        const r = (this.row - this.col) / 2;
        const s = -q - r;
        return new Hex({ q, r, s });
    }
    static rdoubledFromCube({ q = 0, r = 0 } = {}) {
        const col = 2 * q + r;
        const row = r;
        return new DoubledCoord({ col, row });
    }
    rdoubledToCube() {
        const q = (this.col - this.row) / 2;
        const r = this.row;
        const s = -q - r;
        return new Hex({ q, r, s });
    }
}
