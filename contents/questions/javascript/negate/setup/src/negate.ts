export default function negate<P extends any[], R>(
  predicate: (this: any, ...args: P) => R,
): (...args: P) => boolean {
  return function (this: any, ...args: P): boolean {
    return !predicate.apply(this, args);
  };
}
