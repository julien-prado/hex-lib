"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hex_1 = __importDefault(require("./Hex"));
class OffsetCoord {
    constructor(s) {
        this.col = 0;
        this.row = 0;
        Object.assign(this, s);
    }
    static qoffsetFromCube(offset, h) {
        const col = h.q;
        const row = h.r + (h.q + offset * (h.q || 1)) / 2;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new OffsetCoord({ col, row });
    }
    static qoffsetToCube(offset, h) {
        const q = h.col;
        const r = h.row - (h.col + offset * (h.col || 1)) / 2;
        const s = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new Hex_1.default({ q, r, s });
    }
    static roffsetFromCube(offset, h) {
        const col = h.q + (h.r + offset * (h.r || 1)) / 2;
        const row = h.r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new OffsetCoord({ col, row });
    }
    static roffsetToCube(offset, h) {
        const q = h.col - (h.row + offset * (h.row || 1)) / 2;
        const r = h.row;
        const s = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error('offset must be EVEN (+1) or ODD (-1)');
        }
        return new Hex_1.default({ q, r, s });
    }
}
exports.default = OffsetCoord;
OffsetCoord.EVEN = 1;
OffsetCoord.ODD = -1;
