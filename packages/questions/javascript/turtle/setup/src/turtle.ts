enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

const NUMBER_OF_CARDINAL_DIRECTIONS = 4;

export default class Turtle {
  x: number;
  y: number;
  direction: Direction;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = Direction.North;
  }

  forward(distance: number): Turtle {
    this._move(distance);
    return this;
  }

  backward(distance: number): Turtle {
    this._move(-distance);
    return this;
  }

  _move(distance: number): Turtle {
    switch (this.direction) {
      case Direction.North:
        this.y += distance;
        break;
      case Direction.East:
        this.x += distance;
        break;
      case Direction.South:
        this.y -= distance;
        break;
      case Direction.West:
        this.x -= distance;
        break;
    }
    return this;
  }

  left(): Turtle {
    // Wrap around behavior.
    this.direction =
      (this.direction - 1 + NUMBER_OF_CARDINAL_DIRECTIONS) %
      NUMBER_OF_CARDINAL_DIRECTIONS;
    return this;
  }

  right(): Turtle {
    // Wrap around behavior.
    this.direction =
      (this.direction + 1 + NUMBER_OF_CARDINAL_DIRECTIONS) %
      NUMBER_OF_CARDINAL_DIRECTIONS;
    return this;
  }

  position(): [number, number] {
    return [this.x, this.y];
  }
}
