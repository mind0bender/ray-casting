import P5, { Vector } from "p5";
import Ray from "./ray";

export default class Player {
  private p5: P5;
  public pos: Vector;
  private vel: Vector;
  private mass: number;
  private frictionCoeff: number;
  private rays: Ray[];

  constructor(
    p5: P5,
    {
      frictionCoeff,
    }: {
      frictionCoeff: number;
    }
  ) {
    this.p5 = p5;
    this.pos = this.p5.createVector(
      p5.random(0, p5.width),
      p5.random(0, p5.height)
    );
    // this.vel = this.p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.vel = this.p5.createVector(0, 0);
    this.frictionCoeff = frictionCoeff;
    this.mass = 20;
    this.rays = [];
    for (let a = 0; a < 360; a += 10) {
      const direction: Vector = Vector.fromAngle((a * this.p5.TWO_PI) / 360);
      const ray = new Ray(p5, {
        player: this,
        direction,
      });
      this.rays.push(ray);
    }
  }
  show() {
    this.p5.fill(255);
    this.p5.stroke(255);
    this.p5.circle(this.pos.x, this.pos.y, (this.mass * 2) / 3);
    // this.p5.line(this.pos.x, this.pos.y, this.p5.mouseX, this.p5.mouseY);
    this.rays.forEach((ray: Ray) => ray.show());
  }
  update() {
    this.pos.add(this.vel);
  }
  move(force: Vector) {
    this.vel.add(force.div(this.mass));
    this.vel.limit(this.mass);
    this.vel.mult(this.frictionCoeff);
  }
  getMass() {
    return this.mass;
  }
}
