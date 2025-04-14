interface Counter {
  get: () => number;
  increment: () => number;
  decrement: () => number;
  reset: () => number;
}

export default function makeCounter(initialValue: number = 0): Counter {
  throw 'Not implemented';
}
