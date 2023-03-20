/**
 * Iterates through an array of items with an asynchronous mapping function that returns a promise.
 *
 * @param items {Array<any>} An array of items.
 * @param mapFn {function} A function that returns a promise and accept at least one argument
 * @param limit {number} Number of concurrent tasks to run. Defaults to unlimited
 *
 * @return {Promise} A promise that will resolve when mapping is done
 */
async function mapAsync(items, mapFn, limit) {
  function mapAsyncChunk(items) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const mappedItems = Array(items.length).fill(null);
      items.forEach((item, index) => {
        mapFn(item).then((value) => {
          mappedItems[index] = value;
          count++;
          if (count === items.length) {
            resolve(mappedItems);
          }
        });
      });
      // TODO: Handle reject
    });
  }

  if (!limit) {
    limit = items.length;
  }

  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = await mapAsyncChunk(items.slice(i, i + limit));
    results.push(...chunk);
  }

  return results;
}

function mapAsync(items, mapFn, limit) {
  return new Promise((resolve, reject) => {
    if (items.length) {
    }
    let fulfilled = 0;
    const results = Array(items.length).fill(null);

    function next() {
      if (fulfilled < items.length) {
        mapFnWrapper(fulfilled);
        return;
      }
      if (fulfilled === items.length) {
        resolve(results);
      }
    }

    function mapFnWrapper(index) {
      mapFn(items[index]).then((value) => {
        results[index] = value;
        fulfilled++;
        next();
      });
    }

    for (let i = 0; i < Math.min(limit, items.length); i++) {
      mapFnWrapper(i);
    }

    next();
  });
}

const items = [42, 43, 75, 34];

// Track number of ongoing promises
let numberOfOngoingPromises = 0;

/** Resolves to the same number we pass in a random time in future */
function randomResolver(number) {
  numberOfOngoingPromises += 1;
  console.assert(numberOfOngoingPromises <= 2);
  return new Promise((resolve) =>
    setTimeout(() => resolve(number), Math.random() * 500),
  ).then((result) => {
    console.assert(numberOfOngoingPromises <= 2);
    numberOfOngoingPromises -= 1;
    return result;
  });
}

const start = Date.now();
mapAsync(items, randomResolver, 2).then((result) => {
  const duration = Date.now() - start;
  console.assert(
    JSON.stringify(result) === JSON.stringify(items),
    'resolves to the same values',
  );
  console.assert(duration <= 1000, 'resolves in less than 1 second');
  console.log('result', result);
  console.log('duration', duration);
});
