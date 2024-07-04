export default function promiseWithResolvers<T>(): Readonly<{
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
}> {
  let resolve: (value: T) => void = () => {};
  let reject: (reason?: any) => void = () => {};

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
