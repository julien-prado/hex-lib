export default class Orientation {
  public f0: number=0;

  public f1: number=0;

  public f2: number=0;

  public f3: number=0;

  public b0: number=0;

  public b1: number=0;

  public b2: number=0;

  public b3: number=0;

  public startAngle: number=0;

  constructor({
    f0 = 0, f1 = 0, f2 = 0, f3 = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0, startAngle = 0,
  } = {}) {
    Object.assign(this, {
      f0, f1, f2, f3, b0, b1, b2, b3, startAngle,
    });
  }
}
