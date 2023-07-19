export default function promiseAllSettled(
  iterable: Array<any>,
): Promise<
  Array<
    { status: 'fulfilled'; value: any } | { status: 'rejected'; reason: any }
  >
> {
  throw 'Not implemented!';
}
