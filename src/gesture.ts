import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
  GestureRecognizerResult,
} from "@mediapipe/tasks-vision";

let gestureRecognizer: GestureRecognizer;
let runningMode = "IMAGE";
let webcamRunning: Boolean = false;
const videoWidth = "480px";
const videoHeight = "360px";
export let isModelLoaded = false;

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
export const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "./res/gesture_recognizer.task",
      delegate: "GPU",
    },
    runningMode: runningMode as any,
  });
  isModelLoaded = true;
};

/********************************************************************
// Continuously grab image from webcam stream and detect it.
********************************************************************/

const video: HTMLVideoElement = document.getElementById(
  "webcam"
) as HTMLVideoElement;
const canvasElement: HTMLCanvasElement = document.getElementById(
  "output_canvas"
) as HTMLCanvasElement;
const canvasCtx = canvasElement.getContext("2d");
const gestureOutput: HTMLParagraphElement = document.getElementById(
  "gesture_output"
) as HTMLParagraphElement;

// Check if webcam access is supported.
export function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Enable the live webcam view and start detection.
export function enableCam() {
  if (!gestureRecognizer) {
    alert("Please wait for gestureRecognizer to load");
    return;
  }

  webcamRunning = true;

  // getUsermedia parameters.
  const constraints = {
    video: true,
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video!.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

let lastVideoTime = -1;
let results: GestureRecognizerResult;
async function predictWebcam() {
  const webcamElement: HTMLVideoElement = document.getElementById(
    "webcam"
  ) as HTMLVideoElement;
  // Now let's start detecting the stream.
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO";
    await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
  }
  let nowInMs = Date.now();
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    results = gestureRecognizer.recognizeForVideo(video, nowInMs);
  }

  canvasCtx?.save();
  canvasCtx?.clearRect(0, 0, canvasElement?.width, canvasElement?.height);
  const drawingUtils = new DrawingUtils(canvasCtx as CanvasRenderingContext2D);

  canvasElement.style.height = videoHeight;
  webcamElement.style.height = videoHeight;
  canvasElement.style.width = videoWidth;
  webcamElement.style.width = videoWidth;

  if (results.landmarks) {
    for (const landmarks of results.landmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        GestureRecognizer.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5,
        }
      );
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
  }
  canvasCtx?.restore();
  if (results.gestures.length > 0) {
    gestureOutput.style.display = "block";
    gestureOutput.style.width = videoWidth;
    const categoryName = results.gestures[0][0].categoryName;
    const categoryScore = (results.gestures[0][0].score * 100).toFixed(2);
    const handedness = results.handedness[0][0].displayName;
    gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
  } else {
    gestureOutput.style.display = "none";
  }
  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam);
  }
}