import { describe, expect, test } from 'vitest';

import parseI18nPathname from './parseI18nPathname';

describe('parseI18nPathname', () => {
  test('pathname does not start with a locale', () => {
    expect(parseI18nPathname('/')).toEqual({
      locale: 'en-US',
      pathname: '/',
    });
    expect(parseI18nPathname('/about')).toEqual({
      locale: 'en-US',
      pathname: '/about',
    });
    expect(parseI18nPathname('/about/')).toEqual({
      locale: 'en-US',
      pathname: '/about/',
    });
  });

  describe('pathname starts with a locale', () => {
    test('default locale', () => {
      expect(parseI18nPathname('/en-US')).toEqual({
        locale: 'en-US',
        pathname: '/',
      });
      expect(parseI18nPathname('/en-US/')).toEqual({
        locale: 'en-US',
        pathname: '/',
      });
      expect(parseI18nPathname('/en-US/about/')).toEqual({
        locale: 'en-US',
        pathname: '/about/',
      });
    });
  });
});

expect(parseI18nPathname('/en-US/about/')).toEqual({
  locale: 'en-US',
  pathname: '/about/',
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
