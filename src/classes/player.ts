import P5, { Vector } from "p5";
import Ray from "./ray";
import World from "./world";

export default class Player {
  private p5: P5;
  public pos: Vector;
  private vel: Vector;
  private mass: number;
  private frictionCoeff: number;
  private rays: Ray[];
  private world: World;

  constructor(
    p5: P5,
    {
      frictionCoeff,
      world,
    }: {
      frictionCoeff: number;
      world: World;
    }
  ) {
    this.p5 = p5;
    this.world = world;
    this.pos = this.p5.createVector(
      p5.random(0, p5.width),
      p5.random(0, p5.height)
    );
    // this.vel = this.p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.vel = this.p5.createVector(0, 0);
    this.frictionCoeff = frictionCoeff;
    this.mass = 20;
    this.rays = [];
    for (let a = 0; a < 360; a += 3) {
      const direction: Vector = Vector.fromAngle((a * this.p5.TWO_PI) / 360);
      const ray = new Ray(p5, {
        world: this.world,
        player: this,
        direction,
      });
      this.rays.push(ray);
    }
  }
  show() {
    this.p5.fill(0);
    this.p5.stroke(255);
    this.p5.circle(this.pos.x, this.pos.y, this.mass / 2);
    // this.p5.line(this.pos.x, this.pos.y, this.p5.mouseX, this.p5.mouseY);
  }
  detectCollision() {
    this.rays.forEach((ray: Ray) => {
      const nearestCollision: Vector | null = ray.collidesAt();
      if (nearestCollision) {
        this.p5.strokeWeight(1);
        this.p5.stroke(255);
        this.p5.line(
          this.pos.x,
          this.pos.y,
          nearestCollision.x,
          nearestCollision.y
        );
      }
    });
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
