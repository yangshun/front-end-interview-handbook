export default function promiseReject<T = never>(reason: any): Promise<T> {
  return new Promise((_, reject) => reject(reason));
}
