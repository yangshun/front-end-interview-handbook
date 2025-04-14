export default function jsonStringify(value: unknown): string {
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item));
    return `[${arrayValues.join(',')}]`;
  }

  if (typeof value === 'object' && value !== null) {
    const objectEntries = Object.entries(value).map(
      ([key, value]) => `"${key}":${jsonStringify(value)}`,
    );
    return `{${objectEntries.join(',')}}`;
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return String(value);
}
