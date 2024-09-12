import { Elwynn } from "../scenes/elwynn";
import { SPRITES } from "../utils/constants";
import { Enemy } from "./enemy";
import { Entity } from "./entity";

interface PlayerTextures {
  base: string;
  fight: string;
}

export class Player extends Entity {
  scene: Elwynn;
  keys: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  textureKey: string | null = null;
  enemies: Array<Entity> = [];
  isAttacking: boolean = false;
  playerHealthBar: Phaser.GameObjects.Graphics | null = null;
  enemyHealthBar: Phaser.GameObjects.Graphics | null = null;
  private readonly moveSpeed = 10;

  constructor(scene: Elwynn, x: number, y: number, texture: PlayerTextures) {
    super(scene, x, y, texture.base, SPRITES.PLAYER.base);

    this.scene = scene;

    if (!this.scene.input.keyboard) {
      return;
    }

    this.keys = this.scene.input.keyboard.createCursorKeys();
    const animations = this.anims;
    const animationFrameRate = 9;
    this.textureKey = texture.base;

    // Set the size and offset of the player to make the collisions more accurate
    this.setSize(28, 32);
    this.setOffset(10, 16);
    // Reduce player's size
    this.setScale(0.8);

    this.createAnimations(
      "down",
      this.textureKey,
      0,
      2,
      animations,
      animationFrameRate
    );
    this.createAnimations(
      "left",
      this.textureKey,
      12,
      14,
      animations,
      animationFrameRate
    );
    this.createAnimations(
      "right",
      this.textureKey,
      24,
      26,
      animations,
      animationFrameRate
    );
    this.createAnimations(
      "up",
      this.textureKey,
      36,
      38,
      animations,
      animationFrameRate
    );
    this.createAnimations(
      "fight",
      texture.fight,
      3,
      6,
      animations,
      animationFrameRate,
      0
    );

    this.initKeysListeners();

    this.on("animationcomplete", () => {
      this.isAttacking = false;
    });

    this.drawPlayerHealthBar();
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

  private createAnimations(
    key: string,
    textureKey: string,
    start: number,
    end: number,
    animations: Phaser.Animations.AnimationState,
    frameRate: number,
    repeat: number = -1
  ): void {
    animations.create({
      key,
      frames: animations.generateFrameNumbers(textureKey, {
        start,
        end,
      }),
      frameRate,
      repeat,
    });
  }

  private initKeysListeners(): void {
    this.scene.input.keyboard!.on("keydown-SPACE", () => {
      const target = this.findTarget(this.enemies);
      this.anims.play("fight");
      this.isAttacking = true;
      this.setVelocity(0, 0);
      this.attack(target);
      this.drawEnemyHealthBar(target as Enemy);
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

  private drawPlayerHealthBar(): void {
    this.playerHealthBar = this.scene.add.graphics();
    this.playerHealthBar.setScrollFactor(0);
    this.drawHealthBar(this.playerHealthBar, 10, 10, this.health / 100);
  }

  private drawEnemyHealthBar(target: Enemy): void {
    this.enemyHealthBar = this.scene.add.graphics();
    this.enemyHealthBar.setScrollFactor(0);
    this.drawHealthBar(this.enemyHealthBar, 10, 30, target.health / 100);
  }

  private drawHealthBar(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    percentage: number
  ): void {
    // Background black rectangle
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x, y, 100, 10);

    // Dynamic green health bar
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(x, y, 100 * percentage, 10);
  }

  update(delta: number): void {
    this.drawPlayerHealthBar();
    if (!this.keys) {
      return;
    }

    // const coordinatesChangesWithDelta = delta / 4;

    if (this.keys.left.isDown) {
      // this.x -= coordinatesChangesWithDelta;
      this.setVelocity(-delta * this.moveSpeed, 0);
      this.anims.play("left", true);

      return;
    }

    if (this.keys.right.isDown) {
      // this.x += coordinatesChangesWithDelta;
      this.setVelocity(delta * this.moveSpeed, 0);
      this.anims.play("right", true);

      return;
    }

    if (this.keys.up.isDown) {
      // this.y -= coordinatesChangesWithDelta;
      this.setVelocity(0, -delta * this.moveSpeed);
      this.anims.play("up", true);

      return;
    }

    if (this.keys.down.isDown) {
      // this.y += coordinatesChangesWithDelta;
      this.setVelocity(0, delta * this.moveSpeed);
      this.anims.play("down", true);

      return;
    }

    if (this.isAttacking) {
      this.setVelocity(0, 0);

      return;
    }

    if (
      this.keys.left.isUp &&
      this.keys.right.isUp &&
      this.keys.up.isUp &&
      this.keys.down.isUp &&
      !this.isAttacking
    ) {
      this.setVelocity(0, 0);
      this.anims.stop();
    }
  }
}
