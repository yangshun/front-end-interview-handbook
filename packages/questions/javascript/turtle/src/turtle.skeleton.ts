export default class Turtle {
  constructor() {
    throw 'Not implemented';
  }

  /**
   * @param {number} distance Distance to move forward while facing the current direction.
   * @return {Turtle}
   */
  forward(distance: number): Turtle {
    throw 'Not implemented';
  }

  /**
   * @param {number} distance Distance to move backward while facing the current direction.
   * @return {Turtle}
   */
  backward(distance: number): Turtle {
    throw 'Not implemented';
  }

  /**
   * Turns the turtle left.
   * @return {Turtle}
   */
  left(): Turtle {
    throw 'Not implemented';
  }

  /**
   * Turns the turtle right.
   * @return {Turtle}
   */
  right(): Turtle {
    throw 'Not implemented';
  }

  /**
   * @return {[number, number]} Coordinates [x, y]
   */
  position(): [number, number] {
    throw 'Not implemented';
  }
}
