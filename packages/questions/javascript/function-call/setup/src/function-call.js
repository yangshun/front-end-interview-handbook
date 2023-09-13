/**
 * @param {any} thisArg
 * @param {...*} args
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...args) {
  return this.bind(thisArg)(...args);
};
