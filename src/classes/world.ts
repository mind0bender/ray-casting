import P5 from "p5";
import Player from "./player";
import Wall, { getBoundaryWalls, getRandomWallOptions } from "./wall";

export default class World {
  private p5: P5;
  public isPaused: boolean;
  private player: Player;
  private frictionCoeff = 0.9;
  private walls: Wall[];
  private high: boolean;

  constructor(p5: P5, high: boolean = false) {
    this.p5 = p5;
    this.isPaused = true;
    this.high = high;
    this.player = new Player(
      this.p5,
      {
        frictionCoeff: this.frictionCoeff,
        world: this,
      },
      this.high
    );
    this.walls = [...getBoundaryWalls(this.p5)];
    for (let i = 0; i < 5; i++) {
      const wall = new Wall(this.p5, getRandomWallOptions(this.p5));
      this.walls.push(wall);
    }
  }

  run(): void {
    this.isPaused = false;
  }
  update(): void {
    if (this.isPaused) return;
    this.player.update();
  }
  show(): void {
    this.player.show();
    this.walls.forEach((wall: Wall) => wall.show());
  }
  detectCollision() {
    this.player.detectCollision();
  }
  movePlayer(): void {
    const mousePos = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
    if (mousePos.mag()) {
      this.player.move(mousePos.sub(this.player.pos));
    }
  }
  stop(): void {
    this.isPaused = true;
  }
  getWalls(): Wall[] {
    return this.walls;
  }
}
