export default function promisify<T>(
  func: (...args: any[]) => void,
): (this: any, ...args: any[]) => Promise<T> {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err: any, result: T) =>
        err ? reject(err) : resolve(result),
      );
    });
  };
}
