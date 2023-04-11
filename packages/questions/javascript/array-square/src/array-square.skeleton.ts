interface Array<T> {
  square(): Array<number>;
}

Array.prototype.square = function () {
  throw 'Not implemented!';
};
