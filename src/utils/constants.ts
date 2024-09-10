import durotarJSON from "../../public/maps/durotar.json";
import summerJSON from "../../public/maps/summer.json";

export const TILES = {
  DUROTAR: "durotar",
  ELWYNN: "elwynn",
} as const;

export const SIZES = {
  TILE: 32,
  PLAYER: {
    WIDTH: 48,
    HEIGHT: 48,
  },
  BOAR: {
    WIDTH: 32,
    HEIGHT: 32,
  },
} as const;

export const LAYERS = {
  GROUND: durotarJSON.layers[0].name,
  WALLS: durotarJSON.layers[1].name,
  ELWYNN_GROUND: summerJSON.layers[0].name,
  ELWYNN_WALLS: summerJSON.layers[1].name,
} as const;

export const SPRITES = {
  PLAYER: {
    base: "player",
    fight: "player-fight",
  },
  BOAR: { base: "boar" },
} as const;
