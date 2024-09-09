import Phaser from "phaser";

import { Elwynn } from "../scenes/elwynn";

export class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Elwynn,
    x: number,
    y: number,
    texture: string,
    type?: string
  ) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }
}
