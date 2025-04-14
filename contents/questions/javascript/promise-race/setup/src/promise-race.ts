export default function promiseRace<T extends readonly unknown[] | []>(
  iterable: T,
): Promise<Awaited<T[number]>> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      return;
    }

    iterable.forEach(async (item) => {
      try {
        const result = await item;
        resolve(result as Awaited<T[number]>);
      } catch (err) {
        reject(err);
      }
    });
  });
}
