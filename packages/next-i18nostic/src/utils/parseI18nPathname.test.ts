import parseI18nPathname from './parseI18nPathname';

describe('parseI18nPathname', () => {
  test('pathname does not start with a locale', () => {
    expect(parseI18nPathname('/')).toEqual({
      locale: 'en',
      pathname: '/',
    });
    expect(parseI18nPathname('/about')).toEqual({
      locale: 'en',
      pathname: '/about',
    });
    expect(parseI18nPathname('/about/')).toEqual({
      locale: 'en',
      pathname: '/about/',
    });
  });

  describe('pathname starts with a locale', () => {
    test('default locale', () => {
      expect(parseI18nPathname('/en')).toEqual({
        locale: 'en',
        pathname: '/',
      });
      expect(parseI18nPathname('/en/')).toEqual({
        locale: 'en',
        pathname: '/',
      });
      expect(parseI18nPathname('/en/about')).toEqual({
        locale: 'en',
        pathname: '/about',
      });
      expect(parseI18nPathname('/en/about/')).toEqual({
        locale: 'en',
        pathname: '/about/',
      });
    });

    test('non-default locale', () => {
      expect(parseI18nPathname('/zh-CN')).toEqual({
        locale: 'zh-CN',
        pathname: '/',
      });
      expect(parseI18nPathname('/zh-CN/')).toEqual({
        locale: 'zh-CN',
        pathname: '/',
      });
      expect(parseI18nPathname('/zh-CN/about')).toEqual({
        locale: 'zh-CN',
        pathname: '/about',
      });
      expect(parseI18nPathname('/zh-CN/about/')).toEqual({
        locale: 'zh-CN',
        pathname: '/about/',
      });
    });
  });
});
