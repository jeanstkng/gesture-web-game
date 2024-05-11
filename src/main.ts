import * as ex from "excalibur";
import { loader } from "./resources";
import { Player } from "./player";
import { createGestureRecognizer, enableCam, hasGetUserMedia } from "./gesture";
import { Background } from "./background";
import { Enemy } from "./enemy";

const game = new ex.Engine({
  width: 800,
  height: 600,
  canvasElementId: "game",
  pixelArt: true,
  pixelRatio: 2,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  antialiasing: false,
  physics: {
    solver: ex.SolverStrategy.Arcade,
    gravity: ex.vec(0, 800),
  },
});

createGestureRecognizer();

game.start(loader).then(() => {
  if (hasGetUserMedia()) {
    enableCam();
  } else {
    alert("Your browser does not support webcam usage");
    console.warn("getUserMedia() is not supported by your browser");
  }

  document.getElementById("powers")!.style.visibility = "visible";
});

const bg1 = new Background(new ex.Vector(400, 565), -800);
const bg2 = new Background(new ex.Vector(1200, 565), -800);
const player = new Player(new ex.Vector(100, 528));

const random = new ex.Random(1337);
const timer = new ex.Timer({
  random,
  randomRange: [750, 1500],
  interval: 1000,
  repeats: true,
  fcn: () => {
    const enemy = new Enemy();
    game.add(enemy);
  },
}).start();

game.add(timer);

game.add(player);
game.add(bg1);
game.add(bg2);
