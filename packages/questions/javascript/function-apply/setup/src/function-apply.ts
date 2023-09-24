interface Function {
  myApply(this: any, thisArg: any, argArray?: any[]): any;
}

Function.prototype.myApply = function (thisArg, argArray = []) {
  return this.bind(thisArg)(...argArray);
};
