import { Elwynn } from "../scenes/elwynn";
import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Enemy extends Entity {
  constructor(
    scene: Elwynn,
    x: number,
    y: number,
    texture: string,
    type?: string
  ) {
    super(scene, x, y, texture, SPRITES.BOAR.base);
  }
}
