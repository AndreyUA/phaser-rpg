import durotarJSON from "../../public/maps/durotar.json";

export const TILES = {
  DUROTAR: "durotar",
} as const;

export const SIZES = {
  TILE: 32,
} as const;

export const LAYERS = {
  GROUND: durotarJSON.layers[0].name,
  WALLS: durotarJSON.layers[1].name,
} as const;
