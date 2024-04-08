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
  readonly articlesCount?: number;
  readonly author?: BlogAuthor;
  readonly category?: BlogCategory;
  readonly hasSubseries?: boolean;
  readonly imageUrl?: string;
  readonly isSeries?: boolean;
  readonly isSeriesArticle?: boolean;
  readonly level: BlogLevel;
  readonly tags: ReadonlyArray<string>;
}> &
  (BlogPost | BlogSeries);

export type BlogSubseries = BlogSubseriesOrig & {
  readonly items: ReadonlyArray<BlogMetadata>;
  readonly readingTime: number;
};

export type BlogArticleNavigationType = {
  items: ReadonlyArray<BlogSeriesNavigationLink>;
  seriesTitle?: string;
  subseriesTitle?: string;
};
