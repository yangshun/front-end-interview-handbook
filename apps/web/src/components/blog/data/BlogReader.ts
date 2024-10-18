import type { BlogPost, BlogSeries } from 'contentlayer/generated';

import type { BlogLevel, BlogMetadata } from '~/components/blog/BlogTypes';
import { sortBlogPostsMultiple } from '~/components/blog/data/BlogPostsProcessor';

import { getAllBlogCategories } from '~/db/contentlayer/blog/BlogCategoryReader';
import { getAllBlogPost } from '~/db/contentlayer/blog/BlogPostReader';
import {
  getAllBlogSeries,
  getBlogSeries,
} from '~/db/contentlayer/blog/BlogSeriesReader';
import { getAllBlogSubseries } from '~/db/contentlayer/blog/BlogSubseriesReader';

export function readBlogPost(slug: string) {
  const allPosts = getAllBlogPost();
  const post = allPosts
    .filter((postItem) =>
      // Only show published posts on production.
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? postItem.published
        : true,
    )
    .find((postItem) => postItem.slug === slug);

  return post ? getBlogTypeCastedMetadata(post) : null;
}

export function readBlogPostsAll(options: BlogPostQueryOptions = {}) {
  const { ascending = false } = options;
  const allPosts = getAllBlogPost();
  const posts = allPosts
    .filter((postItem) =>
      // Only show published posts on production.
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? postItem.published
        : true,
    )
    .map((postItem) => {
      const postMetadata = getBlogTypeCastedMetadata(postItem);

      return { ...postMetadata } as BlogMetadata;
    });

  return sortBlogPostsMultiple(posts, [
    {
      field: 'createdAt',
      isAscendingOrder: ascending,
    },
  ]);
}

export function getBlogTypeCastedMetadata<T extends BlogPost | BlogSeries>(
  item: T,
) {
  const itemLevel = item.level as BlogLevel;
  const itemTags = item.tags;

  return {
    ...item,
    level: itemLevel,
    tags: itemTags,
  };
}

export function readBlogSeriesPostNavigation(
  post: BlogPost,
  options: BlogPostQueryOptions = {},
) {
  const allSeries = getAllBlogSeries();
  const allSubseries = getAllBlogSubseries();
  const series = allSeries.find(
    (seriesItem) => seriesItem.source === post.series,
  );
  const subseries = allSubseries.find(
    (subseriesItem) => subseriesItem.source === post.subseries,
  );

  const posts = readBlogPostsAll(options)
    .filter((postItem) => {
      const isMatchingSeries = (postItem as BlogPost).series === post?.series;
      const isMatchingSubseries =
        (postItem as BlogPost).subseries === post?.subseries;

      return post?.subseries
        ? isMatchingSeries && isMatchingSubseries
        : isMatchingSeries;
    })
    .map(({ href, slug, title }) => ({ href, label: title, slug }));

  return {
    items: posts,
    seriesTitle: series?.title,
    subseriesTitle: subseries?.title,
  };
}

export function readBlogSeries(slug: string) {
  const series = getBlogSeries(slug);

  return series ? getBlogTypeCastedMetadata(series) : null;
}

export function buildBlogNavigationTree() {
  const allCategories = getAllBlogCategories();
  const allSeries = getAllBlogSeries();
  const sortedCategories = allCategories.sort((a, b) => a.ranking - b.ranking);
  const navigation = sortedCategories.map((category) => {
    const series = allSeries
      .filter((seriesItem) => seriesItem.category?.source === category.source)
      .map(({ href, slug, title }) => ({ href, label: title, slug }));

    return { items: series, label: category.title };
  });

  return navigation;
}

type BlogPostQueryOptions =
  | Readonly<{
      ascending?: boolean;
    }>
  | undefined;

type PostNavigationOptions = Readonly<{
  isSeriesArticle?: boolean;
  seriesSource?: string;
}>;

export function readBlogSubseriesAndPosts(
  series: BlogSeries,
  options: BlogPostQueryOptions = {},
) {
  const allSubseries = getAllBlogSubseries();
  const result = allSubseries
    .filter((subseries) => subseries.series === series.source)
    .map((subseries) => {
      let totalReadingTime = 0;

      const posts = readBlogPostsAll(options)
        .filter(
          (postItem) => (postItem as BlogPost).subseries === subseries.source,
        )
        .map((postItem) => {
          totalReadingTime += (postItem as BlogPost).readingTime;

          return getBlogTypeCastedMetadata(postItem) as BlogMetadata;
        });

      return { items: posts, ...subseries, readingTime: totalReadingTime };
    });

  return result;
}

export function readBlogSeriesAll(filterByCategory = '') {
  const allSeries = getAllBlogSeries();
  const filteredSeries = filterByCategory
    ? allSeries.filter((series) => series.category?.source === filterByCategory)
    : allSeries;

  return filteredSeries.map((series) => {
    const seriesMetadata = getBlogTypeCastedMetadata(series);
    const allPosts = getAllBlogPost();
    const articlesCount = allPosts.filter(
      (postItem) => postItem.series === series.source,
    ).length;

    return {
      ...seriesMetadata,
      articlesCount,
      isSeries: true,
    } as BlogMetadata;
  });
}

export function readBlogPostsForNavigation(options: PostNavigationOptions) {
  const { isSeriesArticle, seriesSource } = options;

  // Return non series posts only
  if (!isSeriesArticle) {
    return readBlogPostsAll({ ascending: true }).filter(
      (postItem) => !(postItem as BlogPost).series,
    );
  }

  let sortedPosts: Array<BlogMetadata> = [];

  const nonSubseriesPosts = readBlogPostsAll({ ascending: true }).filter(
    (postItem) =>
      (postItem as BlogPost).series === seriesSource &&
      !(postItem as BlogPost).subseries,
  );

  sortedPosts = [...sortedPosts, ...nonSubseriesPosts];

  const allSubseries = getAllBlogSubseries();

  // Group pagination by subseries if subseries is present
  allSubseries
    .filter((subseries) => subseries.series === seriesSource)
    .forEach((subseries) => {
      const subseriesPosts = readBlogPostsAll({ ascending: true }).filter(
        (postItem) => (postItem as BlogPost).subseries === subseries.source,
      );

      sortedPosts = [...sortedPosts, ...subseriesPosts];
    });

  return sortedPosts;
}
