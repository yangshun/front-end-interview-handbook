import type { BlogPost } from 'contentlayer/generated';

import type { BlogMetadata, BlogSortField } from '~/components/blog/BlogTypes';

export function sortBlogPosts<T extends BlogMetadata>(
  posts: ReadonlyArray<T>,
  field: BlogSortField,
  isAscendingOrder = true,
): Array<T> {
  return posts.slice().sort((a, b) => {
    switch (field) {
      case 'createdAt': {
        const value =
          new Date((a as BlogPost).createdAt).getTime() -
          new Date((b as BlogPost).createdAt).getTime();

        return isAscendingOrder ? value : -value;
      }
    }
  });
}

export function sortBlogPostsMultiple<T extends BlogMetadata>(
  posts: ReadonlyArray<T>,
  sortFields: ReadonlyArray<{
    field: BlogSortField;
    isAscendingOrder: boolean;
  }>,
): ReadonlyArray<T> {
  let newPosts = posts.slice();

  for (const { field, isAscendingOrder } of sortFields) {
    newPosts = sortBlogPosts(newPosts, field, isAscendingOrder);
  }

  return newPosts;
}

export function filterBlogPosts<T extends BlogMetadata>(
  posts: ReadonlyArray<T>,
  filters: ReadonlyArray<(post: T) => boolean>,
): ReadonlyArray<T> {
  return posts.filter((post) => filters.every((filter) => filter(post)));
}
