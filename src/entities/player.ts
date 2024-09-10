import { Elwynn } from "../scenes/elwynn";
import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Player extends Entity {
  scene: Elwynn;
  keys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  textureKey: string | null = null;
  enemies: Array<Entity> = [];
  private readonly moveSpeed = 10;

  constructor(scene: Elwynn, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.PLAYER);

    this.scene = scene;

    if (!this.scene.input.keyboard) {
      return;
    }

    this.keys = this.scene.input.keyboard.createCursorKeys();
    const animations = this.scene.anims;
    const animationFrameRate = 9;
    this.textureKey = texture;

    // Set the size and offset of the player to make the collisions more accurate
    this.setSize(28, 32);
    this.setOffset(10, 16);
    // Reduce player's size
    this.setScale(0.8);

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

    this.initKeysListeners();
  }

  attack(target: Entity): void {
    const distanceToEnemy = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      target.x,
      target.y
    );

    if (distanceToEnemy < 50) {
      target.takeDamage(25);
    }
  }

  setEnemies(enemies: Array<Entity>): void {
    this.enemies = enemies;
  }

  private initKeysListeners(): void {
    this.scene.input.keyboard!.on("keydown-SPACE", () => {
      const target = this.findTarget(this.enemies);
      this.attack(target);
    });
  }

  private findTarget(enemies: Array<Entity>): Entity {
    const nearestEnemy = enemies.reduce((nearest: Entity, current: Entity) => {
      const distanceToCurrent = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        current.x,
        current.y
      );

      const distanceToNearest = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        nearest.x,
        nearest.y
      );

      if (distanceToCurrent < distanceToNearest) {
        return current;
      }

      return nearest;
    }, enemies[0]);

    return nearestEnemy;
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
      this.setVelocity(0, 0);
      this.anims.stop();

      return;
    }

    // const coordinatesChangesWithDelta = delta / 4;

    if (this.keys.left.isDown) {
      // this.x -= coordinatesChangesWithDelta;
      this.setVelocity(-delta * this.moveSpeed, 0);
      this.anims.play("left", true);
    }

    if (this.keys.right.isDown) {
      // this.x += coordinatesChangesWithDelta;
      this.setVelocity(delta * this.moveSpeed, 0);
      this.anims.play("right", true);
    }

    if (this.keys.up.isDown) {
      // this.y -= coordinatesChangesWithDelta;
      this.setVelocity(0, -delta * this.moveSpeed);
      this.anims.play("up", true);
    }

    if (this.keys.down.isDown) {
      // this.y += coordinatesChangesWithDelta;
      this.setVelocity(0, delta * this.moveSpeed);
      this.anims.play("down", true);
    }
  }
}
