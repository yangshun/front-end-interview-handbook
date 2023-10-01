export default function promiseResolve<T>(
  value: T | PromiseLike<T>,
): Promise<Awaited<T>> {
  if (value instanceof Promise) {
    return value;
  }

  if (typeof (value as PromiseLike<T>).then === 'function') {
    // Note that the typing can be improved.
    return new Promise((value as PromiseLike<T>).then.bind(value) as any);
  }

  return new Promise((resolve) => resolve(value as Awaited<T>));
}
