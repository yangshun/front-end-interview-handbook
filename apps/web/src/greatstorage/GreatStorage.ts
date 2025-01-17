/* eslint-disable @typescript-eslint/consistent-type-definitions */
const version = 1;

interface BaseValueObject {
  expiry?: number | null; // Unix time
  v: typeof version;
  value: string;
}

interface ValueObjectNumber extends BaseValueObject {
  type: 'number';
}

interface ValueObjectString extends BaseValueObject {
  type: 'string';
}

interface ValueObjectBoolean extends BaseValueObject {
  type: 'boolean';
}

interface ValueObjectObject extends BaseValueObject {
  type: 'object';
}

interface ValueObjectArray extends BaseValueObject {
  type: 'array';
}

interface ValueObjectSet extends BaseValueObject {
  type: 'set';
}

type ValueObject =
  | ValueObjectArray
  | ValueObjectBoolean
  | ValueObjectNumber
  | ValueObjectObject
  | ValueObjectSet
  | ValueObjectString;

const IS_SERVER = typeof window === 'undefined';

export default class GreatStorage {
  namespace: string | undefined;
  storage: Storage | undefined; // TODO: add in-memory version so that it can run on the server

  constructor(opts: { namespace?: string; storage?: Storage } = {}) {
    this.namespace = opts.namespace; // TODO: Don't allow `:`
    if (!IS_SERVER) {
      this.storage = opts.storage ?? window.localStorage;
    }
  }

  getNamespacedKey(key: string) {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  getItem<T = unknown>(keyParam: string): T | null {
    const key = this.getNamespacedKey(keyParam);

    const valueObjString: string | null = this.storage?.getItem(key) ?? null;

    if (valueObjString == null) {
      return null;
    }

    try {
      const valueObj: ValueObject = JSON.parse(valueObjString);

      if (valueObj.expiry && new Date(valueObj.expiry) < new Date()) {
        // Object has expired
        this.removeItem(key);

        return null;
      }

      switch (valueObj.type) {
        case 'number': {
          return Number(valueObj.value) as T;
        }
        case 'string': {
          return valueObj.value as T;
        }
        case 'boolean': {
          return (valueObj.value === 'true') as T;
        }
        case 'array':
        case 'object': {
          return JSON.parse(valueObj.value) as T;
        }
        case 'set': {
          return new Set(JSON.parse(valueObj.value)) as T;
        }
      }
    } catch (err) {
      return null;
    }
  }

  setItem(
    keyParam: string,
    value: unknown,
    opts?: Readonly<{
      ttl?: number; // Seconds in the future
    }>,
  ) {
    const key = this.getNamespacedKey(keyParam);

    const valueObj: ValueObject = (() => {
      switch (typeof value) {
        case 'number': {
          const valueObj_: ValueObjectNumber = {
            type: 'number',
            v: version,
            value: String(value),
          };

          return valueObj_;
        }
        case 'string': {
          const valueObj_: ValueObjectString = {
            type: 'string',
            v: version,
            value,
          };

          return valueObj_;
        }
        case 'boolean': {
          const valueObj_: ValueObjectBoolean = {
            type: 'boolean',
            v: version,
            value: String(value),
          };

          return valueObj_;
        }
        case 'object': {
          if (Array.isArray(value)) {
            const valueObj_: ValueObjectArray = {
              type: 'array',
              v: version,
              value: JSON.stringify(value),
            };

            return valueObj_;
          }

          if (value instanceof Set) {
            const valueObj_: ValueObjectSet = {
              type: 'set',
              v: version,
              value: JSON.stringify(Array.from(value)),
            };

            return valueObj_;
          }

          const valueObj_: ValueObjectObject = {
            type: 'object',
            v: version,
            value: JSON.stringify(value),
          };

          return valueObj_;
        }
        default: {
          throw `Unsupported type '${typeof value}' passed to GreatStorage.set()`;
        }
      }
    })();

    if (opts?.ttl) {
      const now = Date.now();

      valueObj.expiry = now + opts.ttl * 1000;
    }

    this.storage?.setItem(key, JSON.stringify(valueObj));
  }

  removeItem(keyParam: string): void {
    const key = this.getNamespacedKey(keyParam);

    this.storage?.removeItem(key);
  }
}
