import Phaser from "phaser";

import { Elwynn } from "../scenes/elwynn";

export class Entity extends Phaser.Physics.Arcade.Sprite {
  health: number = 100;

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

  takeDamage(damage: number): void {
    if (this.health > 0) {
      this.health -= damage;
    }
  }
}
