// @ts-check

import codingQuestionsList from './src/__generated__/questions/coding/list.en-US.json' assert { type: 'json' };
import { allPosts, allSeries } from './.contentlayer/generated/index.mjs';
import i18nConfig from './next-i18nostic.config.cjs';

const priority = 0.7;
const changefreq = 'daily';
const siteUrl = 'https://www.greatfrontend.com';

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl,
  exclude: [
    '/dev__/*',
    '/design-system',
    '/logout',
    '/password/reset',
    '/payment/success',
    '/profile',
    '/profile/*',
  ],
  priority,
  changefreq,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    const maybeLocale = path.split('/').filter(Boolean)[0];

    if (
      maybeLocale !== i18nConfig.defaultLocale &&
      i18nConfig.locales.includes(maybeLocale)
    ) {
      return undefined;
    }

    return {
      loc: path.replace(new RegExp(`^/${i18nConfig.defaultLocale}`), ''),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: i18nConfig.locales
        .filter((locale) => locale !== i18nConfig.defaultLocale)
        .map((locale) => ({
          href: `${siteUrl}/${locale}`,
          hreflang: i18nConfig.localeHrefLangs[locale],
        })),
    };
  },
  additionalPaths: async (config) => {
    const paths = [
      ...codingQuestionsList.map(({ href }) => href),
      // Question list pages.
      '/get-started',
      '/prepare',
      '/prepare/behavioral',
      '/prepare/coding',
      '/prepare/quiz',
      '/prepare/system-design',
      '/questions/quiz',
      '/questions/react',
      '/questions/angular',
      '/questions/svelte',
      '/questions/system-design',
      '/questions/vanilla',
      '/focus-areas',
      '/study-plans',
      // Marketing pages.
      '/',
      '/affiliates',
      '/contact',
      '/faq',
      '/pricing',
      '/promotions',
      '/jobs',
      // About the company.
      '/about',
      '/team',
      // Legal.
      '/legal/privacy-policy',
      '/legal/terms',
      // Misc.
      '/login',
      '/sign-up',
      // Blog
      '/blog',
      '/blog/explore',
      '/blog/latest',
      ...allPosts.map(({ href }) => href),
      ...allSeries.map(({ href }) => href),
    ];

    return await Promise.all(
      paths.map(async (href) => await config.transform(config, href)),
    );
  },
};
