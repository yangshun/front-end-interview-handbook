type Fn<T> = (this: any, ...args: Array<any>) => T;

export default function once<T>(func: Fn<T>): Fn<T> {
  let ranOnce = false;
  let value: T;

  return function (...args): T {
    if (!ranOnce) {
      value = func.apply(this, args);
      ranOnce = true;
    }

    return value;
  };
}
