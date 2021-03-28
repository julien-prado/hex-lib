export default class Point {
  public x: number = 0;

  public y: number=0;

  constructor({ x = 0, y = 0 } = {}) {
    Object.assign(this, { x, y });
  }

  public static ZERO = new Point({ x: 0, y: 0 });
}
