/**
 * @param {any} thisArg
 * @param {...*} boundArgs
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);
  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  return function (...args) {
    return wrapperObj[sym](...boundArgs, ...args);
  };
};
