Array.prototype.myFilter = function (callbackFn, thisArg) {
  throw 'Not implemented!';
};

interface Array<T> {
  myFilter(callbackFn: (value: T) => boolean, thisArg?: any): Array<T>;
}
