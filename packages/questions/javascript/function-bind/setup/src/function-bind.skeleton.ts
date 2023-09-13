interface Function {
  myBind(thisArg: any, ...boundArgs: any[]): Function;
}

Function.prototype.myBind = function (thisArg: any, ...boundArgs: any[]) {
  throw 'Not implemented!';
};
