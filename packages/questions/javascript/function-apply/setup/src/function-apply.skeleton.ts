interface Function {
  myApply(thisArg: any, args: any[]): any;
}

Function.prototype.myApply = function (thisArg, args) {
  throw 'Not implemented!';
};
