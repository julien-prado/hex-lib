import Hex from './Hex';

export default class OffsetCoord {
  public col: number=0;

  public row: number=0;

  constructor({ col = 0, row = 0 } = {}) {
    Object.assign(this, { col, row });
  }

  public static EVEN: number = 1;

  public static ODD: number = -1;

  public static qoffsetFromCube(offset: number, { q = 0, r = 0 } = {}): OffsetCoord {
    const col: number = q;
    const row: number = r + (q + offset * (q || 1)) / 2;
    if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
      throw new Error('offset must be EVEN (+1) or ODD (-1)');
    }
    return new OffsetCoord({ col, row });
  }

  public static qoffsetToCube(offset: number, { col = 0, row = 0 } = {}): Hex {
    const q: number = col;
    const r: number = row - (col + offset * (col || 1)) / 2;
    const s: number = -q - r;
    if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
      throw new Error('offset must be EVEN (+1) or ODD (-1)');
    }
    return new Hex({ q, r, s });
  }

  public static roffsetFromCube(offset: number, { q = 0, r = 0 } = {}): OffsetCoord {
    const col: number = q + (r + offset * (r || 1)) / 2;
    const row: number = r;
    if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
      throw new Error('offset must be EVEN (+1) or ODD (-1)');
    }
    return new OffsetCoord({ col, row });
  }

  public static roffsetToCube(offset: number, { col = 0, row = 0 } = {}): Hex {
    const q: number = col - (row + offset * (row || 1)) / 2;
    const r: number = row;
    const s: number = -q - r;
    if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
      throw new Error('offset must be EVEN (+1) or ODD (-1)');
    }
    return new Hex({ q, r, s });
  }
}
