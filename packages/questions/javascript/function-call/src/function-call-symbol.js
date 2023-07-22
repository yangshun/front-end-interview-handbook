/**
 * @param {any} thisArg
 * @param {...*} args
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...args) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);
  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  return wrapperObj[sym](...args);
};
