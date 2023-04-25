const sketch = (p) => {
    let boids = [];
    const numBoids = 100;
  
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(p, p.random(p.width), p.random(p.height)));
      }
    };
  
    p.draw = () => {
      p.background(240);
      
      // Draw a simple square in the center of the canvas
      p.fill(255, 0, 0);
      p.rectMode(p.CENTER);
      p.rect(p.width / 2, p.height / 2, 50, 50);
      
      for (const boid of boids) {
        boid.update(boids);
        boid.show();
      }
    };
  };
  
  const myP5 = new p5(sketch);
  