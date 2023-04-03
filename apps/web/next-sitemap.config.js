// @ts-check

import codingQuestionsList from './src/__generated__/questions/coding/list.en.json' assert { type: 'json' };

const priority = 0.7;
const changefreq = 'daily';

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: `https://www.greatfrontend.com`,
  exclude: [
    '/dev__/*',
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
  additionalPaths: async (config) =>
    await Promise.all(
      codingQuestionsList.map(
        async ({ href }) => await config.transform(config, href),
      ),
    ),
};
