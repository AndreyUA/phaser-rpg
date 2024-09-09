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

    this.cycleTween();
  }

  cycleTween(): void {
    this.scene.tweens.add({
      targets: this,
      duration: 2_000,
      repeat: -1,
      yoyo: true,
      x: this.x + 100,
      onRepeat: () => {
        this.setFlipX(true);
      },
      onYoyo: () => {
        this.setFlipX(false);
      },
    });
  }
}
