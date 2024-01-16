import P5 from "p5";
import World from "./classes/world";

export let world: World;

export default function setup(p5: P5) {
  p5.createCanvas(window.innerWidth, window.innerHeight);
  window.addEventListener("resize", () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  });

  const url = new URL(location.href);
  const isHigh: boolean = url.searchParams.get("high") === "true";

  world = new World(p5, isHigh);
  world.run();
}
