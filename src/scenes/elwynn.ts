import Phaser from "phaser";

import summerJSON from "../../public/maps/summer.json";
import { Player } from "../entities/player";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";

export class Elwynn extends Phaser.Scene {
  player: Player | null = null;

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

    // ! Follow the player with the camera
    this.cameras.main.startFollow(this.player);
    // ! Prevent the camera from going out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(_time: number, delta: number): void {
    // ! time param --> current time in milliseconds from the start of the game
    // ! delta param --> time in milliseconds since the last frame
    this.player?.update(delta);
  }
}
