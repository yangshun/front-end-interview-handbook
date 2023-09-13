/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 */
export default function promiseMerge(p1, p2) {
  let unresolved = 2;
  let p1Result, p2Result;

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

function mergeResult(result1, result2) {
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
      return { ...result1, ...result2 };
    }

    throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}

function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
