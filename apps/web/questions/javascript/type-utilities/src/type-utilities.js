export function isBoolean(value) {
  return value === true || value === false;
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isNull(value) {
  return value === null;
}

export function isString(value) {
  return typeof value === 'string';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function isUndefined(value) {
  return value === undefined;
}
