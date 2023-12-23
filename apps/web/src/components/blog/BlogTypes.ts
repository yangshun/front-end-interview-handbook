import type {
  Author,
  Category,
  Post,
  Series,
  Subseries,
} from 'contentlayer/generated';

export type BlogSlug = string;

export type BlogLevel = 'advanced' | 'intermediate' | 'nightmare' | 'starter';

export type BlogTagType =
  | 'career'
  | 'css'
  | 'interviews'
  | 'javascript'
  | 'scalability';

export type BlogSortField = 'createdAt';

export type BlogViewField = 'article' | 'list';

export type BlogMetadata = Readonly<{
  readonly author?: Author;
  readonly category?: Category;
  readonly hasSubseries?: boolean;
  readonly imageUrl?: string;
  readonly isSeries?: boolean;
  readonly isSeriesArticle?: boolean;
  readonly level: BlogLevel;
  readonly tags: ReadonlyArray<BlogTagType>;
}> &
  (Post | Series);

export type BlogSubseries = Subseries & {
  readonly items: ReadonlyArray<BlogMetadata>;
  readonly readingTime: number;
};
