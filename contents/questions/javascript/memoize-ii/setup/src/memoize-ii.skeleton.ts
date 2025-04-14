type Fn<T> = (this: any, ...args: Array<any>) => T;

export default function memoize<T>(func: Fn<T>): Fn<T> {
  throw 'Not implemented';
}
