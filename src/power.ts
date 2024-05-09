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

export class Power extends Actor {
  private cooldown: number = 2500;
  private timer: number = 0;
  private canAttack: boolean = true;
  private wolfAnimation?: Animation;
  private dashArrayIncrement: number = 283;

  constructor(pos: Vector) {
    super({
      pos,
      width: 256,
      height: 256,
      collisionType: CollisionType.Active,
      name: "kon",
    });
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
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    if (this.timer >= this.cooldown && !this.canAttack) {
      this.timer = 0;
      this.canAttack = true;
    } else if (this.timer <= this.cooldown) {
      this.timer += elapsedMs;
    }

    if (this.canAttack && lastGesture === Gestures.FOX) {
      this.actions.clearActions();
      this.actions.moveBy(vec(10, -10), 100).moveBy(vec(0, 10), 100);
      this.dashArrayIncrement = 0;
      this.graphics.opacity = 1;
      this.canAttack = false;
      this.wolfAnimation?.reset();
      this.graphics.use("wolf-attack");
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
}
