export default function promiseTimeout<T>(
  promise: Promise<T>,
  duration: number,
): Promise<T> {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject('Promise timeout');
    }, duration);
  });

  return Promise.race([promise, timeout]) as Promise<T>;
}
