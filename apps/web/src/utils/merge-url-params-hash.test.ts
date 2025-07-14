import { mergeURLWithCurrentParamsHash } from './merge-url-params-hash';

describe('mergeURLWithCurrentParamsHash', () => {
  const originalWindow = { ...window };

  beforeEach(() => {
    // @ts-expect-error Testing
    delete window.location;
    // @ts-expect-error Re-define window.location so we can customize it
    window.location = {
      hash: '',
      search: '',
    } as Location;
  });

  afterEach(() => {
    // Restore original window.location
    // @ts-expect-error Override for testing
    window.location = originalWindow.location;
  });

  test('returns the original href if window is undefined', () => {
    const originalWindow_ = global.window;

    // @ts-expect-error Testing
    delete global.window;

    const result = mergeURLWithCurrentParamsHash('/path');

    expect(result).toBe('/path');
    global.window = originalWindow_;
  });

  test('merges search params when href has none', () => {
    window.location.search = '?foo=1&bar=2';
    window.location.hash = '';

    const result = mergeURLWithCurrentParamsHash('/path');

    expect(result).toBe('/path?foo=1&bar=2');
  });

  test('merges search params when href already has some (window overrides matching keys)', () => {
    window.location.search = '?foo=window&baz=3';
    window.location.hash = '';

    const result = mergeURLWithCurrentParamsHash('/path?foo=href&bar=2');

    // Foo should be "window", bar remains, baz added
    expect(result).toBe('/path?foo=window&bar=2&baz=3');
  });

  test('merges hash when href has no hash', () => {
    window.location.search = '';
    window.location.hash = '#section1';

    const result = mergeURLWithCurrentParamsHash('/path');

    expect(result).toBe('/path#section1');
  });

  test('keeps href hash when already present', () => {
    window.location.search = '';
    window.location.hash = '#shouldNotBeUsed';

    const result = mergeURLWithCurrentParamsHash('/path#existing');

    expect(result).toBe('/path#existing');
  });

  test('merges both search params and hash', () => {
    window.location.search = '?foo=1';
    window.location.hash = '#hash';

    const result = mergeURLWithCurrentParamsHash('/path?bar=2');

    expect(result).toBe('/path?bar=2&foo=1#hash');
  });

  test('returns path without search or hash if none present', () => {
    window.location.search = '';
    window.location.hash = '';

    const result = mergeURLWithCurrentParamsHash('/path');

    expect(result).toBe('/path');
  });
});
