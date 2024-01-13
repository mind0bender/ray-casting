import P5 from "p5";
import Player from "./player";

export default class World {
  private p5: P5;
  public isPaused: boolean;
  private player: Player;

  constructor(p5: P5) {
    this.p5 = p5;
    this.isPaused = true;
    this.player = new Player(this.p5);
  }

  run() {
    this.isPaused = false;
  }

  update() {
    if (this.isPaused) return;
    this.player.update();
  }
  show() {
    this.p5.background(0);
    this.player.show();
  }
  movePlayer() {
    this.player.move(
      this.p5.createVector(this.p5.mouseX, this.p5.mouseY).sub(this.player.pos)
    );
  }
  stop() {
    this.isPaused = true;
  }
}
