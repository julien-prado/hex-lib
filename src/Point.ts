export default class Point {
  public x: number = 0;

  public y: number=0;

  constructor(s: { x: number, y: number }) {
    Object.assign(this, s);
  }

  public static point0 = new Point({ x: 0, y: 0 });
}
