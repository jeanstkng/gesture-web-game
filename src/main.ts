import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";
import { createGestureRecognizer, enableCam, hasGetUserMedia } from "./gesture";

const game = new ex.Engine({
  width: 800,
  height: 600,
  canvasElementId: "game",
  pixelArt: true,
  pixelRatio: 2,
});

createGestureRecognizer();

game.start(loader).then(() => {
  // If webcam supported, add event listener to button for when user
  // wants to activate it.
  if (hasGetUserMedia()) {
    enableCam()
  } else {
    alert("Your browser does not support webcam usage");
    console.warn("getUserMedia() is not supported by your browser");
  }
});

const player = new Player(new ex.Vector(100, 500));

game.add(player);
