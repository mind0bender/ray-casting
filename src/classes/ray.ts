import P5, { Vector } from "p5";
import World from "./world";
import Wall from "./wall";
import { Line, intersection } from "../helpers/line";

export interface RayOptions {
  world: World;
  pos: Vector;
  direction: Vector;
  intensity?: number;
}

export interface Collision {
  pos: Vector;
  wall: Wall;
}

export default class Ray {
  private p5: P5;
  private pos: Vector;
  private direction: Vector;
  private world: World;
  private intensity: number;
  public reflectionCount: number;
  constructor(
    p5: P5,
    { world, pos, direction, intensity = 0.4 }: RayOptions,
    reflectionCount: number = 0
  ) {
    this.world = world;
    this.p5 = p5;
    this.pos = pos;
    this.direction = direction.normalize();
    this.p5.frameCount;
    this.intensity = intensity;

    this.reflectionCount = reflectionCount;
  }
  collidesAt(): Collision | null {
    let nearestCollision: Vector | null = null;
    let nearestCollisionDist: number = Infinity;
    let nearestCollisionWall: Wall | null = null;
    this.world.getWalls().forEach((wall: Wall) => {
      const currentCollision: Vector | false = intersection(
        wall.getLine(),
        this.getLine()
      );
      if (currentCollision) {
        const currectDistance: number = currentCollision
          .copy()
          .sub(this.pos)
          .mag();
        if (currectDistance <= nearestCollisionDist) {
          nearestCollisionDist = currentCollision.copy().sub(this.pos).mag();
          nearestCollision = currentCollision;
          nearestCollisionWall = wall;
        }
      }
    });
    if (!nearestCollision || !nearestCollisionWall) return null;
    return {
      pos: nearestCollision,
      wall: nearestCollisionWall,
    };
  }
  getDirection() {
    return this.direction;
  }
  getLine(): Line {
    return {
      start: this.pos,
      end: this.pos.copy().add(this.direction),
    };
  }
  getIntensity(): number {
    return this.intensity;
  }
}
