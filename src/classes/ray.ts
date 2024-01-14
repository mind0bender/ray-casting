import P5, { Vector } from "p5";
import Player from "./player";

export interface RayOptions {
  player: Player;
  direction: Vector;
}

export default class Ray {
  private p5: P5;
  private player: Player;
  private direction: Vector;
  constructor(p5: P5, { player, direction }: RayOptions) {
    this.p5 = p5;
    this.player = player;
    this.direction = direction;
  }
  show() {
    const towards: Vector = this.player.pos
      .copy()
      .add(this.direction.normalize().mult(this.player.getMass() * 2));
    this.p5.strokeWeight(2);
    this.p5.point(towards);
    this.p5.strokeWeight(1);
    this.p5.line(this.player.pos.x, this.player.pos.y, towards.x, towards.y);
  }
}
