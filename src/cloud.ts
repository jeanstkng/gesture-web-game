import { Actor, Engine, ImageSource, Random, Sprite, vec } from "excalibur";
import { Resources } from "./resources";

export class Cloud extends Actor {
  private resetAtX = -200;
  private speed: number = 0;

  constructor() {
    const random = new Random();

    super({
      pos: vec(random.integer(128, 1100), random.integer(0, 300)),
      width: 128,
      height: 128,
      z: 0,
      rotation: random.integer(0, 360),
    });

    this.speed = random.floating(25, 125);
  }

  onInitialize(_engine: Engine): void {
    const cloudSprite = new Sprite({
      image: Resources.CloudSpritePng as ImageSource,
    });
    cloudSprite.scale = vec(0.5, 0.5);
    this.graphics.add(cloudSprite);
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    if (this.pos.x <= this.resetAtX) {
      this.pos.x = 1100
    }

    this.vel.x = -1 * this.speed;
  }
}
