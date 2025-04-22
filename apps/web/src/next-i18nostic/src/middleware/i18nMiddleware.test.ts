import { NextRequest, NextResponse } from 'next/server';
import nextI18nosticConfig from 'next-i18nostic/config';

import i18nMiddleware from './i18nMiddleware';

const { defaultLocale, locales } = nextI18nosticConfig;
const nonDefaultLocale = locales.find((l) => l !== defaultLocale) ?? 'pt-BR'; // Use pt-BR as fallback if only default exists

describe('i18nMiddleware', () => {
  describe("pathname doesn't contain locale", () => {
    test('rewrites to default locale', () => {
      const req = new NextRequest('https://www.example.com');
      const res = i18nMiddleware(req);

      expect(res).toBeInstanceOf(NextResponse);
      expect(res?.headers.get('x-middleware-rewrite')).toBe(
        `https://www.example.com/${defaultLocale}`,
      );
    });
  });

  describe('pathname contains locale', () => {
    test('only contains locale', () => {
      const req = new NextRequest(
        `https://www.example.com/${nonDefaultLocale}`,
      );
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    test('contains locale and path', () => {
      const req = new NextRequest(
        `https://www.example.com/${nonDefaultLocale}/products`,
      );
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    test('contains query string', () => {
      const req = new NextRequest(
        `https://www.example.com/${nonDefaultLocale}/products?foo=bar`,
      );
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    describe('starts with default locale', () => {
      test('only contains locale', () => {
        const req = new NextRequest(`https://www.example.com/${defaultLocale}`);
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('location')).toBe('https://www.example.com/');
      });

      test('contains locale and path', () => {
        const req = new NextRequest(
          `https://www.example.com/${defaultLocale}/products`,
        );
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('location')).toBe(
          'https://www.example.com/products',
        );
      });

      test('contains query string', () => {
        const req = new NextRequest(
          `https://www.example.com/${defaultLocale}/products?foo=bar`,
        );
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('location')).toBe(
          'https://www.example.com/products?foo=bar',
        );
      });
    });
  });

  describe('rewrites', () => {
    describe('default locale', () => {
      describe('matching rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/products');
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products/list`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/products?foo=bar',
          );
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products/list?foo=bar`,
          );
        });
      });

      describe('unmatched rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/products');
          const res = i18nMiddleware(req, {
            '/checkout': '/cart',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/products?foo=bar',
          );
          const res = i18nMiddleware(req, {
            '/checkout': '/cart',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products?foo=bar`,
          );
        });
      });
    });

    describe('non-default locale', () => {
      describe('matching rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products`,
          );
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${nonDefaultLocale}/products/list`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products?foo=bar`,
          );
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${nonDefaultLocale}/products/list?foo=bar`,
          );
        });
      });

      describe('unmatched rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products`,
          );
          const res = i18nMiddleware(req, {
            '/checkout': '/cart',
          });

          expect(res).toBe(null);
        });

        test('query string', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products?foo=bar`,
          );
          const res = i18nMiddleware(req, {
            '/checkout': '/cart',
          });

          expect(res).toBe(null);
        });
      });
    });
  });
});
