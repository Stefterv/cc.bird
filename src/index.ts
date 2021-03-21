/// <reference path="../node_modules/@types/p5/global.d.ts" />
import * as p5 from "p5";
import { Bird } from "./Bird";

window.p5 = p5;

declare global {
  interface Window {
    setup(): void;
    draw(): void;
    drawOnce(): void;
    p5: typeof p5;
  }
}
declare module "p5" {
  interface Renderer {
    drawingContext: CanvasRenderingContext2D;
  }
}

let ctx: CanvasRenderingContext2D;

let birds = new Array<Bird>();

let paths: p5.Graphics;

window.setup = function () {
  ctx = createCanvas(windowWidth, windowHeight).drawingContext;
  noiseSeed(0);
  randomSeed(0);

  paths = createGraphics(windowWidth, windowHeight);

  for (let index of new Array(50).keys()) {
    let bird = new Bird();
    bird.parent = birds[birds.length - 1];
    bird.paths = paths;
    birds.push(bird);
  }
};

window.draw = function () {
  clear();

  image(paths, 0, 0);

  for (let bird of birds) {
    bird.move();
  }

  for (let bird of birds) {
    bird.draw();
  }
};
window.keyTyped = keyTyped;
function keyTyped() {
  if (key === "s") {
    saveCanvas("photo", "png");
  }
}
