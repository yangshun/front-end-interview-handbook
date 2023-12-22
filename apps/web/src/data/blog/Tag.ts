import type { BlogTagType } from '~/components/blog/BlogTypes';

export type BlogTag = Readonly<{
  description: string;
  href: string;
  name: string;
  style: Readonly<{
    backgroundClass: string;
    borderClass: string;
    textClass: string;
  }>;
  type: BlogTagType;
}>;

export type BlogTags = Record<BlogTagType, BlogTag>;

export function getBlogTags(): BlogTags {
  const blogTags: BlogTags = {
    career: getBlogTagDefinition('career'),
    css: getBlogTagDefinition('css'),
    interviews: getBlogTagDefinition('interviews'),
    javascript: getBlogTagDefinition('javascript'),
    scalability: getBlogTagDefinition('scalability'),
  };

  return blogTags;
}

export function getBlogTagDefinition(tag: BlogTagType): BlogTag {
  switch (tag) {
    case 'scalability':
      return {
        description: 'Find all series and articles related to scalability',
        href: '/blog/tags/scalability',
        name: 'Scalability',
        style: {
          backgroundClass: 'bg-success-lightest dark:bg-success-darker',
          borderClass: 'border border-success dark:border-success-light',
          textClass: 'text-success dark:text-success-light',
        },
        type: 'scalability',
      };
    case 'javascript':
      return {
        description: 'Find all series and articles related to javascript',
        href: '/blog/tags/javascript',
        name: 'JavaScript',
        style: {
          backgroundClass: 'bg-warning-lightest dark:bg-warning-darker',
          borderClass: 'border border-warning dark:border-warning-light',
          textClass: 'text-warning dark:text-warning-light',
        },
        type: 'javascript',
      };
    case 'css':
      return {
        description: 'Find all series and articles related to CSS',
        href: '/blog/tags/css',
        name: 'CSS',
        style: {
          backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
          borderClass: 'border border-brand-dark dark:border-brand',
          textClass: 'text-brand-dark dark:text-brand',
        },
        type: 'css',
      };
    case 'career':
      return {
        description: 'Find all series and articles related to career',
        href: '/blog/tags/career',
        name: 'Career',
        style: {
          backgroundClass: 'bg-info-lightest dark:bg-info-darker',
          borderClass: 'border border-info dark:border-info',
          textClass: 'text-info dark:text-info',
        },
        type: 'career',
      };
    case 'interviews':
      return {
        description: 'Find all series and articles related to interviews',
        href: '/blog/tags/interviews',
        name: 'Interviews',
        style: {
          backgroundClass: 'bg-danger-lightest dark:bg-danger-darkest',
          borderClass: 'border border-danger-darker dark:border-danger',
          textClass: 'text-danger-darker dark:text-danger',
        },
        type: 'interviews',
      };
  }
}
