export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const classes: Array<string> = [];

  function classNamesImpl(
    classesArr: Array<string>,
    ...args: Array<ClassValue>
  ) {
    args.forEach((arg) => {
      // Ignore falsey values.
      if (!arg) {
        return;
      }

      const argType = typeof arg;

      // Handle string and numbers.
      if (argType === 'string' || argType === 'number') {
        classesArr.push(String(arg));
        return;
      }

      // Handle arrays.
      if (Array.isArray(arg)) {
        for (const cls of arg) {
          classNamesImpl(classesArr, cls);
        }

        return;
      }

      // Handle objects.
      if (argType === 'object') {
        const objArg = arg as ClassDictionary;
        for (const key in objArg) {
          // Only process non-inherited keys.
          if (Object.hasOwn(objArg, key) && objArg[key]) {
            classesArr.push(key);
          }
        }

        return;
      }
    });
  }

  classNamesImpl(classes, ...args);

  return classes.join(' ');
}
