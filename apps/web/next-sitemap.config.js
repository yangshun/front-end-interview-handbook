// @ts-check

import allInterviewsStudyListMetadata from './.contentlayer/generated/InterviewsStudyList/_index.json' with { type: 'json' };
import allProjectsChallengeMetadata from './.contentlayer/generated/ProjectsChallengeMetadata/_index.json' with { type: 'json' };
import allProjectsSkillMetadata from './.contentlayer/generated/ProjectsSkillMetadata/_index.json' with { type: 'json' };
import allProjectsTrackMetadata from './.contentlayer/generated/ProjectsTrackMetadata/_index.json' with { type: 'json' };
import codingQuestionsList from './src/__generated__/questions/coding/list.en-US.json' with { type: 'json' };
import i18nConfig from './src/next-i18nostic/config.json' with { type: 'json' };

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
    '/interviews/payment/success',
    '/profile',
    '/profile/*',
    '/projects/payment/success',
    '/projects/settings/*',
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

    if (path.startsWith('/projects')) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
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
      // Interviews / Marketing
      '/',
      '/interviews/pricing',
      '/interviews/testimonials',
      '/interviews/faq',
      '/interviews/roadmap',
      // Interviews / Dashboard
      '/interviews/get-started',
      // Interviews / Formats
      '/questions',
      '/questions/formats/algo-coding',
      '/questions/formats/javascript-functions',
      '/questions/formats/ui-coding',
      '/questions/formats/system-design',
      '/questions/formats/quiz',
      // Interviews / Languages
      '/questions/html-interview-questions',
      '/questions/css-interview-questions',
      '/questions/javascript-interview-questions',
      '/questions/typescript-interview-questions',
      // Interviews / Frameworks
      '/questions/react-interview-questions',
      '/questions/vue-interview-questions',
      '/questions/angular-interview-questions',
      '/questions/svelte-interview-questions',
      // Interviews / Study Lists
      '/interviews/focus-areas',
      '/interviews/study-plans',
      '/interviews/company',
      ...allInterviewsStudyListMetadata.map(({ href }) => href),
      // Interviews / Questions
      ...codingQuestionsList.map(({ metadata }) => metadata.href),
      // Projects
      '/projects',
      '/projects/pricing',
      '/projects/challenges',
      ...allProjectsChallengeMetadata.map(({ href }) => href),
      '/projects/skills',
      ...allProjectsSkillMetadata.map(({ href }) => href),
      '/projects/tracks',
      ...allProjectsTrackMetadata.map(({ href }) => href),
      '/projects/submissions',
      '/projects/submissions/learn',
      '/projects/submissions/mentor',
      '/projects/roadmap',
      // General pages
      '/affiliates',
      '/promotions',
      '/rewards/social',
      '/contact',
      // About the company
      '/jobs',
      '/about',
      '/team',
      // Legal
      '/legal/privacy-policy',
      '/legal/terms',
      // Misc
      '/login',
      '/sign-up',
      // Blog
      '/blog',
      '/blog/explore',
      '/blog/latest',
    ];

    return await Promise.all(
      paths.map(async (href) => await config.transform(config, href)),
    );
  },
};
