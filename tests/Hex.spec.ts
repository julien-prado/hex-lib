import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Hex } from '../src';

describe('Hex', () => {
  it('hex_add', () => {
    expect(new Hex({ q: 1, r: -3 }).add(new Hex({ q: 3, r: -7 })))
      .to.eql(new Hex({ q: 4, r: -10 }));
  });
  it('hex_subtract', () => {
    expect(new Hex({ q: 1, r: -3 }).subtract(new Hex({ q: 3, r: -7 })))
      .to.eql(new Hex({ q: -2, r: 4 }));
  });
  it('hex_direction', () => {
    expect(Hex.direction(2))
      .to.eql(new Hex({ q: 0, r: -1 }));
  });
  it('hex_neighbor', () => {
    expect(new Hex({ q: 1, r: -2 }).neighbor(2))
      .to.eql(new Hex({ q: 1, r: -3 }));
  });
  it('hex_diagonal', () => {
    expect(new Hex({ q: 1, r: -2 }).diagonalNeighbor(3))
      .to.eql(new Hex({ q: -1, r: -1 }));
  });
  it('hex_distance', () => {
    expect(new Hex({ q: 3, r: -7 }).distance(Hex.ZERO))
      .to.equal(7);
  });
  it('hex_rotate_right', () => {
    expect(new Hex({ q: 1, r: -3 }).rotateRight())
      .to.eql(new Hex({ q: 3, r: -2 }));
  });
  it('hex_rotate_left', () => {
    expect(new Hex({ q: 1, r: -3 }).rotateLeft())
      .to.eql(new Hex({ q: -2, r: -1 }));
  });
  it('hex_round 1', () => {
    expect(Hex.ZERO.lerp(new Hex({ q: 10, r: -20 }), 0.5).round())
      .to.eql(new Hex({ q: 5, r: -10 }));
  });
  it('hex_round 2', () => {
    expect(Hex.ZERO.lerp(new Hex({ q: 1, r: -1 }), 0.499).round())
      .to.eql(Hex.ZERO.round());
  });
  it('hex_round 3', () => {
    expect(Hex.ZERO.lerp(new Hex({ q: 1, r: -1 }), 0.501).round())
      .to.eql(new Hex({ q: 1, r: -1 }).round());
  });
  it('hex_round 4', () => {
    const a:Hex = Hex.ZERO;
    const b:Hex = new Hex({ q: 1.0, r: -1.0 });
    const c:Hex = new Hex({ q: 0.0, r: -1.0 });
    expect(new Hex({
      q: a.q * 0.4 + b.q * 0.3 + c.q * 0.3,
      r: a.r * 0.4 + b.r * 0.3 + c.r * 0.3,
    }).round())
      .to.eql(a.round());
  });
  it('hex_round 5', () => {
    const a:Hex = Hex.ZERO;
    const b:Hex = new Hex({ q: 1.0, r: -1.0 });
    const c:Hex = new Hex({ q: 0.0, r: -1.0 });
    expect(new Hex({
      q: a.q * 0.3 + b.q * 0.3 + c.q * 0.4,
      r: a.r * 0.3 + b.r * 0.3 + c.r * 0.4,
    }).round())
      .to.eql(c.round());
  });
  it('hex_linedraw', () => {
    expect(Hex.ZERO.linedraw(new Hex({ q: 1, r: -5 })))
      .to.eql([
        Hex.ZERO,
        new Hex({ q: 0, r: -1 }),
        new Hex({ q: 0, r: -2 }),
        new Hex({ q: 1, r: -3 }),
        new Hex({ q: 1, r: -4 }),
        new Hex({ q: 1, r: -5 }),
      ]);
  });
});
