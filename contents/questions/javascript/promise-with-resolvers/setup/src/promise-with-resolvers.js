/**
 * @returns { promise: Promise, resolve: Function, reject: Function }
 */
export default function promiseWithResolvers() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
