/**
 * @param {any} thisArg
 * @param {Array<any>} args
 * @return {any}
 */
Function.prototype.myApply = function (thisArg, args = []) {
  return this.bind(thisArg)(...args);
};
