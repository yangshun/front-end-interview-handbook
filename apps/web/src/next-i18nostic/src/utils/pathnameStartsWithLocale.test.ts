import pathnameStartsWithLocale from './pathnameStartsWithLocale';

describe('pathnameStartsWithLocale', () => {
  test('pathname is exactly the locale', () => {
    const result = pathnameStartsWithLocale('/en', 'en');

    expect(result).toBe(true);
  });

  test('pathname starts with the locale and has additional segments', () => {
    const result = pathnameStartsWithLocale(`/en/about`, 'en');

    expect(result).toBe(true);
  });

  test('pathname starts with a different locale', () => {
    const result = pathnameStartsWithLocale('/fr/about', 'en');

    expect(result).toBe(false);
  });

  test('pathname does not start with a locale', () => {
    const result = pathnameStartsWithLocale('/about', 'en');

    expect(result).toBe(false);
  });
});
