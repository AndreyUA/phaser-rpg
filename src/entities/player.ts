import { Durotar } from "../scenes/durotar";
import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Player extends Entity {
  keys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  constructor(scene: Durotar, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.PLAYER);

    if (!this.scene.input.keyboard) {
      return;
    }
    this.keys = this.scene.input.keyboard.createCursorKeys();
  }

  update(delta: number): void {
    if (!this.keys) {
      return;
    }

    const coordinatesChangesWithDelta = delta / 4;

    if (this.keys.left.isDown) {
      this.x -= coordinatesChangesWithDelta;
    }

    if (this.keys.right.isDown) {
      this.x += coordinatesChangesWithDelta;
    }

    if (this.keys.up.isDown) {
      this.y -= coordinatesChangesWithDelta;
    }

    if (this.keys.down.isDown) {
      this.y += coordinatesChangesWithDelta;
    }
  }
}
