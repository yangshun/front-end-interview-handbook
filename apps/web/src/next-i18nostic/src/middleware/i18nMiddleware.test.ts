import nextI18nosticConfig from 'next-i18nostic/config';
import { NextRequest, NextResponse } from 'next/server';

import i18nMiddleware from './i18nMiddleware';

const { defaultLocale, locales } = nextI18nosticConfig;
const nonDefaultLocale =
  locales.find((locale) => locale !== defaultLocale) ?? 'pt-BR'; // Use pt-BR as fallback if only default exists

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
        expect(res?.status).toBe(307);
        expect(res?.headers.get('location')).toBe('https://www.example.com/');
      });

      test('contains locale and path', () => {
        const req = new NextRequest(
          `https://www.example.com/${defaultLocale}/products`,
        );
        const res = i18nMiddleware(req);

        expect(res).toBeInstanceOf(NextResponse);
        expect(res?.status).toBe(307);
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
            rewrites: {
              '/products': '/products/list',
            },
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
            rewrites: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products/list?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest('https://www.example.com/api/users/123');
          const res = i18nMiddleware(req, {
            rewrites: {
              '/docs/:path*': '/help/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/api/users/123`,
          );
        });
      });

      describe('unmatched rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/products');
          const res = i18nMiddleware(req, {
            rewrites: {
              '/checkout': '/cart',
            },
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
            rewrites: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/products?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest('https://www.example.com/api/users/123');
          const res = i18nMiddleware(req, {
            rewrites: {
              '/docs/:path*': '/help/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${defaultLocale}/api/users/123`,
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
            rewrites: {
              '/products': '/products/list',
            },
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
            rewrites: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${nonDefaultLocale}/products/list?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/api/users/123`,
          );
          const res = i18nMiddleware(req, {
            rewrites: {
              '/api/:path*': '/internal-api/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/${nonDefaultLocale}/internal-api/users/123`,
          );
        });
      });

      describe('unmatched rewrite', () => {
        test('pathname', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products`,
          );
          const res = i18nMiddleware(req, {
            rewrites: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBe(null);
        });

        test('query string', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/products?foo=bar`,
          );
          const res = i18nMiddleware(req, {
            rewrites: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBe(null);
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            `https://www.example.com/${nonDefaultLocale}/api/users/123`,
          );
          const res = i18nMiddleware(req, {
            rewrites: {
              '/docs/:path*': '/help/:path*',
            },
          });

          expect(res).toBe(null);
        });
      });
    });
  });

  describe('redirects', () => {
    describe('default locale', () => {
      describe('matching redirect', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/products');
          const res = i18nMiddleware(req, {
            redirects: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/products/list`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/products?foo=bar',
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/products/list?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            'https://www.example.com/old-api/users/123',
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/old-api/:path*': '/new-api/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/new-api/users/123`,
          );
        });
      });

      describe('unmatched redirect', () => {
        test('pathname', () => {
          const req = new NextRequest('https://www.example.com/products');
          const res = i18nMiddleware(req, {
            redirects: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/products`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            'https://www.example.com/products?foo=bar',
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/products?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            'https://www.example.com/old-api/users/123',
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/docs/:path*': '/help/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(200);
          expect(res?.headers.get('x-middleware-rewrite')).toBe(
            `https://www.example.com/en-US/old-api/users/123`,
          );
        });
      });
    });

    describe('non-default locale', () => {
      describe('matching redirect', () => {
        test('pathname', () => {
          const req = new NextRequest(`https://www.example.com/zh-CN/products`);
          const res = i18nMiddleware(req, {
            redirects: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(307);
          expect(res?.headers.get('location')).toBe(
            `https://www.example.com/zh-CN/products/list`,
          );
        });

        test('query string', () => {
          const req = new NextRequest(
            `https://www.example.com/zh-CN/products?foo=bar`,
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/products': '/products/list',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(307);
          expect(res?.headers.get('location')).toBe(
            `https://www.example.com/zh-CN/products/list?foo=bar`,
          );
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            `https://www.example.com/zh-CN/old-api/users/123`,
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/old-api/:path*': '/new-api/:path*',
            },
          });

          expect(res).toBeInstanceOf(NextResponse);
          expect(res?.status).toBe(307);
          expect(res?.headers.get('location')).toBe(
            `https://www.example.com/zh-CN/new-api/users/123`,
          );
        });
      });

      describe('unmatched redirect', () => {
        test('pathname', () => {
          const req = new NextRequest(`https://www.example.com/zh-CN/products`);
          const res = i18nMiddleware(req, {
            redirects: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBe(null);
        });

        test('query string', () => {
          const req = new NextRequest(
            `https://www.example.com/zh-CN/products?foo=bar`,
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/checkout': '/cart',
            },
          });

          expect(res).toBe(null);
        });

        test('dynamic path', () => {
          const req = new NextRequest(
            `https://www.example.com/zh-CN/old-api/users/123`,
          );
          const res = i18nMiddleware(req, {
            redirects: {
              '/docs/:path*': '/help/:path*',
            },
          });

          expect(res).toBe(null);
        });
      });
    });
  });
});
