import i18nHref from './i18nHref';

describe('i18nHref', () => {
  test('empty pathname', () => {
    expect(i18nHref({ pathname: null }, 'en')).toEqual({ pathname: null });
  });

  test('should return the href unchanged for external URLs', () => {
    const httpHref = 'http://example.com';

    expect(i18nHref(httpHref, 'en')).toEqual(httpHref);

    const httpsHref = 'https://example.com';

    expect(i18nHref(httpsHref, 'en')).toEqual(httpsHref);

    const mailtoHref = 'mailto:john@gmail.com';

    expect(i18nHref(mailtoHref, 'en')).toEqual(mailtoHref);
  });

  describe('non-localized paths', () => {
    test('should not add the locale prefix for default locale', () => {
      expect(i18nHref('/', 'en')).toEqual('/');
      expect(i18nHref('/about', 'en')).toEqual('/about');
    });

    test('should add the locale prefix for non-default locale', () => {
      expect(i18nHref('/', 'zh-CN')).toEqual('/zh-CN');
      expect(i18nHref('/about', 'zh-CN')).toEqual('/zh-CN/about');
    });
  });

  describe('localized paths', () => {
    test('should not add default locale', () => {
      expect(i18nHref('/', 'en')).toEqual('/');
      expect(i18nHref('/about', 'en')).toEqual('/about');
    });

    test('should preserve existing locale prefix', () => {
      expect(i18nHref('/zh-CN', 'zh-CN')).toEqual('/zh-CN');
      expect(i18nHref('/zh-CN/about', 'zh-CN')).toEqual('/zh-CN/about');
    });

    describe('should convert locale prefix to new locale', () => {
      test('default locale should not be present', () => {
        expect(i18nHref('/zh-CN', 'en')).toEqual('/');
        expect(i18nHref('/zh-CN/about', 'en')).toEqual('/about');
      });

      test('non-default locale', () => {
        expect(i18nHref('/zh-CN/about', 'en')).toEqual('/about');
        expect(i18nHref('/zh-CN/about', 'fr')).toEqual('/fr/about');
      });
    });
  });

  describe('with query and search', () => {
    describe('query params', () => {
      expect(i18nHref('/about?foo=1', 'en')).toEqual('/about?foo=1');
      expect(i18nHref('/about?foo=1', 'zh-CN')).toEqual('/zh-CN/about?foo=1');
    });

    describe('hash', () => {
      expect(i18nHref('/about#bar', 'en')).toEqual('/about#bar');
      expect(i18nHref('/about#bar', 'zh-CN')).toEqual('/zh-CN/about#bar');
    });

    describe('mixture', () => {
      expect(i18nHref('/about#bar?foo=1', 'en')).toEqual('/about#bar?foo=1');
      expect(i18nHref('/about#bar?foo=1', 'zh-CN')).toEqual(
        '/zh-CN/about#bar?foo=1',
      );
    });
  });

  test('Url objects', () => {
    expect(
      i18nHref(
        {
          hostname: 'example.com',
          pathname: '/about',
        },
        'en',
      ),
    ).toEqual({
      hostname: 'example.com',
      pathname: '/about',
    });

    expect(
      i18nHref(
        {
          hostname: 'example.com',
          pathname: '/about',
        },
        'zh-CN',
      ),
    ).toEqual({
      hostname: 'example.com',
      pathname: '/zh-CN/about',
    });

    expect(
      i18nHref(
        {
          hostname: 'example.com',
          pathname: '/about',
          query: { foo: 1 },
        },
        'zh-CN',
      ),
    ).toEqual({
      hostname: 'example.com',
      pathname: '/zh-CN/about',
      query: { foo: 1 },
    });
  });
});
