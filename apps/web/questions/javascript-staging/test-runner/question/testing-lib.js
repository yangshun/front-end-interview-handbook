module.exports = {
  test: function (title, callback) {
    try {
      callback();
    } catch (ex) {
      console.log(title + ': Failed');
      console.log(ex);
      return;
    }

    console.log(title + ': Passed!');
  },

  expect: function (actual) {
    return {
      toBe: function (expected) {
        if (actual !== expected) {
          throw new Error(`Expected ${expected} but got ${actual}`);
        }
      },
    };
  },
};
