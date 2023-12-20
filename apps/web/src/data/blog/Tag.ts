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
    javascript: getBlogTagDefinition('javascript'),
    marketing: getBlogTagDefinition('marketing'),
    network: getBlogTagDefinition('network'),
    performance: getBlogTagDefinition('performance'),
    security: getBlogTagDefinition('security'),
  };

  return blogTags;
}

export function getBlogTagDefinition(tag: BlogTagType): BlogTag {
  switch (tag) {
    case 'performance':
      return {
        description: 'Find all series and articles related to performance',
        href: '/blog/explore/performance',
        name: 'Performance',
        style: {
          backgroundClass: 'bg-success-lightest dark:bg-success-darker',
          borderClass: 'border border-success dark:border-success-light',
          textClass: 'text-success dark:text-success-light',
        },
        type: 'performance',
      };
    case 'javascript':
      return {
        description: 'Find all series and articles related to javascript',
        href: '/blog/explore/javascript',
        name: 'Javascript',
        style: {
          backgroundClass: 'bg-warning-lightest dark:bg-warning-darker',
          borderClass: 'border border-warning dark:border-warning-light',
          textClass: 'text-warning dark:text-warning-light',
        },
        type: 'javascript',
      };
    case 'network':
      return {
        description: 'Find all series and articles related to network',
        href: '/blog/explore/network',
        name: 'Network',
        style: {
          backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
          borderClass: 'border border-brand-dark dark:border-brand',
          textClass: 'text-brand-dark dark:text-brand',
        },
        type: 'network',
      };
    case 'marketing':
      return {
        description: 'Find all series and articles related to marketing',
        href: '/blog/explore/marketing',
        name: 'Marketing',
        style: {
          backgroundClass: 'bg-info-lightest dark:bg-info-darker',
          borderClass: 'border border-info dark:border-info',
          textClass: 'text-warning dark:text-info',
        },
        type: 'marketing',
      };
    case 'security':
      return {
        description: 'Find all series and articles related to security',
        href: '/blog/explore/security',
        name: 'Security',
        style: {
          backgroundClass: 'bg-warning-lightest dark:bg-warning-darkest',
          borderClass: 'border border-warning-darker dark:border-warning',
          textClass: 'text-warning-darker dark:text-warning',
        },
        type: 'security',
      };
  }
}
