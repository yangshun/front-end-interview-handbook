interface Counter {
  get: () => number;
  increment: () => number;
  decrement: () => number;
  reset: () => number;
}

export default function makeCounter(initialValue: number = 0): Counter {
  let count = initialValue;

  return {
    get: () => count,
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = initialValue),
  };
}
