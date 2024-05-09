import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Gestures, isPredictionsStarted, lastGesture } from "./gesture";
import { Power } from "./power";

export class Player extends ex.Actor {
  private cooldown: number = 1000;
  private timer: number = 0;
  private timerb: number = 0;
  private canAttack: boolean = true;
  private wolfAttack: Power = new Power(
    ex.vec(this.pos.x + 128, this.pos.y - 92)
  );
  private isAttacking: boolean = false;
  private attack?: ex.Animation;

  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 64,
      height: 64,
      collisionType: ex.CollisionType.Active,
      color: ex.Color.Black,
      scale: ex.vec(1.5, 1.5),
    });
  }

  onInitialize(engine: ex.Engine): void {
    const playerRunSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.HeroRunSpriteSheetPng as ex.ImageSource,
      grid: {
        spriteWidth: 200,
        spriteHeight: 200,
        rows: 1,
        columns: 8,
      },
    });

    const playerIdleSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.HeroIdleSpriteSheetPng as ex.ImageSource,
      grid: {
        spriteWidth: 200,
        spriteHeight: 200,
        rows: 1,
        columns: 4,
      },
    });

    const playerAttackSpriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.HeroAttackSpriteSheetPng as ex.ImageSource,
      grid: {
        spriteWidth: 200,
        spriteHeight: 200,
        rows: 1,
        columns: 4,
      },
    });

    const rightWalk = new ex.Animation({
      frames: [
        {
          graphic: playerRunSpriteSheet.getSprite(0, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(1, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(2, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(3, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(4, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(5, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(6, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerRunSpriteSheet.getSprite(7, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add("right-walk", rightWalk);

    const rightIdle = new ex.Animation({
      frames: [
        {
          graphic: playerIdleSpriteSheet.getSprite(0, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerIdleSpriteSheet.getSprite(1, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerIdleSpriteSheet.getSprite(2, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerIdleSpriteSheet.getSprite(3, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add("right-idle", rightIdle);

    this.attack = new ex.Animation({
      frames: [
        {
          graphic: playerAttackSpriteSheet.getSprite(0, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerAttackSpriteSheet.getSprite(1, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerAttackSpriteSheet.getSprite(2, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerAttackSpriteSheet.getSprite(3, 0) as ex.Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
      strategy: ex.AnimationStrategy.Freeze,
    });
    this.graphics.add("attack", this.attack);

    this.graphics.offset.y = 8;

    engine.add(this.wolfAttack);
  }

  onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    if (this.timer >= this.cooldown && !this.canAttack) {
      this.timer = 0;
      this.canAttack = true;
    } else if (this.timer <= this.cooldown) {
      this.timer += elapsedMs;
    }

    if (!this.isAttacking) {
      this.graphics.use("right-idle");
    }

    if (
      this.canAttack &&
      !this.isAttacking &&
      lastGesture === Gestures.SCISSORS
    ) {

      this.timer = 0;
      this.canAttack = false;
      this.isAttacking = true;
      this.attack?.reset();
      this.graphics.use("attack");
      engine.clock.schedule(() => {
        this.isAttacking = false;
      }, 400);
    }

    if (isPredictionsStarted && !this.isAttacking) {
      this.graphics.use("right-walk");
    }
  }
}
