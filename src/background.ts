import { Actor, CollisionType, Color, Sprite, vec } from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { isPredictionsStarted } from "./gesture";

export class Background extends Actor {
  private initialPos = vec(0, 0);
  private resetAtX = 0;
  private movementStarted = false;

  constructor(pos: ex.Vector, resetAtX: number) {
    super({
      pos,
      width: 800,
      height: 70,
      collisionType: CollisionType.Fixed,
      color: Color.Red,
    });

    this.initialPos = pos;
    this.resetAtX = resetAtX;
  }

  onInitialize(_engine: ex.Engine): void {
    const backgroundSprite = new Sprite({
      image: Resources.BackgroundSpritePng as ex.ImageSource,
    });

    this.graphics.use(backgroundSprite);
  }

  onPreUpdate(_engine: ex.Engine, _elapsedMs: number): void {
    if (this.pos.x <= this.resetAtX) {
      this.pos.x = this.initialPos.x;
    }

    if (!this.movementStarted && isPredictionsStarted) {
      this.startBgMovement();
    }
  }

  startBgMovement(): void {
    this.vel = vec(-Config.BackgroundSpeed, 0);

    this.movementStarted = true;
  }
}
