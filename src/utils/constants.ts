import durotarJSON from "../../public/maps/durotar.json";

export const TILES = {
  DUROTAR: "durotar",
} as const;

export const SIZES = {
  TILE: 32,
  PLAYER: {
    WIDTH: 48,
    HEIGHT: 48,
  },
} as const;

export const LAYERS = {
  GROUND: durotarJSON.layers[0].name,
  WALLS: durotarJSON.layers[1].name,
} as const;

export const SPRITES = {
  PLAYER: "player",
} as const;
