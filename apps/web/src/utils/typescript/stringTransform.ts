export function staticLowerCase<T extends string>(val: T): Lowercase<T> {
  return val.toLowerCase() as Lowercase<T>;
}

export function staticUpperCase<T extends string>(val: T): Uppercase<T> {
  return val.toUpperCase() as Uppercase<T>;
}
