const promisifyCustomSymbol = Symbol.for('util.promisify.custom');

type Func = (...args: any[]) => void;
type Return<T> = (this: any, ...args: any[]) => Promise<T>;
type WithSymbol<T> = { [promisifyCustomSymbol]: Return<T> };
type Param<T> = Func | WithSymbol<T>;

export default function promisify<T>(func: Param<T>): Return<T> {
  throw 'Not implemented';
}
