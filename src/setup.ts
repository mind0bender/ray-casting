import P5 from "p5";
import World from "./classes/world";

export let world: World;

export default function setup(p5: P5) {
  p5.createCanvas(window.innerWidth, window.innerHeight);
  window.addEventListener("resize", () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  });
  p5.background(0);
  p5.noStroke();
  p5.fill(255);
  p5.rect(100, 100, 100, 100);
  world = new World(p5);
  world.run();
}
