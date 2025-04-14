import Turtle from './turtle';

describe('turtle', () => {
  test('constructor', () => {
    const turtle = new Turtle();
    expect(turtle).toBeInstanceOf(Turtle);
  });

  describe('movement', () => {
    test('forward', () => {
      const turtle = new Turtle();
      turtle.forward(2);
      expect(turtle.position()).toEqual([0, 2]);
      turtle.forward(3);
      expect(turtle.position()).toEqual([0, 5]);
    });

    test('backward', () => {
      const turtle = new Turtle();
      turtle.backward(2);
      expect(turtle.position()).toEqual([0, -2]);
      turtle.backward(3);
      expect(turtle.position()).toEqual([0, -5]);
    });
  });

  describe('turning', () => {
    test('left', () => {
      const turtle = new Turtle();
      turtle.left();
      turtle.forward(3);
      expect(turtle.position()).toEqual([-3, 0]);
      turtle.backward(3);
      expect(turtle.position()).toEqual([0, 0]);
      turtle.left();
      turtle.forward(5);
      expect(turtle.position()).toEqual([0, -5]);
      turtle.left();
      turtle.forward(3);
      expect(turtle.position()).toEqual([3, -5]);
    });

    test('right', () => {
      const turtle = new Turtle();
      turtle.right();
      turtle.forward(3);
      expect(turtle.position()).toEqual([3, 0]);
      turtle.backward(3);
      expect(turtle.position()).toEqual([0, 0]);
      turtle.right();
      turtle.forward(5);
      expect(turtle.position()).toEqual([0, -5]);
      turtle.right();
      turtle.forward(3);
      expect(turtle.position()).toEqual([-3, -5]);
    });
  });

  test('position', () => {
    const turtle = new Turtle();
    expect(turtle.position()).toEqual([0, 0]);
    turtle.forward(1);
    expect(turtle.position()).toEqual([0, 1]);
  });

  describe('method chaining', () => {
    test('turning', () => {
      const turtle = new Turtle();
      turtle.left().left().left().right().right().right().forward(3);
      expect(turtle.position()).toEqual([0, 3]);
      turtle.right().right().right().left().left().left().forward(3);
      expect(turtle.position()).toEqual([0, 6]);
    });

    test('forward and backward', () => {
      const turtle = new Turtle();
      turtle.right().forward(3);
      expect(turtle.position()).toEqual([3, 0]);
      turtle.backward(3);
      expect(turtle.position()).toEqual([0, 0]);
      turtle.right().forward(5);
      expect(turtle.position()).toEqual([0, -5]);
      turtle.left().backward(3);
      expect(turtle.position()).toEqual([-3, -5]);
    });
  });
});
