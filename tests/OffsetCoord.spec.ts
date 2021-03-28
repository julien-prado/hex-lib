import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Hex, OffsetCoord } from '../src';

describe('OffsetCoord', () => {
  const a:Hex = new Hex({ q: 3, r: 4 });
  const b:OffsetCoord = new OffsetCoord({ col: 1, row: -3 });
  it('conversion_roundtrip even-q', () => {
    expect(OffsetCoord.qoffsetToCube(OffsetCoord.EVEN,
      OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a)))
      .to.eql(a);
  });
  it('conversion_roundtrip even-q', () => {
    expect(OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN,
      OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b)))
      .to.eql(b);
  });
  it('conversion_roundtrip odd-q', () => {
    expect(OffsetCoord.qoffsetToCube(OffsetCoord.ODD,
      OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a)))
      .to.eql(a);
  });
  it('conversion_roundtrip odd-q', () => {
    expect(OffsetCoord.qoffsetFromCube(OffsetCoord.ODD,
      OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b)))
      .to.eql(b);
  });
  it('conversion_roundtrip even-r', () => {
    expect(OffsetCoord.roffsetToCube(OffsetCoord.EVEN,
      OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a)))
      .to.eql(a);
  });
  it('conversion_roundtrip even-r', () => {
    expect(OffsetCoord.roffsetFromCube(OffsetCoord.EVEN,
      OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b)))
      .to.eql(b);
  });
  it('conversion_roundtrip odd-r', () => {
    expect(OffsetCoord.roffsetToCube(OffsetCoord.ODD,
      OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a)))
      .to.eql(a);
  });
  it('conversion_roundtrip odd-r', () => {
    expect(OffsetCoord.roffsetFromCube(OffsetCoord.ODD,
      OffsetCoord.roffsetToCube(OffsetCoord.ODD, b)))
      .to.eql(b);
  });
  it('offset_from_cube even-q', () => {
    expect(OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new Hex({ q: 1, r: 2 })))
      .to.eql(new OffsetCoord({ col: 1, row: 3 }));
  });
  it('offset_from_cube odd-q', () => {
    expect(OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new Hex({ q: 1, r: 2 })))
      .to.eql(new OffsetCoord({ col: 1, row: 2 }));
  });
  it('offset_to_cube even-', () => {
    expect(OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord({ col: 1, row: 3 })))
      .to.eql(new Hex({ q: 1, r: 2 }));
  });
  it('offset_to_cube odd-q', () => {
    expect(OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord({ col: 1, row: 2 })))
      .to.eql(new Hex({ q: 1, r: 2 }));
  });
});
