import { Durotar } from "../scenes/durotar";
import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Player extends Entity {
  keys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  textureKey: string | null = null;

  constructor(scene: Durotar, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.PLAYER);

    if (!this.scene.input.keyboard) {
      return;
    }

    this.keys = this.scene.input.keyboard.createCursorKeys();
    const animations = this.scene.anims;
    const animationFrameRate = 9;
    this.textureKey = texture;

    animations.create({
      key: "down",
      frames: animations.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animationFrameRate,
      repeat: -1,
    });
    animations.create({
      key: "left",
      frames: animations.generateFrameNumbers(this.textureKey, {
        start: 12,
        end: 14,
      }),
      frameRate: animationFrameRate,
      repeat: -1,
    });
    animations.create({
      key: "right",
      frames: animations.generateFrameNumbers(this.textureKey, {
        start: 24,
        end: 26,
      }),
      frameRate: animationFrameRate,
      repeat: -1,
    });
    animations.create({
      key: "up",
      frames: animations.generateFrameNumbers(this.textureKey, {
        start: 36,
        end: 38,
      }),
      frameRate: animationFrameRate,
      repeat: -1,
    });
  }

  update(delta: number): void {
    if (!this.keys) {
      return;
    }

    if (
      this.keys.left.isUp &&
      this.keys.right.isUp &&
      this.keys.up.isUp &&
      this.keys.down.isUp
    ) {
      this.anims.stop();

      return;
    }

    const coordinatesChangesWithDelta = delta / 4;

    if (this.keys.left.isDown) {
      this.x -= coordinatesChangesWithDelta;
      this.anims.play("left", true);
    }

    if (this.keys.right.isDown) {
      this.x += coordinatesChangesWithDelta;
      this.anims.play("right", true);
    }

    if (this.keys.up.isDown) {
      this.y -= coordinatesChangesWithDelta;
      this.anims.play("up", true);
    }

    if (this.keys.down.isDown) {
      this.y += coordinatesChangesWithDelta;
      this.anims.play("down", true);
    }
  }
}
