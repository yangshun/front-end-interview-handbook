type Fn<T> = (this: any, ...args: Array<any>) => T;

export default function memoize<T>(func: Fn<T>): Fn<T> {
  const cache = new Map<string, T>();

  return function (this: any, ...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func.apply(this, args);
    cache.set(key, result);

    return result;
  };
}
