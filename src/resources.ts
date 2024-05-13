import { ImageFiltering, ImageSource, Loader, SpriteSheet } from "excalibur";

// Import paths to work with Vite
// Note the ?url suffix
import heroRunPath from "../img/Martial_Hero_2/Sprites/Run.png?url";
import heroIdlePath from "../img/Martial_Hero_2/Sprites/Idle.png?url";
import heroAttackPath from "../img/Martial_Hero_2/Sprites/Attack1.png?url";
import heroDeathPath from "../img/Martial_Hero_2/Sprites/Death.png?url";
import heroJumpPath from "../img/Martial_Hero_2/Sprites/Jump.png?url";
import heroFallPath from "../img/Martial_Hero_2/Sprites/Fall.png?url";
import backgroundPath from "../img/floor.png?url";
import cloudPath from "../img/cloud.png?url";
import wolfAttackPath from "../img/wolf_attack.png?url";
import goblinRunPath from "../img/Monsters_Creatures_Fantasy/Goblin/Run.png?url";
import goblinAttackPath from "../img/Monsters_Creatures_Fantasy/Goblin/Attack.png?url";
import goblinIdlePath from "../img/Monsters_Creatures_Fantasy/Goblin/Idle.png?url";
import skeletonRunPath from "../img/Monsters_Creatures_Fantasy/Skeleton/Walk.png?url";
import skeletonAttackPath from "../img/Monsters_Creatures_Fantasy/Skeleton/Attack.png?url";
import skeletonIdlePath from "../img/Monsters_Creatures_Fantasy/Skeleton/Idle.png?url";
import mushroomRunPath from "../img/Monsters_Creatures_Fantasy/Mushroom/Run.png?url";
import mushroomAttackPath from "../img/Monsters_Creatures_Fantasy/Mushroom/Attack.png?url";
import mushroomIdlePath from "../img/Monsters_Creatures_Fantasy/Mushroom/Idle.png?url";
import flyingEyeRunPath from "../img/Monsters_Creatures_Fantasy/Flying eye/Flight.png?url";
import flyingEyeAttackPath from "../img/Monsters_Creatures_Fantasy/Flying eye/Attack.png?url";

const Resources = {
  HeroRunSpriteSheetPng: new ImageSource(
    heroRunPath,
    false,
    ImageFiltering.Pixel
  ),
  HeroIdleSpriteSheetPng: new ImageSource(
    heroIdlePath,
    false,
    ImageFiltering.Pixel
  ),
  HeroAttackSpriteSheetPng: new ImageSource(
    heroAttackPath,
    false,
    ImageFiltering.Pixel
  ),
  HeroDeathSpriteSheetPng: new ImageSource(
    heroDeathPath,
    false,
    ImageFiltering.Pixel
  ),
  HeroJumpSpriteSheetPng: new ImageSource(
    heroJumpPath,
    false,
    ImageFiltering.Pixel
  ),
  HeroFallSpriteSheetPng: new ImageSource(
    heroFallPath,
    false,
    ImageFiltering.Pixel
  ),
  BackgroundSpritePng: new ImageSource(
    backgroundPath,
    false,
    ImageFiltering.Pixel
  ),
  CloudSpritePng: new ImageSource(
    cloudPath,
    false,
    ImageFiltering.Pixel
  ),
  WolfAttackSpriteSheetPng: new ImageSource(
    wolfAttackPath,
    false,
    ImageFiltering.Pixel
  ),
  GoblinRunSpriteSheetPng: new ImageSource(
    goblinRunPath,
    false,
    ImageFiltering.Pixel
  ),
  GoblinAttackSpriteSheetPng: new ImageSource(
    goblinAttackPath,
    false,
    ImageFiltering.Pixel
  ),
  GoblinIdleSpriteSheetPng: new ImageSource(
    goblinIdlePath,
    false,
    ImageFiltering.Pixel
  ),
  SkeletonRunSpriteSheetPng: new ImageSource(
    skeletonRunPath,
    false,
    ImageFiltering.Pixel
  ),
  SkeletonAttackSpriteSheetPng: new ImageSource(
    skeletonAttackPath,
    false,
    ImageFiltering.Pixel
  ),
  SkeletonIdleSpriteSheetPng: new ImageSource(
    skeletonIdlePath,
    false,
    ImageFiltering.Pixel
  ),
  MushroomRunSpriteSheetPng: new ImageSource(
    mushroomRunPath,
    false,
    ImageFiltering.Pixel
  ),
  MushroomAttackSpriteSheetPng: new ImageSource(
    mushroomAttackPath,
    false,
    ImageFiltering.Pixel
  ),
  MushroomIdleSpriteSheetPng: new ImageSource(
    mushroomIdlePath,
    false,
    ImageFiltering.Pixel
  ),
  FlyingEyeRunSpriteSheetPng: new ImageSource(
    flyingEyeRunPath,
    false,
    ImageFiltering.Pixel
  ),
  FlyingEyeAttackSpriteSheetPng: new ImageSource(
    flyingEyeAttackPath,
    false,
    ImageFiltering.Pixel
  ),
};

const loader = new Loader();

const playerRunSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroRunSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 8,
  },
});

const playerIdleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroIdleSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 4,
  },
});

const playerAttackSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroAttackSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 4,
  },
});

const playerJumpSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroJumpSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 2,
  },
});

const playerFallSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroFallSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 2,
  },
});

const playerDeathSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.HeroDeathSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 200,
    spriteHeight: 200,
    rows: 1,
    columns: 7,
  },
});

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

const goblinIdleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.GoblinIdleSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 150,
    spriteHeight: 150,
    rows: 1,
    columns: 4,
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

const skeletonIdleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.SkeletonIdleSpriteSheetPng as ImageSource,
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

const mushroomIdleSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.MushroomIdleSpriteSheetPng as ImageSource,
  grid: {
    spriteWidth: 150,
    spriteHeight: 150,
    rows: 1,
    columns: 4,
  },
});

for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}

export {
  loader,
  Resources,
  playerRunSpriteSheet,
  playerIdleSpriteSheet,
  playerAttackSpriteSheet,
  playerJumpSpriteSheet,
  playerFallSpriteSheet,
  playerDeathSpriteSheet,
  goblinRunSpriteSheet,
  goblinAttackSpriteSheet,
  goblinIdleSpriteSheet,
  skeletonRunSpriteSheet,
  skeletonAttackSpriteSheet,
  skeletonIdleSpriteSheet,
  flyingEyeRunSpriteSheet,
  flyingEyeAttackSpriteSheet,
  mushroomRunSpriteSheet,
  mushroomAttackSpriteSheet,
  mushroomIdleSpriteSheet
};
