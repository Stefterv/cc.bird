import { Graphics } from "p5";

const SPEED = 0.5;

export class Bird {
  parent: Bird;

  angle: number = 0;
  angleSmooth: number = 0;
  position: Vector;
  velocity: Vector;

  paths: Graphics;
  constructor() {
    this.position = new Vector(random(width), random(height));
    this.velocity = new Vector(random(-SPEED, SPEED), random(-SPEED, SPEED));
  }

  move() {
    this.angle = atan2(this.velocity.y, this.velocity.x);

    this.angle += random(-SPEED, SPEED) / 10;

    this.moveToParent();

    this.velocity = new Vector(cos(this.angle), sin(this.angle));
    // fly in the direction, match direction with parent

    // Look ahead in

    this.position = this.position.add(this.velocity);
    this.position.x += width;
    this.position.y += height;
    this.position.x %= width;
    this.position.y %= height;
  }

  moveToParent() {
    if (!this.parent) return;

    let distance = this.position.dist(this.parent.position);
    if (distance > 50) {
      let target = atan2(
        this.parent.position.y - this.position.y,
        this.parent.position.x - this.position.x
      );

      this.angle += (target - this.angle) * 0.1;
      return;
    }
    this.angle += (this.parent.angle - this.angle) * 0.1;
  }

  draw() {
    this.angleSmooth += (this.angle - this.angleSmooth) * 0.1;
    stroke(0);
    // ellipse(this.position.x, this.position.y, 5, 5);
    // line(0,)
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angleSmooth);
    line(0, 0, -10, -5);
    line(0, 0, -10, 5);

    pop();

    this.paths.noStroke();
    this.paths.fill(255, 10);
    this.paths.ellipse(this.position.x, this.position.y, 2, 2);
  }
}

class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  dist(vector: Vector) {
    return dist(this.x, this.y, vector.x, vector.y);
  }
}
