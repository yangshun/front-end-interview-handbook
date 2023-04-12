interface Function {
  myBind(thisArg: any, ...boundArgs: any[]): Function;
}

/**
 * @param {any} thisArg
 * @param {...*} boundArgs
 */
Function.prototype.myBind = function (thisArg: any, ...boundArgs: any[]) {
  throw 'Not implemented!';
};
