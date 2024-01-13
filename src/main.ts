import draw from "./draw";
import setup from "./setup";
import "./style.css";
import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
    setup(p5);
  };

  p5.draw = () => {
    draw(p5);
  };
};

new P5(sketch);
