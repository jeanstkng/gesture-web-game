import { ImageFiltering, ImageSource, Loader } from "excalibur";

// Import paths to work with Vite
// Note the ?url suffix
import heroRunPath from '../img/Martial Hero 2/Sprites/Run.png?url';
import heroIdlePath from '../img/Martial Hero 2/Sprites/Idle.png?url';

export const Resources = {
    HeroRunSpriteSheetPng: new ImageSource(heroRunPath, false, ImageFiltering.Pixel),
    HeroIdleSpriteSheetPng: new ImageSource(heroIdlePath, false, ImageFiltering.Pixel),
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}