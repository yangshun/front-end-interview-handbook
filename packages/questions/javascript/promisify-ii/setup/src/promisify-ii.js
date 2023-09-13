const promisifyCustomSymbol = Symbol.for('util.promisify.custom');

/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  if (func[promisifyCustomSymbol]) {
    return func[promisifyCustomSymbol];
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
  };
}
