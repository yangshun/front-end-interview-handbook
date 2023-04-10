export default function promiseAllSettled(
  iterable: Array<any>,
): Promise<
  { status: 'fulfilled'; value: any } | { status: 'rejected'; reason: any }
> {
  throw 'Not implemented!';
}
