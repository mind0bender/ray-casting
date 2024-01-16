import P5 from "p5";
import Ray, { Collision } from "../classes/ray";
import World from "../classes/world";

export default function getReflectedRay(
  p5: P5,
  world: World,
  ray: Ray,
  collision: Collision
): Ray {
  const { pos, wall } = collision;
  const normal = wall.getNormal();
  const reflectedDirection = ray
    .getDirection()
    .copy()
    .sub(normal.copy().mult(2 * ray.getDirection().dot(normal)));
  const reflectedRay = new Ray(
    p5,
    {
      world,
      pos: pos.copy().add(reflectedDirection.copy().mult(-0.1)),
      direction: reflectedDirection,
      intensity: ray.getIntensity() * collision.wall.getReflectionCoeff(),
    },
    ray.reflectionCount + 1
  );
  return reflectedRay;
}
