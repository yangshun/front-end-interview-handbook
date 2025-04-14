export function isBoolean(value: unknown): boolean {
  return value === true || value === false;
}

export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

export function isNull(value: unknown): boolean {
  return value === null;
}

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}

export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
