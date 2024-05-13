import {
  playerAttackSpriteSheet,
  playerDeathSpriteSheet,
  playerFallSpriteSheet,
  playerIdleSpriteSheet,
  playerJumpSpriteSheet,
  playerRunSpriteSheet,
} from "./resources";
import { Config } from "./config";
import { Gestures, isPredictionsStarted, lastGesture } from "./gesture";
import { Power } from "./power";
import { gameState } from "./gameState";
import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Color,
  Engine,
  Font,
  FontUnit,
  Label,
  PostCollisionEvent,
  Side,
  Vector,
  vec,
} from "excalibur";

export class Player extends Actor {
  private cooldown: number = 1000;
  private timer: number = 0;
  private jumpTimer: number = 0;
  private canAttack: boolean = true;
  private isAttacking: boolean = false;
  private wolfAttack: Power = new Power(vec(this.pos.x + 164, this.pos.y - 92));
  private attack?: Animation;
  private jump?: Animation;
  private fall?: Animation;
  private death?: Animation;
  private actualEnemiesCollision: number[] = [];
  private dashArrayIncrements = {
    [1]: 283,
    [2]: 283,
  };
  private canJump: boolean = true;
  private onGround: boolean = true;
  private scoreLabel?: Label;

  constructor(pos: Vector) {
    super({
      pos,
      z: 2,
      width: 64,
      height: 96,
      collisionType: CollisionType.Active,
      name: "player",
    });
  }

  onInitialize(engine: Engine): void {
    const font = new Font({
      family: "Sedan SC",
      size: 24,
      unit: FontUnit.Px,
    });

    this.scoreLabel = new Label({
      text: "Score: 0",
      pos: vec(200, 24),
      z: 10,
      font,
      color: Color.White,
    });

    engine.add(this.scoreLabel);

    const rightWalk = Animation.fromSpriteSheet(
      playerRunSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6, 7],
      Config.PlayerFrameSpeed
    );
    rightWalk.scale = vec(1.5, 1.5);

    const rightIdle = Animation.fromSpriteSheet(
      playerIdleSpriteSheet,
      [0, 1, 2, 3],
      Config.PlayerFrameSpeed
    );
    rightIdle.scale = vec(1.5, 1.5);

    this.attack = Animation.fromSpriteSheet(
      playerAttackSpriteSheet,
      [0, 1, 2, 3],
      Config.PlayerFrameSpeed,
      AnimationStrategy.Freeze
    );
    this.attack.scale = vec(1.5, 1.5);

    this.jump = Animation.fromSpriteSheet(
      playerJumpSpriteSheet,
      [0, 1],
      Config.PlayerFrameSpeed,
      AnimationStrategy.Freeze
    );
    this.jump.scale = vec(1.5, 1.5);

    this.fall = Animation.fromSpriteSheet(
      playerFallSpriteSheet,
      [0, 1],
      Config.PlayerFrameSpeed,
      AnimationStrategy.Freeze
    );
    this.fall.scale = vec(1.5, 1.5);

    this.death = Animation.fromSpriteSheet(
      playerDeathSpriteSheet,
      [0, 1, 2, 3, 4, 5, 6],
      Config.PlayerFrameSpeed,
      AnimationStrategy.Freeze
    );
    this.death.scale = vec(1.5, 1.5);

    this.graphics.add("right-walk", rightWalk);
    this.graphics.add("right-idle", rightIdle);
    this.graphics.add("attack", this.attack);
    this.graphics.add("jump", this.jump);
    this.graphics.add("fall", this.fall);
    this.graphics.add("death", this.death);

    this.graphics.offset.y = 8;

    engine.add(this.wolfAttack);

    this.on("collisionstart", (event) => {
      if (event.other.name === "enemy")
        this.actualEnemiesCollision.push(event.other.id);
    });
    this.on("postcollision", (evt) => this.onPostCollision(evt));
  }

  onPostCollision(evt: PostCollisionEvent) {
    if (evt.side === Side.Bottom) this.onGround = true;
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    if (gameState.isDead) {
      this.graphics.use("death");
      return;
    }

    if (this.timer >= this.cooldown && !this.canAttack) {
      this.timer = 0;
      this.canAttack = true;
    } else if (this.timer <= this.cooldown) {
      this.timer += elapsedMs;
    }

    if (this.jumpTimer >= this.cooldown && !this.canJump) {
      this.jumpTimer = 0;
      this.canJump = true;
    } else if (this.jumpTimer <= this.cooldown) {
      this.jumpTimer += elapsedMs;
    }

    if (!this.isAttacking && this.onGround) {
      this.graphics.use("right-idle");
    }

    if (
      this.canAttack &&
      !this.isAttacking &&
      lastGesture === Gestures.SCISSORS
    ) {
      this.dashArrayIncrements[1] = 0;
      this.timer = 0;
      this.canAttack = false;
      this.isAttacking = true;
      this.attack?.reset();
      this.graphics.use("attack");

      engine.clock.schedule(() => {
        this.scene?.actors.map((actor) => {
          if (this.actualEnemiesCollision.includes(actor.id)) {
            gameState.score += 10;
            this.scoreLabel!.text = `Score: ${gameState.score}`;
            actor.kill();
            this.actualEnemiesCollision = this.actualEnemiesCollision.filter(
              (id) => actor.id !== id
            );
          }
        });
      }, 200);
      engine.clock.schedule(() => {
        this.isAttacking = false;
      }, 400);
    }

    if (
      this.canJump &&
      !this.isAttacking &&
      this.onGround &&
      lastGesture === Gestures.ROCK
    ) {
      this.dashArrayIncrements[2] = 0;
      this.jumpTimer = 0;
      this.canJump = false;
      this.onGround = false;
      this.jump?.reset();
      this.fall?.reset();
      this.graphics.use("jump");
      this.vel.y = -600;

      engine.clock.schedule(() => {
        this.graphics.use("fall");
      }, 200);
    }

    if (isPredictionsStarted && !this.isAttacking && this.onGround) {
      this.graphics.use("right-walk");
    }

    this.setCircleDasharray(1, this.timer);
    this.setCircleDasharray(2, this.jumpTimer);
  }

  calculateTimeFraction(timeLeft: number, timeLimit: number) {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray(circleId: 1 | 2, timer: number) {
    const FULL_DASH_ARRAY = 283;

    if (this.dashArrayIncrements[circleId] < FULL_DASH_ARRAY) {
      this.dashArrayIncrements[circleId] =
        this.calculateTimeFraction(timer, this.cooldown) * FULL_DASH_ARRAY;
    }
    const circleDasharray = `${this.dashArrayIncrements[circleId].toFixed(
      0
    )} 283`;

    document
      .getElementById(`base-timer-path-remaining-${circleId}`)!
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  resetPlayer() {
    this.dashArrayIncrements = {
      [1]: 283,
      [2]: 283,
    };
    this.canJump = true;
    this.onGround = true;
    this.timer = 0;
    this.jumpTimer = 0;
    this.canAttack = true;
    this.isAttacking = false;
    this.attack?.reset();
    this.jump?.reset();
    this.fall?.reset();
    this.death?.reset();
    this.actualEnemiesCollision = [];
    this.wolfAttack.resetWolf();
  }
}
