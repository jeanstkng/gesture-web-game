# Ronin Run Gesture
# Excalibur, Mediapipe and Vite 

Play Game [here](https://jeanstkng.itch.io/gesture-run)

![game-animation](./game.gif)

## Running locally

* Using [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
* Run the `npm install` to install dependencies
* Run the `npm run start` to run the development server to test out changes

## Building bundles

* Run `npm run start` to produce javascript bundles for debugging in the `dist/` folder
* Run `npm run build` to produce javascript bundles for production (minified) in the `dist/` folder

# Research resources

* https://blog.tensorflow.org/2021/11/3D-handpose.html
* https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/web_js#video
* https://developers.google.com/mediapipe/solutions/setup_web
* https://developers.google.com/mediapipe/solutions/customization/gesture_recognizer

Last link has a python notebook from google that you could use to train a new model.

This could be done in python and make python recognize key press to play any game this way... But I am unsure why would you need it.

* https://nitratine.net/blog/post/simulate-keypresses-in-python/