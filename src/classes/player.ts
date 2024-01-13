import P5, { Vector } from "p5";

export default class Player {
  private p5: P5;
  public pos: Vector;
  private vel: Vector;
  private mass: number;

  constructor(p5: P5) {
    this.p5 = p5;
    this.pos = this.p5.createVector(
      p5.random(0, p5.width),
      p5.random(0, p5.height)
    );
    // this.vel = this.p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.vel = this.p5.createVector(0, 0);
    this.mass = 10;
  }
  show() {
    this.p5.fill(255);
    this.p5.circle(this.pos.x, this.pos.y, this.mass);
  }
  update() {
    this.pos.add(this.vel);
  }
  move(force: Vector) {
    this.vel.add(force.div(this.mass).normalize());
    this.vel.limit(8);
  }
}
