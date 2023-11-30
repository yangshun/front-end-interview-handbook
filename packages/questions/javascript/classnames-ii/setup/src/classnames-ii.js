/**
 * @param {...(any|Object|Array<any|Object|Array>|Function)} args
 * @return {string}
 */
export default function classNames(...args) {
  const classes = new Set();

  function classNamesImpl(...args) {
    args.forEach((arg) => {
      // Ignore falsey values.
      if (!arg) {
        return;
      }

      const argType = typeof arg;

      // Handle string and numbers.
      if (argType === 'string' || argType === 'number') {
        classes.add(String(arg));
        return;
      }

      // Handle functions.
      if (argType === 'function') {
        const result = arg();
        if (!result) {
          return;
        }

        classes.add(String(result));
      }

      // Handle arrays.
      if (Array.isArray(arg)) {
        for (const cls of arg) {
          classNamesImpl(cls);
        }

        return;
      }

      // Handle objects.
      if (argType === 'object') {
        for (const key in arg) {
          // Only process non-inherited keys.
          if (Object.hasOwn(arg, key)) {
            arg[key] ? classes.add(key) : classes.delete(key);
          }
        }

        return;
      }
    });
  }

  classNamesImpl(args);

  return Array.from(classes).join(' ');
}
