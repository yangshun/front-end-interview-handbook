Function.prototype.myBind = function (thisArg: any, ...boundArgs: any[]) {
  throw 'Not implemented!';
};

interface Function {
  myBind(thisArg: any, ...boundArgs: any[]): Function;
}
