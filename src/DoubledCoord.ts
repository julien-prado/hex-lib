import Hex from './Hex';

export default class DoubledCoord {
  public col: number=0;

  public row: number=0;

  constructor({ col = 0, row = 0 } = {}) {
    Object.assign(this, { col, row });
  }

  public static qdoubledFromCube({ q = 0, r = 0 } = {}): DoubledCoord {
    const col: number = q;
    const row: number = 2 * r + q;
    return new DoubledCoord({ col, row });
  }

  public qdoubledToCube(): Hex {
    const q: number = this.col;
    const r: number = (this.row - this.col) / 2;
    const s: number = -q - r;
    return new Hex({ q, r, s });
  }

  public static rdoubledFromCube({ q = 0, r = 0 } = {}): DoubledCoord {
    const col: number = 2 * q + r;
    const row: number = r;
    return new DoubledCoord({ col, row });
  }

  public rdoubledToCube(): Hex {
    const q: number = (this.col - this.row) / 2;
    const r: number = this.row;
    const s: number = -q - r;
    return new Hex({ q, r, s });
  }
}
