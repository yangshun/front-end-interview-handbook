function shouldDeepCompare(type: string) {
  return type === '[object Object]' || type === '[object Array]';
}

function getType(value: unknown): string {
  return Object.prototype.toString.call(value);
}

export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  // Check for arrays/objects equality.
  const type1 = getType(valueA);
  const type2 = getType(valueB);

  // Only compare the contents if they're both arrays or both objects.
  if (type1 === type2 && shouldDeepCompare(type1) && shouldDeepCompare(type2)) {
    const entriesA = Object.entries(valueA as Array<unknown> | Object);
    const entriesB = Object.entries(valueB as Array<unknown> | Object);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(
      // Make sure the other object has the same properties defined.
      ([key, value]) =>
        Object.hasOwn(valueB as Array<unknown> | Object, key) &&
        deepEqual(value, (valueB as any)[key]),
    );
  }

  // Check for primitives + type equality.
  return Object.is(valueA, valueB);
}
