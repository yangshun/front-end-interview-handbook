function deepOmitKeys(obj, keys) {
  const keysSet = new Set(keys);

  function omitKeys(curr) {
    if (typeof curr !== 'object' || curr == null) {
      return [false, curr];
    }

    const newObject = {};
    let hasAnyKeyChanged = false;

    Object.keys(curr).forEach((key) => {
      if (keysSet.has(key)) {
        hasAnyKeyChanged = true;
        return;
      }

      const value = curr[key];
      if (Array.isArray(value)) {
        const arrayRes = value.map((val) => omitKeys(val));
        const changed = arrayRes.map((pair) => pair[0]).includes(true);
        const newArrayValues = arrayRes.map((pair) => pair[1]);
        if (changed) {
          hasAnyKeyChanged = true;
        }
        newObject[key] = newArrayValues;
        return;
      }

      if (typeof value === 'object') {
        const [hasObjectChanged, newObjectValues] = omitKeys(value);
        if (hasObjectChanged) {
          hasAnyKeyChanged = true;
        }
        newObject[key] = newObjectValues;
        return;
      }

      newObject[key] = value;
    });

    return [hasAnyKeyChanged, hasAnyKeyChanged ? newObject : curr];
  }

  return omitKeys(obj)[1];
}

var i1 = { a: 1, b: 2 };
var o1 = deepOmitKeys(i1, ['a']);

console.log('case 1', i1, o1); // i1 should remain unchanged

var i2 = { a: 1, b: 2, c: { a: 1, b: 1, d: 1 } };
var o2 = deepOmitKeys(i2, ['a', 'b']);

console.log('case 2', i2, o2);

var i3 = { a: 1, b: { c: 2 } };
var o3 = deepOmitKeys(i3, ['a']);

console.log('case 3', i3, o3);
console.log('case 3 - condition', i3['b'] === o3.b); // should be true

var i4 = { a: 1, b() {} };
var o4 = deepOmitKeys(i4, ['a']);

console.log('case 4', i4, o4);
console.log('case 4 - condition', i4['b'] === o4.b);

var i5 = {
  a: 1,
  c: {
    a: [1, 2],
    b: [
      { a: 1, x: 2, y: 3 },
      { a: 2, x: 20, y: 30 },
    ],
  },
  d: {
    b: [
      { a: 1, x: 2, y: 3 },
      { x: 20, y: 30 },
    ],
  },
};

var o5 = deepOmitKeys(i5, ['a']);

console.log('case 5', i5, o5);
console.log('case 5 - condition', o5.d.b[1] === i5['d'].b[1]);

var i6 = { a: 1, b: null };
var o6 = deepOmitKeys(i6, []);

console.log('case 6 - condition', i6 === o6); // should be true

var i7 = { a: 1, b: null };
var o7 = deepOmitKeys(i7, ['c']);

console.log('case 7 - condition', i7 === o7); // should be true
