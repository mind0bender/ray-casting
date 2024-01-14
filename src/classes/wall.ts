import P5, { Vector } from "p5";

export interface WallOptions {
  pos1: Vector;
  pos2: Vector;
}

export function getRandomWallOptions(p5: P5): WallOptions {
  return {
    pos1: p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)),
    pos2: p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)),
  };
}

export function getBoundaryWalls(p5: P5) {
  return [
    new Wall(p5, {
      pos1: p5.createVector(0, 0),
      pos2: p5.createVector(p5.width, 0),
    }),
    new Wall(p5, {
      pos1: p5.createVector(p5.width, 0),
      pos2: p5.createVector(p5.width, p5.height),
    }),
    new Wall(p5, {
      pos1: p5.createVector(p5.width, p5.height),
      pos2: p5.createVector(0, p5.height),
    }),
    new Wall(p5, {
      pos1: p5.createVector(0, p5.height),
      pos2: p5.createVector(0, 0),
    }),
  ];
}

export default class Wall {
  p5: P5;
  pos1: Vector;
  pos2: Vector;
  constructor(p5: P5, { pos1, pos2 }: WallOptions) {
    this.p5 = p5;
    this.pos1 = pos1;
    this.pos2 = pos2;
  }
  show() {
    this.p5.stroke(150);
    this.p5.strokeWeight(2);
    this.p5.line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
  }
}
