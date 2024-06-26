import {
  Actor,
  CollisionType,
  ImageSource,
  SpriteSheet,
  Vector,
  Animation,
  Sprite,
  Engine,
  AnimationStrategy,
  vec,
} from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Gestures, lastGesture } from "./gesture";
import { gameState } from "./gameState";

export class Power extends Actor {
  private cooldown: number = 2500;
  private timer: number = 0;
  private canAttack: boolean = true;
  private dashArrayIncrement: number = 283;
  private wolfAnimation?: Animation;
  private actualEnemiesCollision: number[] = [];
  private initialPos?: Vector;

  constructor(pos: Vector) {
    super({
      pos,
      z: 5,
      width: 256,
      height: 256,
      collisionType: CollisionType.Passive,
      name: "kon",
    });
    this.initialPos = pos;
  }

  onInitialize(_engine: ex.Engine): void {
    const wolfAttackSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.WolfAttackSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 256,
        spriteHeight: 256,
        rows: 1,
        columns: 2,
      },
    });

    this.wolfAnimation = new Animation({
      frames: [
        {
          graphic: wolfAttackSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.WolfFrame1Speed,
        },
        {
          graphic: wolfAttackSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.WolfFrame2Speed,
        },
      ],
      strategy: AnimationStrategy.Freeze,
    });
    this.graphics.add("wolf-attack", this.wolfAnimation);

    this.on("collisionstart", (event) => {
      if (event.other.name === "enemy") {
        this.actualEnemiesCollision.push(event.other.id);
      }
    });
    this.on("collisionend", (event) => {
      if (event.other.name === "enemy") {
        this.actualEnemiesCollision = this.actualEnemiesCollision.filter(
          (id) => event.other.id !== id
        );
      }
    });
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    if (gameState.isDead) return;

    if (this.timer >= this.cooldown && !this.canAttack) {
      this.timer = 0;
      this.canAttack = true;
    } else if (this.timer <= this.cooldown) {
      this.timer += elapsedMs;
    }

    if (this.canAttack && lastGesture === Gestures.FOX) {
      this.pos = this.initialPos!;
      this.actions.clearActions();
      this.actions.moveBy(vec(10, -10), 100).moveBy(vec(0, 10), 100);
      this.dashArrayIncrement = 0;
      this.graphics.opacity = 1;
      this.canAttack = false;
      this.wolfAnimation?.reset();
      this.graphics.use("wolf-attack");
      Resources.WolfSpawnSound.play(0.25);
      this.scene?.actors.map((actor) => {
        if (this.actualEnemiesCollision.includes(actor.id)) {
          gameState.score += 20;
          actor.kill();
          this.actualEnemiesCollision = this.actualEnemiesCollision.filter(
            (id) => actor.id !== id
          );
        }
      });
      engine.clock.schedule(() => {
        this.actions.fade(0, 100);
      }, 600);
    }
    this.setCircleDasharray();
  }

  calculateTimeFraction(timeLeft: number, timeLimit: number) {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  // Update the dasharray value as time passes, starting with 283
  setCircleDasharray() {
    const FULL_DASH_ARRAY = 283;

    if (this.dashArrayIncrement < FULL_DASH_ARRAY) {
      this.dashArrayIncrement =
        this.calculateTimeFraction(this.timer, this.cooldown) * FULL_DASH_ARRAY; // Invert the fraction
    }
    const circleDasharray = `${this.dashArrayIncrement.toFixed(0)} 283`;

    document
      .getElementById("base-timer-path-remaining")!
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  resetWolf() {
    this.timer = 0;
    this.canAttack = true;
    this.dashArrayIncrement = 283;
    this.actualEnemiesCollision = [];
  }
}
