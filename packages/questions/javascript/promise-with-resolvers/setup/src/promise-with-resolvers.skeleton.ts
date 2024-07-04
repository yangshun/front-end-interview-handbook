export default function promiseWithResolvers<T>(): Readonly<{
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
}> {
  throw 'Not implemented';
}
