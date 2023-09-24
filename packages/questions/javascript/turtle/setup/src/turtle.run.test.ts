import Turtle from './turtle';

describe('turtle', () => {
  test('constructor', () => {
    const turtle = new Turtle();
    expect(turtle).toBeInstanceOf(Turtle);
  });

  test('forward', () => {
    const turtle = new Turtle();
    turtle.forward(2);
    expect(turtle.position()).toEqual([0, 2]);
  });

  test('turn left', () => {
    const turtle = new Turtle();
    turtle.left();
    turtle.forward(3);
    expect(turtle.position()).toEqual([-3, 0]);
  });
});
