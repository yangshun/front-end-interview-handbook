import { NextRequest, NextResponse } from 'next/server';

import i18nMiddleware from './i18nMiddleware';

describe('i18nMiddleware', () => {
  describe("pathname doesn't contain locale", () => {
    test('rewrites to default locale', () => {
      const req = new NextRequest('https://www.example.com');
      const res = i18nMiddleware(req);

      expect(res).toBeInstanceOf(NextResponse);
      expect(res?.headers.get('x-middleware-rewrite')).toBe(
        'https://www.example.com/en',
      );
    });
  });

  describe('pathname contains locale', () => {
    test('only contains locale', () => {
      const req = new NextRequest('https://www.example.com/fr');
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    test('contains locale and path', () => {
      const req = new NextRequest('https://www.example.com/fr/products');
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    test('contains query string', () => {
      const req = new NextRequest(
        'https://www.example.com/fr/products?foo=bar',
      );
      const res = i18nMiddleware(req);

      expect(res).toBe(null);
    });

    describe('starts with default locale', () => {
      test('only contains locale', () => {
        const req = new NextRequest('https://www.example.com/en');
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('location')).toBe('https://www.example.com/');
      });

      test('contains locale and path', () => {
        const req = new NextRequest('https://www.example.com/en/products');
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('location')).toBe(
          'https://www.example.com/products',
        );
      });

      test('contains query string', () => {
        const req = new NextRequest(
          'https://www.example.com/en/products?foo=bar',
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
            'https://www.example.com/en/products/list',
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
            'https://www.example.com/en/products/list?foo=bar',
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
            'https://www.example.com/en/products',
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
            'https://www.example.com/en/products?foo=bar',
          );
        });
      });
    });

    describe('non-default locale', () => {
      describe('matching rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/zh-CN/products');
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            'https://www.example.com/zh-CN/products/list',
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/zh-CN/products?foo=bar',
          );
          const res = i18nMiddleware(req, {
            '/products': '/products/list',
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            'https://www.example.com/zh-CN/products/list?foo=bar',
          );
        });
      });

      describe('unmatched rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/zh-CN/products');
          const res = i18nMiddleware(req, {
            '/checkout': '/cart',
          });

          expect(res).toBe(null);
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/zh-CN/products?foo=bar',
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
