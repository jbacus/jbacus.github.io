const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

class Boid {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = Vector.random2D();
    this.velocity.setMag(Math.random() * 1.5 + 0.5);
    this.acceleration = new Vector();
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.perceptionRadius = 100;
  }

  update(boids) {
    this.acceleration.add(this.align(boids));
    this.acceleration.add(this.cohesion(boids));
    this.acceleration.add(this.separation(boids));

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.edges();
  }

  show(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  edges() {
    if (this.position.x > canvas.width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = canvas.width;
    if (this.position.y > canvas.height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = canvas.height;
  }

  align(p, boids) {
    const steering = createVector();
    let total = 0;
    for (const other of boids) {
      const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(p, boids) {
    const steering = createVector();
    let total = 0;
    for (const other of boids) {
      const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(p, boids) {
    const steering = createVector();
    let total = 0;
    for (const other of boids) {
      const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < this.perceptionRadius) {
        const diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
}

const boids = [];
const numBoids = 100;

function setup() {
  for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
  }
}

function draw() {
  ctx.fillStyle = 'rgba(240, 240, 240, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const boid of boids) {
    boid.update(boids);
    boid.show(ctx);
  }

  requestAnimationFrame(draw);
}

setup();
draw();
