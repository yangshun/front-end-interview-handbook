import todoReplaceMeGFE from './todo-replace-me';
import todoReplaceMeGFEAlt from './todo-replace-me-alt';

// import { todoReplaceMe } from 'lodash';

// The purpose of this file is to:
// - Test for all the implementations.
// - Make sure Lodash's implementation can also pass our tests.

// Manually keep this file in sync with the unit tests.
describe('todoReplaceMe', () => {
  [todoReplaceMeGFE, todoReplaceMeGFEAlt].forEach((todoReplaceMe) => {
    // Sync with test.
    test('foo', () => {
      expect(todoReplaceMe(1)).toBe(2);
    });
  });
});
