import type { Post } from 'contentlayer/generated';

import type { BlogMetadata, BlogSortField } from '~/components/blog/BlogTypes';

export function sortBlogs<T extends BlogMetadata>(
  blogs: ReadonlyArray<T>,
  field: BlogSortField,
  isAscendingOrder = true,
): Array<T> {
  return blogs.slice().sort((a, b) => {
    switch (field) {
      case 'createdAt': {
        const value =
          new Date((a as Post).createdAt).getTime() -
          new Date((b as Post).createdAt).getTime();

        return isAscendingOrder ? -value : value;
      }
    }
  });
}

export function sortBlogsMultiple<T extends BlogMetadata>(
  blogs: ReadonlyArray<T>,
  sortFields: ReadonlyArray<{
    field: BlogSortField;
    isAscendingOrder: boolean;
  }>,
): ReadonlyArray<T> {
  let newBlogs = blogs.slice();

  for (const { field, isAscendingOrder } of sortFields) {
    newBlogs = sortBlogs(newBlogs, field, isAscendingOrder);
  }

  return newBlogs;
}

export function filterBlogs<T extends BlogMetadata>(
  blogs: ReadonlyArray<T>,
  filters: ReadonlyArray<(blog: T) => boolean>,
): ReadonlyArray<T> {
  return blogs.filter((blog) => filters.every((filter) => filter(blog)));
}
