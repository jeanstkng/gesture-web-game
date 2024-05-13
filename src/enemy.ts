import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Color,
  EmitterType,
  Engine,
  ParticleEmitter,
  Random,
  Scene,
  Side,
  Vector,
  vec,
} from "excalibur";
import {
  Resources,
  flyingEyeAttackSpriteSheet,
  flyingEyeRunSpriteSheet,
  goblinAttackSpriteSheet,
  goblinIdleSpriteSheet,
  goblinRunSpriteSheet,
  mushroomAttackSpriteSheet,
  mushroomIdleSpriteSheet,
  mushroomRunSpriteSheet,
  skeletonAttackSpriteSheet,
  skeletonIdleSpriteSheet,
  skeletonRunSpriteSheet,
} from "./resources";
import { Config } from "./config";
import { gameState } from "./gameState";

export class Enemy extends Actor {
  private startMoving: boolean = false;
  private engine?: Engine;
  private enemyType: string = "";
  private playerTouched: boolean = false;
  private isDead: boolean = false;

  constructor() {
    super({
      pos: vec(900, 500),
      z: 1,
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

    const goblinRunAnim = Animation.fromSpriteSheet(
      goblinRunSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed
    );

    const goblinIdleAnim = Animation.fromSpriteSheet(
      goblinIdleSpriteSheet,
      [0, 1, 2, 3],
      Config.EnemyFrameSpeed
    );

    const goblinAttackAnim = Animation.fromSpriteSheet(
      goblinAttackSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed,
      AnimationStrategy.Freeze
    );

    const skeletonRunAnim = Animation.fromSpriteSheet(
      skeletonRunSpriteSheet,
      [0, 1, 2, 3],
      Config.EnemyFrameSpeed
    );

    const skeletonIdleAnim = Animation.fromSpriteSheet(
      skeletonIdleSpriteSheet,
      [0, 1, 2, 3],
      Config.EnemyFrameSpeed
    );

    const skeletonAttackAnim = Animation.fromSpriteSheet(
      skeletonAttackSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed,
      AnimationStrategy.Freeze
    );

    const mushroomRunAnim = Animation.fromSpriteSheet(
      mushroomRunSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed
    );

    const mushroomIdleAnim = Animation.fromSpriteSheet(
      mushroomIdleSpriteSheet,
      [0, 1, 2, 3],
      Config.EnemyFrameSpeed
    );

    const mushroomAttackAnim = Animation.fromSpriteSheet(
      mushroomAttackSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed,
      AnimationStrategy.Freeze
    );

    const flyingEyeRunAnim = Animation.fromSpriteSheet(
      flyingEyeRunSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed
    );

    const flyingEyeAttackAnim = Animation.fromSpriteSheet(
      flyingEyeAttackSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.EnemyFrameSpeed,
      AnimationStrategy.Freeze
    );

    this.graphics.add("goblin-run", goblinRunAnim);
    this.graphics.add("goblin-idle", goblinIdleAnim);
    this.graphics.add("goblin-attack", goblinAttackAnim);
    this.graphics.add("skeleton-run", skeletonRunAnim);
    this.graphics.add("skeleton-idle", skeletonIdleAnim);
    this.graphics.add("skeleton-attack", skeletonAttackAnim);
    this.graphics.add("mushroom-run", mushroomRunAnim);
    this.graphics.add("mushroom-idle", mushroomIdleAnim);
    this.graphics.add("mushroom-attack", mushroomAttackAnim);
    this.graphics.add("flyingeye-run", flyingEyeRunAnim);
    this.graphics.add("flyingeye-attack", flyingEyeAttackAnim);

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
          !this.isDead && Resources.PlayerDeathSound.play(0.25);
        }, 650);
        engine.clock.schedule(() => {
          if (!this.isDead) {
            gameState.isDead = true;
            document.getElementById("restart")!.style.visibility = "visible";
          }
        }, 1000);
      }
    });
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    if (gameState.isDead || this.playerTouched) {
      this.vel.x = 0;
      if (gameState.isDead && this.enemyType !== "flyingeye")
        this.graphics.use(`${this.enemyType}-idle`);

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
