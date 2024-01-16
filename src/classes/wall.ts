import P5, { Vector } from "p5";
import { Line } from "../helpers/line";

export interface WallOptions {
  pos1: Vector;
  pos2: Vector;
  reflectionCoeff?: number;
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
  private p5: P5;
  private start: Vector;
  private end: Vector;
  private reflectionCoeff: number;
  constructor(p5: P5, { pos1, pos2, reflectionCoeff = 0.7 }: WallOptions) {
    this.p5 = p5;
    this.start = pos1;
    this.end = pos2;
    this.reflectionCoeff = reflectionCoeff;
  }
  show() {
    this.p5.strokeWeight(2);
    this.p5.stroke(255, 0, 0);
    this.p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  getLine(): Line {
    return {
      start: this.start,
      end: this.end,
    };
  }
  getNormal(): Vector {
    const line = this.getLine();
    const normal = line.end
      .copy()
      .sub(line.start)
      .normalize()
      .rotate(this.p5.HALF_PI);
    return normal;
  }
  getReflectionCoeff(): number {
    return this.reflectionCoeff;
  }
}
