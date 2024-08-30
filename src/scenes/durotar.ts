import Phaser from "phaser";

import durotarJSON from "../../public/maps/durotar.json";
import { LAYERS, SIZES, TILES } from "../utils/constants";

export class Durotar extends Phaser.Scene {
  constructor() {
    super("Durotar scene");
  }

  preload(): void {
    this.load.image(TILES.DUROTAR, "maps/durotar.png");
    this.load.tilemapTiledJSON("durotar-map", "maps/durotar.json");
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
  }
}
