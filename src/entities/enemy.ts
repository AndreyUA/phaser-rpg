import { Elwynn } from "../scenes/elwynn";
import { SPRITES } from "../utils/constants";
import { Entity } from "./entity";

export class Enemy extends Entity {
  scene: Elwynn;
  private isFollowing: boolean = false;
  private readonly aggroDistance: number = 100;
  attackRange: number = 40;
  followRange: number = 250;
  moveSpeed: number = 100;
  isAlive: boolean = true;
  initialPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    scene: Elwynn,
    x: number,
    y: number,
    texture: string,
    type?: string
  ) {
    super(scene, x, y, texture, SPRITES.BOAR.base);

    this.scene = scene;
    this.initialPosition = { x, y };

    this.cycleTween();
  }

  cycleTween(): void {
    this.setFlipX(true);

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

  stopCycleTween(): void {
    this.scene.tweens.killTweensOf(this);
  }

  followPlayer(): void {
    this.scene.physics.moveToObject(this, this.scene.player!, this.moveSpeed);
  }

  returnToInitialPosition(distanceToInitialPosition: number): void {
    this.isFollowing = false;
    this.setVelocity(0, 0);

    const requiredSpeed = (distanceToInitialPosition * 1_000) / this.moveSpeed;

    this.scene.tweens.add({
      targets: this,
      x: this.initialPosition.x,
      y: this.initialPosition.y,
      duration: requiredSpeed,
      onComplete: () => {
        this.cycleTween();
      },
    });
  }

  attack(target: Entity): void {
    const time = Math.floor(this.scene.game.loop.time);

    if (time % 2000 <= 3) {
      target.takeDamage(10);
    }
  }

  takeDamage(damage: number): void {
    super.takeDamage(damage);

    if (this.health <= 0) {
      this.deactivate();
    }
  }

  deactivate(): void {
    this.stopCycleTween();
    this.setPosition(this.initialPosition.x, this.initialPosition.y);
    this.setVisible(false);
    this.isAlive = false;
    this.destroy();
  }

  update(): void {
    // ! Here is a logic regarding aggro enemy to the player
    // 1. Calculate distance between player and enemy
    const player = this.scene.player!;
    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      player.x,
      player.y
    );
    const distanceToInitialPosition = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.initialPosition.x,
      this.initialPosition.y
    );

    // 2. If the enemy isn't following the player and the distance is lesser than the follow range - stop the animation
    if (!this.isFollowing && distanceToPlayer < this.aggroDistance) {
      this.isFollowing = true;
      this.stopCycleTween();
    }

    // 3. Follow the player if the enemy is in following mode
    if (this.isFollowing && this.isAlive) {
      this.followPlayer();
      // 3.1 The beginning of the fight
      if (distanceToPlayer < this.attackRange) {
        this.setVelocity(0, 0);
        this.attack(player);
      }
      // 3.2 The end of the fight - player is too far away and the enemy should return to the initial position
      if (distanceToInitialPosition > this.followRange) {
        this.returnToInitialPosition(distanceToInitialPosition);
      }
    }
  }
}
