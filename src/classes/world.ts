import P5 from "p5";
import Player from "./player";
import Wall, { getBoundaryWalls, getRandomWallOptions } from "./wall";

export default class World {
  private p5: P5;
  public isPaused: boolean;
  private player: Player;
  private frictionCoeff = 0.95;
  private walls: Wall[];

  constructor(p5: P5) {
    this.p5 = p5;
    this.isPaused = true;
    this.player = new Player(this.p5, {
      frictionCoeff: this.frictionCoeff,
    });
    this.walls = [...getBoundaryWalls(this.p5)];
    for (let i = 0; i < 5; i++) {
      const wall = new Wall(this.p5, getRandomWallOptions(this.p5));
      this.walls.push(wall);
    }
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
    this.walls.forEach((wall: Wall) => wall.show());
  }
  movePlayer() {
    const mousePos = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);

    if (mousePos.mag()) {
      this.player.move(mousePos.sub(this.player.pos));
    }
  }
  stop() {
    this.isPaused = true;
  }
}
