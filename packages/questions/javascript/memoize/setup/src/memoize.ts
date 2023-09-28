type Fn<T> = (this: any, arg: T) => unknown;

export default function memoize<T>(func: Fn<T>): Fn<T> {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = func.call(this, arg);
    cache.set(arg, result);

    return result;
  };
}
