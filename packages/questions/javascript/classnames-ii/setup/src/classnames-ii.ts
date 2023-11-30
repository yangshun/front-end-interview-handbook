export type ClassValue =
  | ClassArray
  | ClassDictionary
  | Function
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const classes: Set<string> = new Set();

  function classNamesImpl(...args: Array<ClassValue>) {
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
        const result = (arg as Function)();
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
        const objArg = arg as ClassDictionary;
        for (const key in objArg) {
          // Only process non-inherited keys.
          if (Object.hasOwn(objArg, key)) {
            objArg[key] ? classes.add(key) : classes.delete(key);
          }
        }

        return;
      }
    });
  }

  classNamesImpl(args);

  return Array.from(classes).join(' ');
}
