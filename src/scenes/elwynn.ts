import Phaser from "phaser";

import summerJSON from "../../public/maps/summer.json";
import { Player } from "../entities/player";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Enemy } from "../entities/enemy";

export class Elwynn extends Phaser.Scene {
  public player: Player | null = null;
  private boar: Enemy | null = null;

  constructor() {
    super("Elwyn scene");
  }

  preload(): void {
    this.load.image(TILES.ELWYNN, "maps/Summer_Tiles.png");
    this.load.tilemapTiledJSON("elwynn-map", "maps/summer.json");

    this.load.spritesheet(SPRITES.PLAYER, "characters/alliance.png", {
      frameWidth: SIZES.PLAYER.WIDTH,
      frameHeight: SIZES.PLAYER.HEIGHT,
    });

    this.load.spritesheet(SPRITES.BOAR.base, "characters/boar.png", {
      frameWidth: SIZES.BOAR.WIDTH,
      frameHeight: SIZES.BOAR.HEIGHT,
    });
  }

  create(): void {
    const map = this.make.tilemap({ key: "elwynn-map" });
    const tileset = map.addTilesetImage(
      summerJSON.tilesets[0].name,
      TILES.ELWYNN,
      SIZES.TILE,
      SIZES.TILE
    ) as Phaser.Tilemaps.Tileset;

    const groundLayer = map.createLayer(LAYERS.ELWYNN_GROUND, tileset, 0, 0);
    const wallsLayer = map.createLayer(LAYERS.ELWYNN_WALLS, tileset, 0, 0);

    this.player = new Player(this, 400, 250, SPRITES.PLAYER);
    this.boar = new Enemy(this, 600, 400, SPRITES.BOAR.base);

    // ! Follow the player with the camera
    this.cameras.main.startFollow(this.player);
    // ! Prevent the camera from going out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // ! Set the world bounds to the map size
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);

    // ! Enable collisions between the player and the walls
    if (!wallsLayer) {
      return;
    }
    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]); // all tiles collide except the ones with index -1
  }

  update(_time: number, delta: number): void {
    // ! time param --> current time in milliseconds from the start of the game
    // ! delta param --> time in milliseconds since the last frame
    this.player?.update(delta);

    this.boar?.update();

    // TODO: Remove this line
    console.log(this.player?.health);
  }
}
