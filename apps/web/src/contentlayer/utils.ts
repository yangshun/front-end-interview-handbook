import type { Post, Series } from 'contentlayer/generated';
import {
  allCategories,
  allPosts,
  allSeries,
  allSubseries,
} from 'contentlayer/generated';

import type {
  BlogLevel,
  BlogMetadata,
  BlogTagType,
} from '~/components/blog/BlogTypes';
import { sortBlogsMultiple } from '~/components/blog/filters/BlogsProcessor';

export function getPostFromSlug(slug: string) {
  const post = allPosts.find((blogPost) => blogPost.slug === slug);

  return post ? getTypeCastedMetadata(post) : null;
}

export function getTypeCastedMetadata(item: Post | Series) {
  const itemLevel = item.level as BlogLevel;
  const itemTags = item.tags as Array<BlogTagType>;

  return {
    ...item,
    level: itemLevel,
    tags: itemTags,
  };
}

export function getSeriesPostNavigation(
  post: Post,
  options: PostSortingOptions = {},
) {
  const series = allSeries.find(
    (seriesItem) => seriesItem.source === post.series,
  );
  const subseries = allSubseries.find(
    (subseriesItem) => subseriesItem.source === post.subseries,
  );

  const posts = getAllPosts(options)
    .filter((postItem) => {
      const isMatchingSeries = (postItem as Post).series === post?.series;
      const isMatchingSubseries =
        (postItem as Post).subseries === post?.subseries;

      return post?.subseries
        ? isMatchingSeries && isMatchingSubseries
        : isMatchingSeries;
    })
    .map(({ href, slug, title }) => ({ href, slug, title }));

  return {
    items: posts,
    seriesTitle: series?.title,
    subseriesTitle: subseries?.title,
  };
}

export function getSeriesFromSlug(slug: string) {
  const series = allSeries.find((seriesItem) => seriesItem.slug === slug);

  return series ? getTypeCastedMetadata(series) : null;
}

export function buildNavigationTree() {
  const sortedCategories = allCategories.sort((a, b) => a.ranking - b.ranking);
  const navigation = sortedCategories.map((category) => {
    const series = allSeries
      .filter((seriesItem) => seriesItem.category?.source === category.source)
      .map(({ href, slug, title }) => ({ href, slug, title }));

    return { links: series, title: category.title };
  });

  return navigation;
}

type PostSortingOptions =
  | Readonly<{
      ascending?: boolean;
    }>
  | undefined;

type PostNavigationOptions = Readonly<{
  isSeriesArticle?: boolean;
  seriesSource?: string;
}>;

export function getSubseriesAndPosts(
  series: Series,
  options: PostSortingOptions = {},
) {
  const result = allSubseries
    .filter((subseries) => subseries.series === series.source)
    .map((subseries) => {
      let totalReadingTime = 0;

      const posts = getAllPosts(options)
        .filter((postItem) => (postItem as Post).subseries === subseries.source)
        .map((postItem) => {
          totalReadingTime += (postItem as Post).readingTime;

          return getTypeCastedMetadata(postItem) as BlogMetadata;
        });

      return { items: posts, ...subseries, readingTime: totalReadingTime };
    });

  return result;
}

export function getAllPosts(options: PostSortingOptions = {}) {
  const { ascending = false } = options;
  const blogs = allPosts.map((post) => {
    const postMetadata = getTypeCastedMetadata(post);

    return { ...postMetadata } as BlogMetadata;
  });

  return sortBlogsMultiple(blogs, [
    {
      field: 'createdAt',
      isAscendingOrder: ascending,
    },
  ]);
}

export function getAllSeries(filterByCategory = '') {
  const filteredSeries = filterByCategory
    ? allSeries.filter((series) => series.category?.source === filterByCategory)
    : allSeries;

  return filteredSeries.map((series) => {
    const seriesMetadata = getTypeCastedMetadata(series);
    const articlesCount = allPosts.filter(
      (post) => post.series === series.source,
    ).length;

    return {
      ...seriesMetadata,
      articlesCount,
      isSeries: true,
    } as BlogMetadata;
  });
}

export function getAllPostsForNavigation(options: PostNavigationOptions) {
  const { isSeriesArticle, seriesSource } = options;

  // Return non series posts only
  if (!isSeriesArticle) {
    return getAllPosts({ ascending: true }).filter(
      (post) => !(post as Post).series,
    );
  }

  let sortedPosts: Array<BlogMetadata> = [];

  const nonSubseriesPosts = getAllPosts({ ascending: true }).filter(
    (postItem) =>
      (postItem as Post).series === seriesSource &&
      !(postItem as Post).subseries,
  );

  sortedPosts = [...sortedPosts, ...nonSubseriesPosts];

  // Group pagination by subseries if subseries is present
  allSubseries
    .filter((subseries) => subseries.series === seriesSource)
    .forEach((subseries) => {
      const subseriesPosts = getAllPosts({ ascending: true }).filter(
        (postItem) => (postItem as Post).subseries === subseries.source,
      );

      sortedPosts = [...sortedPosts, ...subseriesPosts];
    });

  return sortedPosts;
}
