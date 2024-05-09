import { ImageFiltering, ImageSource, Loader } from "excalibur";

// Import paths to work with Vite
// Note the ?url suffix
import heroRunPath from "../img/Martial Hero 2/Sprites/Run.png?url";
import heroIdlePath from "../img/Martial Hero 2/Sprites/Idle.png?url";
import heroAttackPath from "../img/Martial Hero 2/Sprites/Attack1.png?url";
import backgroundPath from "../img/floor.png?url";
import wolfAttackPath from "../img/wolf_attack.png?url";
import goblinRunPath from "../img/Monsters_Creatures_Fantasy/Goblin/Run.png?url";
import skeletonRunPath from "../img/Monsters_Creatures_Fantasy/Skeleton/Walk.png?url";
import mushroomRunPath from "../img/Monsters_Creatures_Fantasy/Mushroom/Run.png?url";
import flyingEyeRunPath from "../img/Monsters_Creatures_Fantasy/Flying eye/Flight.png?url";

export const Resources = {
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
  BackgroundSpritePng: new ImageSource(
    backgroundPath,
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
  SkeletonRunSpriteSheetPng: new ImageSource(
    skeletonRunPath,
    false,
    ImageFiltering.Pixel
  ),
  MushroomRunSpriteSheetPng: new ImageSource(
    mushroomRunPath,
    false,
    ImageFiltering.Pixel
  ),
  FlyingEyeRunSpriteSheetPng: new ImageSource(
    flyingEyeRunPath,
    false,
    ImageFiltering.Pixel
  ),
};

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}
