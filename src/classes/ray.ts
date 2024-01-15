import P5, { Vector } from "p5";
import Player from "./player";
import World from "./world";
import Wall from "./wall";
import { Line, intersection } from "../helpers/line";

export interface RayOptions {
  world: World;
  player: Player;
  direction: Vector;
}

export default class Ray {
  private p5: P5;
  private player: Player;
  private direction: Vector;
  private world: World;
  constructor(p5: P5, { world, player, direction }: RayOptions) {
    this.world = world;
    this.p5 = p5;
    this.player = player;
    this.direction = direction.normalize().mult(this.player.getMass() * 2);
  }
  collidesAt(): Vector | null {
    let nearestCollision: Vector | null = null;
    let nearestCollisionDist: number = Infinity;
    this.world.getWalls().forEach((wall: Wall) => {
      const currentCollision: Vector | false = intersection(
        wall.getLine(),
        this.getLine()
      );
      if (currentCollision) {
        const currectDistance: number = currentCollision
          .copy()
          .sub(this.player.pos)
          .mag();
        if (currectDistance <= nearestCollisionDist) {
          nearestCollisionDist = currentCollision
            .copy()
            .sub(this.player.pos)
            .mag();
          nearestCollision = currentCollision;
        }
      }
    });
    return nearestCollision;
  }
  private getLine(): Line {
    return {
      start: this.player.pos,
      end: this.player.pos.copy().add(this.direction),
    };
  }
}
