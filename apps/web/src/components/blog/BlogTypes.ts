import type {
  BlogAuthor,
  BlogCategory,
  BlogPost,
  BlogSeries,
  BlogSubseries as BlogSubseriesOrig,
} from 'contentlayer/generated';

import type { BlogSeriesNavigationLink } from '~/components/blog/layout/BlogSidebar';

export type BlogSlug = string;

export type BlogLevel = 'advanced' | 'intermediate' | 'nightmare' | 'starter';

export type BlogSortField = 'createdAt';

export type BlogViewField = 'article' | 'list';

export type BlogMetadata = Readonly<{
  articlesCount?: number;
  author?: BlogAuthor;
  category?: BlogCategory;
  hasSubseries?: boolean;
  imageUrl?: string;
  isSeries?: boolean;
  isSeriesArticle?: boolean;
  level: BlogLevel;
  tags: ReadonlyArray<string>;
}> &
  (BlogPost | BlogSeries);

export type BlogSubseries = BlogSubseriesOrig &
  Readonly<{
    items: ReadonlyArray<BlogMetadata>;
    readingTime: number;
  }>;

export type BlogArticleNavigationType = Readonly<{
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  seriesTitle?: string;
  subseriesTitle?: string;
}>;
