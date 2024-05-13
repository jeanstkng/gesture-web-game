import { loader } from "./resources";
import { Player } from "./player";
import {
  createGestureRecognizer,
  enableCam,
  hasGetUserMedia,
  isPredictionsStarted,
} from "./gesture";
import { Background } from "./background";
import { Enemy } from "./enemy";
import {
  Color,
  Engine,
  Random,
  SolverStrategy,
  Timer,
  Vector,
  vec,
} from "excalibur";
import { gameState } from "./gameState";

const game = new Engine({
  width: 800,
  height: 600,
  canvasElementId: "game",
  backgroundColor: Color.fromHex("#00619a"),
  pixelArt: true,
  pixelRatio: 2,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  antialiasing: false,
  physics: {
    solver: SolverStrategy.Arcade,
    gravity: vec(0, 800),
  },
});

game.start(loader).then(async () => {
  if (hasGetUserMedia()) {
    await createGestureRecognizer();
    enableCam();
  } else {
    alert("Your browser does not support webcam usage");
    console.warn("getUserMedia() is not supported by your browser");
  }

  document.getElementById("powers")!.style.visibility = "visible";
});

const bg1 = new Background(new Vector(400, 565), -800);
const bg2 = new Background(new Vector(1200, 565), -800);
const player = new Player(new Vector(100, 528));

const random = new Random();
const timer = new Timer({
  random,
  randomRange: [750, 1500],
  interval: 1000,
  repeats: true,
  fcn: async () => {
    if (
      gameState.isDead ||
      !(await navigator.mediaDevices.getUserMedia({ video: true })).active
    )
      return;
    const enemy = new Enemy();
    game.add(enemy);
  },
}).start();

game.add(timer);

game.add(player);
game.add(bg1);
game.add(bg2);

document.getElementById("restart")?.addEventListener("click", () => {
  document.getElementById("restart")!.style.visibility = "hidden";
  player.resetPlayer();
  game.currentScene.actors.forEach((actor) => {
    if (actor.name === "enemy") {
      actor.kill();
    }
  });
  gameState.isDead = false;
  gameState.score = 0;
});
