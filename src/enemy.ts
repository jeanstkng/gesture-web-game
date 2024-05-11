import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Color,
  EmitterType,
  Engine,
  EventEmitter,
  ImageSource,
  ParticleEmitter,
  Random,
  Scene,
  Side,
  Sprite,
  SpriteSheet,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { gameState } from "./gameState";

export class Enemy extends Actor {
  private goblinRunAnim?: Animation;
  private goblinAttackAnim?: Animation;
  private skeletonRunAnim?: Animation;
  private skeletonAttackAnim?: Animation;
  private mushroomRunAnim?: Animation;
  private mushroomAttackAnim?: Animation;
  private flyingEyeRunAnim?: Animation;
  private flyingEyeAttackAnim?: Animation;
  private startMoving: boolean = false;
  private engine?: Engine;
  private enemyType: string = "";
  private playerTouched: boolean = false;
  private isDead: boolean = false;

  constructor() {
    super({
      pos: vec(900, 500),
      width: 32,
      height: 64,
      collisionType: CollisionType.Passive,
      scale: vec(1.5, 1.5),
      name: "enemy",
      color: Color.Red,
    });
  }

  onInitialize(engine: ex.Engine): void {
    this.engine = engine;
    const goblinRunSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.GoblinRunSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 8,
      },
    });
    const goblinAttackSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.GoblinAttackSpriteSheetPng as ImageSource,
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
    const skeletonAttackSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.SkeletonAttackSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 150,
        spriteHeight: 150,
        rows: 1,
        columns: 8,
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
    const flyingEyeAttackSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.FlyingEyeAttackSpriteSheetPng as ImageSource,
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
    const mushroomAttackSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.MushroomAttackSpriteSheetPng as ImageSource,
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

    this.goblinAttackAnim = new Animation({
      frames: [
        {
          graphic: goblinAttackSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: goblinAttackSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
      strategy: AnimationStrategy.Freeze,
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

    this.skeletonAttackAnim = new Animation({
      frames: [
        {
          graphic: skeletonAttackSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: skeletonAttackSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
      strategy: AnimationStrategy.Freeze,
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

    this.mushroomAttackAnim = new Animation({
      frames: [
        {
          graphic: mushroomAttackSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: mushroomAttackSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
      strategy: AnimationStrategy.Freeze,
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

    this.flyingEyeAttackAnim = new Animation({
      frames: [
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(5, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(6, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
        {
          graphic: flyingEyeAttackSpriteSheet.getSprite(7, 0) as Sprite,
          duration: Config.GoblinFrameSpeed,
        },
      ],
      strategy: AnimationStrategy.Freeze,
    });

    this.graphics.add("goblin-run", this.goblinRunAnim);
    this.graphics.add("goblin-attack", this.goblinAttackAnim);
    this.graphics.add("skeleton-run", this.skeletonRunAnim);
    this.graphics.add("skeleton-attack", this.skeletonAttackAnim);
    this.graphics.add("mushroom-run", this.mushroomRunAnim);
    this.graphics.add("mushroom-attack", this.mushroomAttackAnim);
    this.graphics.add("flyingeye-run", this.flyingEyeRunAnim);
    this.graphics.add("flyingeye-attack", this.flyingEyeAttackAnim);

    const enemies = ["goblin", "skeleton", "mushroom", "flyingeye"];

    const random = new Random();
    this.enemyType = random.pickOne(enemies);
    this.graphics.use(`${this.enemyType}-run`);
    this.graphics.flipHorizontal = true;

    this.on("collisionstart", (event) => {
      if (event.other.name === "player" && event.side == Side.Left) {
        this.playerTouched = true;
        engine.clock.schedule(() => {
          !this.isDead && this.graphics.use(`${this.enemyType}-attack`);
        }, 300);
        engine.clock.schedule(() => {
          !this.isDead && (gameState.isDead = true);
        }, 1000);
      }
    });
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    if (gameState.isDead || this.playerTouched) {
      this.vel.x = 0;
      return;
    }

    if (this.pos.x <= -100) {
      this.kill();
    }

    if (!this.startMoving) {
      this.vel.x = -100;
      this.startMoving = true;
    }
  }

  onPreKill(scene: Scene<unknown>): void {
    this.isDead = true;
    const emitter = new ParticleEmitter({
      x: this.pos.x,
      y: this.pos.y,
    });
    emitter.emitterType = EmitterType.Circle;
    emitter.radius = 5;
    emitter.minVel = 100;
    emitter.maxVel = 200;
    emitter.minAngle = 0;
    emitter.maxAngle = 6.2;
    emitter.isEmitting = true;
    emitter.emitRate = 100;
    emitter.opacity = 0.5;
    emitter.fadeFlag = false;
    emitter.particleLife = 500;
    emitter.maxSize = 4;
    emitter.minSize = 1;
    emitter.startSize = 0;
    emitter.endSize = 0;
    emitter.acceleration = new Vector(0, 800);
    emitter.beginColor = Color.Red;
    emitter.endColor = Color.Red;
    scene.add(emitter);
    this.engine?.clock.schedule(() => {
      emitter.kill();
    }, 500);
  }
}
