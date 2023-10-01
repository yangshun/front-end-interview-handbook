export default function promiseResolve<T>(
  value: T | PromiseLike<T>,
): Promise<Awaited<T>> {
  if (value instanceof Promise) {
    return value;
  }

  return new Promise((resolve) => resolve(value as Awaited<T>));
}
