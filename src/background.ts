import { Actor, CollisionType, Color, Sprite, vec } from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { isPredictionsStarted } from "./gesture";
import { gameState } from "./gameState";

export class Background extends Actor {
  private resetAtX = 0;

  constructor(pos: ex.Vector, resetAtX: number) {
    super({
      pos,
      width: 800,
      height: 70,
      collisionType: CollisionType.Fixed,
      color: Color.Red,
    });

    this.resetAtX = resetAtX;
  }

  onInitialize(_engine: ex.Engine): void {
    const backgroundSprite = new Sprite({
      image: Resources.BackgroundSpritePng as ex.ImageSource,
    });

    this.graphics.use(backgroundSprite);
  }

  onPreUpdate(_engine: ex.Engine, elapsedMs: number): void {
    if (this.offset.x <= this.resetAtX) {
      this.offset.x = 0;
    }

    if (isPredictionsStarted && !gameState.isDead) {
      this.offset.x -= Config.BackgroundSpeed * elapsedMs;
    }
  }

}
