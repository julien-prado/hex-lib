"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hex_1 = __importDefault(require("./Hex"));
class DoubledCoord {
    constructor(s) {
        this.col = 0;
        this.row = 0;
        Object.assign(this, s);
    }
    static qdoubledFromCube(h) {
        const col = h.q;
        const row = 2 * h.r + h.q;
        return new DoubledCoord({ col, row });
    }
    qdoubledToCube() {
        const q = this.col;
        const r = (this.row - this.col) / 2;
        const s = -q - r;
        return new Hex_1.default({ q, r, s });
    }
    static rdoubledFromCube(h) {
        const col = 2 * h.q + h.r;
        const row = h.r;
        return new DoubledCoord({ col, row });
    }
    rdoubledToCube() {
        const q = (this.col - this.row) / 2;
        const r = this.row;
        const s = -q - r;
        return new Hex_1.default({ q, r, s });
    }
}
exports.default = DoubledCoord;
