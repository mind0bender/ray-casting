import P5 from "p5";
import { world } from "./setup";

export default function draw(p5: P5) {
  world.show();
  world.update();
  world.movePlayer();
}
