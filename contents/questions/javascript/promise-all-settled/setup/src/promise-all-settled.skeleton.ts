interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

export default function promiseAllSettled<T>(
  iterable: Array<T>,
): Promise<Array<PromiseFulfilledResult<T> | PromiseRejectedResult>> {
  throw 'Not implemented!';
}
