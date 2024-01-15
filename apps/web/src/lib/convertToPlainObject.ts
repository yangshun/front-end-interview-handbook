/*
 * To strip certain disallowed values like Symbols from object keys
 * in Prisma extended objects so that they can be passed between the
 * server/client boundary.
 * https://github.com/prisma/prisma/issues/20627
 */
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
