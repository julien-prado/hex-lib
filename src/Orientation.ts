
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

  constructor(s: Orientation) {
    Object.assign(this, s);
  }
}
