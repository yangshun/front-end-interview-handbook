interface Array<T> {
  myFilter(callbackFn: (value: T) => boolean, thisArg?: any): Array<T>;
}

Array.prototype.myFilter = function (callbackFn, thisArg) {
  throw 'Not implemented!';
};
