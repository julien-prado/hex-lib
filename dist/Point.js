export default class Point {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = 0;
        this.y = 0;
        Object.assign(this, { x, y });
    }
}
Point.ZERO = new Point({ x: 0, y: 0 });
