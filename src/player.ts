import * as ex from 'excalibur';
import { Resources } from './resources';
import { Config } from './config';

export class Player extends ex.Actor {
    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 64,
            height: 64,
            collisionType: ex.CollisionType.Active
        })
    }

    onInitialize(_engine: ex.Engine): void {
        const playerRunSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.HeroRunSpriteSheetPng as ex.ImageSource,
            grid: {
                spriteWidth: 200,
                spriteHeight: 200,
                rows: 1,
                columns: 8
            }
        });

        const playerIdleSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.HeroIdleSpriteSheetPng as ex.ImageSource,
            grid: {
                spriteWidth: 200,
                spriteHeight: 200,
                rows: 1,
                columns: 4
            }
        });

        const rightWalk = new ex.Animation({
            frames: [
                {graphic: playerRunSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(4, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(5, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(6, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerRunSpriteSheet.getSprite(7, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('right-walk', rightWalk);

        
        const rightIdle = new ex.Animation({
            frames: [
                {graphic: playerIdleSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerIdleSpriteSheet.getSprite(1, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerIdleSpriteSheet.getSprite(2, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerIdleSpriteSheet.getSprite(3, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('right-idle', rightIdle);
    }

    onPreUpdate(engine: ex.Engine, _elapsedMs: number): void {
        this.graphics.use('right-idle');
        if (engine.input.keyboard.isHeld(ex.Keys.D)) {
            this.graphics.use('right-walk');
        }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowLeft)) {
        //     this.vel = ex.vec(-Config.PlayerSpeed, 0);
        //     this.graphics.use('left-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowUp)) {
        //     this.vel = ex.vec(0, -Config.PlayerSpeed);
        //     this.graphics.use('up-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown)) {
        //     this.vel = ex.vec(0, Config.PlayerSpeed);
        //     this.graphics.use('down-walk');
        // }

    }
}