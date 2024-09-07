import "./style.css";

import Phaser from "phaser";

import { scenes } from "./scenes";

new Phaser.Game({
  width: 800,
  height: 600,
  title: "RPG Game",
  scene: scenes,
  url: import.meta.url || "",
  version: import.meta.env.VERSION || "0.0.1",
  backgroundColor: "#000000",
  scale: {
    // Phaser.Scale.FIT --> stretch the game to fit the screen
    mode: Phaser.Scale.FIT,
    // Phaser.Scale.CENTER_BOTH --> center the game on the screen
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      // ! Enable debug mode to see the collision boxes
      debug: true,
    },
  },
});
