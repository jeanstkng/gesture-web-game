import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  ImageSource,
  Random,
  Sprite,
  SpriteSheet,
  vec,
} from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";

export class Enemy extends Actor {
  private cooldown: number = 1500;
  private timer: number = 0;
  private canAttack: boolean = true;
  private goblinRunAnim?: Animation;
  private skeletonRunAnim?: Animation;
  private mushroomRunAnim?: Animation;
  private flyingEyeRunAnim?: Animation;
  private startMoving: boolean = false;

  constructor() {
    super({
      pos: vec(900, 500),
      width: 150,
      height: 150,
      collisionType: CollisionType.Passive,
      scale: vec(1.5, 1.5),
      name: "enemy",
    });
  }

  onInitialize(_engine: ex.Engine): void {
    const goblinRunSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.GoblinRunSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 8,
      },
    });
    const skeletonRunSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.SkeletonRunSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 4,
      },
    });
    const flyingEyeRunSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.FlyingEyeRunSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 8,
      },
    });
    const mushroomRunSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.MushroomRunSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 8,
      },
    });

    this.goblinRunAnim = new Animation({
      frames: [
        {
          graphic: goblinRunSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinRunSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
    });

    this.skeletonRunAnim = new Animation({
      frames: [
        {
          graphic: skeletonRunSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonRunSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonRunSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonRunSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
    });

    this.mushroomRunAnim = new Animation({
      frames: [
        {
          graphic: mushroomRunSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomRunSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
    });

    this.flyingEyeRunAnim = new Animation({
      frames: [
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeRunSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
    });

    this.graphics.add("goblin-run", this.goblinRunAnim);
    this.graphics.add("skeleton-run", this.skeletonRunAnim);
    this.graphics.add("mushroom-run", this.mushroomRunAnim);
    this.graphics.add("flyingeye-run", this.flyingEyeRunAnim);

    const enemies = ["goblin", "skeleton", "mushroom", "flyingeye"];

    const random = new Random();

    this.graphics.use(`${random.pickOne(enemies)}-run`);
    this.graphics.flipHorizontal = true;
  }

  onPreUpdate(_engine: Engine, elapsedMs: number): void {
    if (this.timer >= this.cooldown && !this.canAttack) {
      this.timer = 0;
      this.canAttack = true;
    } else if (this.timer <= this.cooldown) {
      this.timer += elapsedMs;
    }

    if (this.pos.x <= -100) {
      this.kill();
    }

    if (!this.startMoving) {
      this.vel.x = -100;
      this.startMoving = true;
    }
  }
}
