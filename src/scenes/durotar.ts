import Phaser from "phaser";

import durotarJSON from "../../public/maps/durotar.json";
import { LAYERS, SIZES, SPRITES, TILES } from "../utils/constants";
import { Player } from "../entities/player";

export class Durotar extends Phaser.Scene {
  player: Player | null = null;

  constructor() {
    super("Durotar scene");
  }

  preload(): void {
    this.load.image(TILES.DUROTAR, "maps/durotar.png");
    this.load.tilemapTiledJSON("durotar-map", "maps/durotar.json");

    this.load.spritesheet(SPRITES.PLAYER, "characters/alliance.png", {
      frameWidth: SIZES.PLAYER.WIDTH,
      frameHeight: SIZES.PLAYER.HEIGHT,
    });
  }

  create(): void {
    const map = this.make.tilemap({ key: "durotar-map" });
    const tileset = map.addTilesetImage(
      durotarJSON.tilesets[0].name,
      TILES.DUROTAR,
      SIZES.TILE,
      SIZES.TILE
    ) as Phaser.Tilemaps.Tileset;

    const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
    const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

    this.player = new Player(this, 400, 250, SPRITES.PLAYER);
  }

  update(_time: number, delta: number): void {
    // ! time param --> current time in milliseconds from the start of the game
    // ! delta param --> time in milliseconds since the last frame
    this.player?.update(delta);
  }
}
