export default function promiseMerge(
  p1: Promise<unknown>,
  p2: Promise<unknown>,
): Promise<unknown> {
  let unresolved = 2;
  let p1Result: unknown, p2Result: unknown;

  return new Promise((resolve, reject) => {
    function then() {
      unresolved--;
      if (unresolved === 0) {
        resolve(mergeResult(p1Result, p2Result));
      }
    }

    p1.then((result) => {
      p1Result = result;
      then();
    }).catch(reject);
    p2.then((result) => {
      p2Result = result;
      then();
    }).catch(reject);
  });
}

function mergeResult(result1: unknown, result2: unknown): unknown {
  try {
    if (typeof result1 === 'number' && typeof result2 === 'number') {
      return result1 + result2;
    }

    if (typeof result1 === 'string' && typeof result2 === 'string') {
      return result1 + result2;
    }

    if (Array.isArray(result1) && Array.isArray(result2)) {
      return [...result1, ...result2];
    }

    if (isPlainObject(result1) && isPlainObject(result2)) {
      return { ...(result1 as Object), ...(result2 as Object) };
    }

    throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}

function isPlainObject(value: unknown): boolean {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
