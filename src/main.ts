import * as ex from "excalibur";
import { loader } from "./resources";
import { Player } from "./player";
import { createGestureRecognizer, enableCam, hasGetUserMedia } from "./gesture";
import { Background } from "./background";

const game = new ex.Engine({
  width: 800,
  height: 600,
  canvasElementId: "game",
  pixelArt: true,
  pixelRatio: 2,
  physics: {
    solver: ex.SolverStrategy.Arcade
  },
});

createGestureRecognizer();

game.start(loader).then(() => {
  // If webcam supported, add event listener to button for when user
  // wants to activate it.
  if (hasGetUserMedia()) {
    enableCam();
  } else {
    alert("Your browser does not support webcam usage");
    console.warn("getUserMedia() is not supported by your browser");
  }
});

const bg1 = new Background(new ex.Vector(400, 565), -400);
const bg2 = new Background(new ex.Vector(1200, 565), 400);
const player = new Player(new ex.Vector(100, 528));

game.add(player);
game.add(bg1);
game.add(bg2);
