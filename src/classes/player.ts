import P5, { Vector } from "p5";
import Ray, { Collision } from "./ray";
import World from "./world";
import getReflectedRay from "../helpers/reflection";

export default class Player {
  private p5: P5;
  public pos: Vector;
  private vel: Vector;
  private mass: number;
  private frictionCoeff: number;
  private rays: Ray[];
  private world: World;
  private reflections: Ray[];
  private high: boolean;
  constructor(
    p5: P5,
    {
      frictionCoeff,
      world,
    }: {
      frictionCoeff: number;
      world: World;
    },
    high: boolean = false
  ) {
    this.p5 = p5;
    this.world = world;
    this.high = high;
    this.pos = this.p5.createVector(
      p5.random(0, p5.width),
      p5.random(0, p5.height)
    );
    this.vel = this.p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    // this.vel = this.p5.createVector(0, 0);
    this.frictionCoeff = frictionCoeff;
    this.mass = 20;
    this.rays = [];
    for (let a = 0; a < 360; a += this.high ? 0.5 : 3) {
      const direction: Vector = Vector.fromAngle((a * this.p5.TWO_PI) / 360);
      const ray = new Ray(p5, {
        world: this.world,
        pos: this.pos,
        direction,
        intensity: 0.25,
      });
      this.rays.push(ray);
    }
    this.reflections = [];
  }
  show() {
    this.p5.fill(0);
    this.p5.stroke(255);
    this.p5.circle(this.pos.x, this.pos.y, this.mass / 2);
  }
  detectCollision() {
    this.reflections = [];
    this.rays.forEach((ray: Ray) => {
      let nearestCollision: Collision | null = ray.collidesAt();
      while (nearestCollision && ray.reflectionCount < (this.high ? 10 : 3)) {
        this.p5.strokeWeight(1);
        this.p5.stroke(255, ray.getIntensity() * 255);
        this.p5.line(
          ray.getLine().start.x,
          ray.getLine().start.y,
          nearestCollision.pos.x,
          nearestCollision.pos.y
        );

        const reflectedRay = getReflectedRay(
          this.p5,
          this.world,
          ray,
          nearestCollision
        );
        this.reflections.push(reflectedRay);
        ray = reflectedRay;
        nearestCollision = ray.collidesAt();
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
