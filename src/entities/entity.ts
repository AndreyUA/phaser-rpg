import Phaser from "phaser";

export class Entity extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type?: string
  ) {
    super(scene, x, y, "player");

    this.scene = scene;
    this.scene.add.existing(this);
  }
}
