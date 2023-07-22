/**
 * @param {any} thisArg
 * @param {Array<any>} args
 * @return {any}
 */
Function.prototype.myApply = function (thisArg, args = []) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);
  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  return wrapperObj[sym](...args);
};
