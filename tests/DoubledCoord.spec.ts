import { describe, it } from 'mocha';
import { expect } from 'chai';
import { DoubledCoord, Hex } from '../src';

describe('DoubledCoord', () => {
  it('doubled_to_cube doubled-q', () => {
    expect(new DoubledCoord({ col: 1, row: 5 }).qdoubledToCube())
      .to.eql(new Hex({ q: 1, r: 2, s: -3 }));
  });
  it('doubled_to_cube doubled-r', () => {
    expect(new DoubledCoord({ col: 4, row: 2 }).rdoubledToCube())
      .to.eql(new Hex({ q: 1, r: 2, s: -3 }));
  });
  it('doubled_from_cube doubled-q', () => {
    expect(DoubledCoord.qdoubledFromCube(new Hex({ q: 1, r: 2, s: -3 })))
      .to.eql(new DoubledCoord({ col: 1, row: 5 }));
  });
  it('doubled_from_cube doubled-r', () => {
    expect(DoubledCoord.rdoubledFromCube(new Hex({ q: 1, r: 2, s: -3 })))
      .to.eql(new DoubledCoord({ col: 4, row: 2 }));
  });
  const a:Hex = new Hex({ q: 3, r: 4 });
  const b:DoubledCoord = new DoubledCoord({ col: 1, row: -3 });
  it('conversion_roundtrip doubled-q', () => {
    expect(DoubledCoord.qdoubledFromCube(a).qdoubledToCube())
      .to.eql(a);
  });
  it('conversion_roundtrip doubled-q', () => {
    expect(DoubledCoord.qdoubledFromCube(b.qdoubledToCube()))
      .to.eql(b);
  });
  it('conversion_roundtrip doubled-r', () => {
    expect(DoubledCoord.rdoubledFromCube(a).rdoubledToCube())
      .to.eql(a);
  });
  it('conversion_roundtrip doubled-r', () => {
    expect(DoubledCoord.rdoubledFromCube(b.rdoubledToCube()))
      .to.eql(b);
  });
});
