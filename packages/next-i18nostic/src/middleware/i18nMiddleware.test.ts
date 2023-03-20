import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
    });
  });

  describe('rewrites', () => {
    describe('default locale', () => {
      test('matching rewrite', () => {
        const req = new NextRequest('https://www.example.com/products');
        const res = i18nMiddleware(req, {
          '/products': '/products/list',
        });

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('x-middleware-rewrite')).toBe(
          'https://www.example.com/en/products/list',
        );
      });

      test('unmatched rewrite', () => {
        const req = new NextRequest('https://www.example.com/products');
        const res = i18nMiddleware(req, {
          '/checkout': '/cart',
        });

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('x-middleware-rewrite')).toBe(
          'https://www.example.com/en/products',
        );
      });
    });

    describe('non-default locale', () => {
      test('matching rewrite', () => {
        const req = new NextRequest('https://www.example.com/zh-CN/products');
        const res = i18nMiddleware(req, {
          '/products': '/products/list',
        });

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.headers.get('x-middleware-rewrite')).toBe(
          'https://www.example.com/zh-CN/products/list',
        );
      });

      test('unmatched rewrite', () => {
        const req = new NextRequest('https://www.example.com/zh-CN/products');
        const res = i18nMiddleware(req, {
          '/checkout': '/cart',
        });

        expect(res).toBe(null);
      });
    });
  });
});
