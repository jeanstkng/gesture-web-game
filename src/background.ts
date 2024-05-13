import {
  Actor,
  CollisionType,
  Color,
  Engine,
  ImageSource,
  Sprite,
  Vector,
} from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { isPredictionsStarted } from "./gesture";
import { gameState } from "./gameState";
import { Cloud } from "./cloud";

export class Background extends Actor {
  private resetAtX = 0;

  constructor(pos: Vector, resetAtX: number) {
    super({
      pos,
      width: 800,
      height: 70,
      z: 3,
      collisionType: CollisionType.Fixed,
      color: Color.Red,
    });

    this.resetAtX = resetAtX;
  }

  onInitialize(engine: Engine): void {
    const backgroundSprite = new Sprite({
      image: Resources.BackgroundSpritePng as ImageSource,
    });

    this.graphics.use(backgroundSprite);

    for (let i = 0; i < 4; i++) {
      const cloud = new Cloud();

      engine.add(cloud);
    }
  }

  onPreUpdate(_engine: Engine, elapsedMs: number): void {
    if (this.offset.x <= this.resetAtX) {
      this.offset.x = 0;
    }

    if (isPredictionsStarted && !gameState.isDead) {
      this.offset.x -= Config.BackgroundSpeed * elapsedMs;
    }
  }
}
