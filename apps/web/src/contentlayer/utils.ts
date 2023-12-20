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

export const getPostFromSlug = (slug: string) => {
  const post = allPosts.find((blogPost) => blogPost.slug === slug);

  return post ? getTypeCastedMetadata(post) : null;
};

export const getTypeCastedMetadata = (item: Post | Series) => {
  const itemLevel = item.level as BlogLevel;
  const itemTags = item.tags as Array<BlogTagType>;

  return {
    ...item,
    level: itemLevel,
    tags: itemTags,
  };
};

export const getSeriesPostNavigation = (post: Post) => {
  const series = allSeries.find((_) => _.source === post.series);
  const subseries = allSubseries.find((_) => _.source === post.subseries);

  const posts = getAllPosts({ sort: true })
    .filter((_) => (_ as Post).series === post?.series)
    .map(({ href, slug, title }) => ({ href, slug, title }));

  return {
    items: posts,
    seriesTitle: series?.title,
    subseriesTitle: subseries?.title,
  };
};

export const getSeriesFromSlug = (slug: string) => {
  const series = allSeries.find((seriesItem) => seriesItem.slug === slug);

  return series ? getTypeCastedMetadata(series) : null;
};

export const buildNavigationTree = () => {
  const navigation = allCategories.map((category) => {
    const series = allSeries
      .filter((_) => _.category?.source === category.source)
      .map(({ href, slug, title }) => ({ href, slug, title }));

    return { links: series, title: category.title };
  });

  return navigation;
};

export const getSubseriesAndPosts = (series: Series) => {
  const result = allSubseries
    .filter((subseries) => subseries.series === series.source)
    .map((subseries) => {
      let totalReadingTime = 0;
      const posts = getAllPosts({ sort: true })
        .filter((_) => (_ as Post).subseries === subseries.source)
        .map((_) => {
          totalReadingTime += (_ as Post).readingTime;

          const postMetadata = getTypeCastedMetadata(_);

          return postMetadata as BlogMetadata;
        });

      return { items: posts, ...subseries, readingTime: totalReadingTime };
    });

  return result;
};

export const getAllPosts = ({ sort = true }) => {
  const blogs = allPosts.map((post) => {
    const postMetadata = getTypeCastedMetadata(post);

    return { ...postMetadata } as BlogMetadata;
  });

  if (sort) {
    const sortedBlogs = sortBlogsMultiple(blogs, [
      {
        field: 'createdAt',
        isAscendingOrder: true,
      },
    ]);

    return sortedBlogs;
  }

  return blogs;
};

export const getAllSeries = (filterByCategory = '') => {
  const filteredSeries = filterByCategory
    ? allSeries.filter((series) => series.category?.source === filterByCategory)
    : allSeries;
  const result = filteredSeries.map((series) => {
    const seriesMetadata = getTypeCastedMetadata(series);

    return { ...seriesMetadata, isSeries: true } as BlogMetadata;
  });

  return result;
};

export const getAllPostsForNavigation = () => {
  let sortedPosts: Array<BlogMetadata> = [];

  const nonSeriesPosts = getAllPosts({ sort: true }).filter(
    (post) => !(post as Post).series,
  );

  sortedPosts = [...sortedPosts, ...nonSeriesPosts];

  // Group the navigation by series
  allSeries.map((series) => {
    const posts = getAllPosts({ sort: true }).filter(
      (_) => (_ as Post).series === series.source,
    );

    sortedPosts = [...sortedPosts, ...posts];
  });

  return sortedPosts;
};
