// Boid class represents individual boids in the simulation
class Boid {
    constructor(p, x, y) {
      this.p = p;
      this.position = p.createVector(x, y);
      this.velocity = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
      this.velocity.setMag(p.random(0.5, 2));
      this.acceleration = p.createVector();
      this.maxSpeed = 4;
      this.maxForce = 0.2;
      this.perceptionRadius = 100;
    }
  
    update(boids) {
        this.acceleration.add(this.align(this.p, boids));
        this.acceleration.add(this.cohesion(this.p, boids));
        this.acceleration.add(this.separation(this.p, boids));
        
  
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
  
      this.edges();
    }
  
    show() {
      this.p.stroke(255, 0, 0);
      this.p.strokeWeight(8);
      this.p.point(this.position.x, this.position.y);
    }
  
    edges() {
      if (this.position.x > this.p.width) this.position.x = 0;
      if (this.position.x < 0) this.position.x = this.p.width;
      if (this.position.y > this.p.height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = this.p.height;
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
  