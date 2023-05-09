// The Vector class represents 2D vectors and provides common operations like addition, subtraction, scaling, and normalization
class Vector {
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
  
    // Adds the given vector to this vector
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  
    // Subtracts the given vector from this vector
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  
    // Scales this vector by the given scalar value
    scale(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
  
    // Creates a copy of this vector
    copy() {
      return new Vector(this.x, this.y);
    }
  
    // Normalizes this vector (converts it to a unit vector)
    normalize() {
      const length = this.length();
      if (length > 0) {
        this.x /= length;
        this.y /= length;
      }
      return this;
    }
  
    // Limits the length (magnitude) of this vector to the given value
    limit(max) {
      if (this.lengthSquared() > max * max) {
        this.normalize().scale(max);
      }
      return this;
    }
  
    // Returns the length (magnitude) of this vector
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    // Returns the squared length (magnitude) of this vector, which is faster to compute than the actual length
    lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }
  
    // Returns the distance between this vector and the given vector
    dist(v) {
      return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }
  
    // Returns a random vector with components in the range of -1 to 1
    static random() {
      return new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    // Add this method to the Vector class in vector.js
    angle() {
        return Math.atan2(this.y, this.x);
  }
  
  }
  