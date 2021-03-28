import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Hex, Layout, Point } from '../src';

describe('Layout', () => {
  it('layout flat', () => {
    const h: Hex = new Hex({ q: 3, r: 4 });
    const flat: Layout = new Layout({
      orientation: Layout.flat,
      size: new Point({ x: 10.0, y: 15.0 }),
      origin: new Point({ x: 35.0, y: 71.0 }),
    });
    expect(flat.pixelToHex(flat.hexToPixel(h)).round()).to.eql(h);
  });
  it('layout pointy', () => {
    const h: Hex = new Hex({ q: 3, r: 4 });
    const pointy:Layout = new Layout({
      orientation: Layout.pointy,
      size: new Point({ x: 10.0, y: 15.0 }),
      origin: new Point({ x: 35.0, y: 71.0 }),
    });
    expect(pointy.pixelToHex(pointy.hexToPixel(h)).round()).to.eql(h);
  });
});
