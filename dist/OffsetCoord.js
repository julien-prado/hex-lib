import Hex from './Hex';
export default class OffsetCoord {
    constructor({ col = 0, row = 0 } = {}) {
        this.col = 0;
        this.row = 0;
        Object.assign(this, { col, row });
    }
    static qoffsetFromCube(offset, { q = 0, r = 0 } = {}) {
        const col = q;
        const row = r + (q + offset * (q || 1)) / 2;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new OffsetCoord({ col, row });
    }
    static qoffsetToCube(offset, { col = 0, row = 0 } = {}) {
        const q = col;
        const r = row - (col + offset * (col || 1)) / 2;
        const s = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new Hex({ q, r, s });
    }
    static roffsetFromCube(offset, { q = 0, r = 0 } = {}) {
        const col = q + (r + offset * (r || 1)) / 2;
        const row = r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new OffsetCoord({ col, row });
    }
    static roffsetToCube(offset, { col = 0, row = 0 } = {}) {
        const q = col - (row + offset * (row || 1)) / 2;
        const r = row;
        const s = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new Hex({ q, r, s });
    }
}
OffsetCoord.EVEN = 1;
OffsetCoord.ODD = -1;
