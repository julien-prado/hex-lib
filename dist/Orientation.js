export default class Orientation {
    constructor({ f0 = 0, f1 = 0, f2 = 0, f3 = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0, startAngle = 0, } = {}) {
        this.f0 = 0;
        this.f1 = 0;
        this.f2 = 0;
        this.f3 = 0;
        this.b0 = 0;
        this.b1 = 0;
        this.b2 = 0;
        this.b3 = 0;
        this.startAngle = 0;
        Object.assign(this, {
            f0, f1, f2, f3, b0, b1, b2, b3, startAngle,
        });
    }
}
