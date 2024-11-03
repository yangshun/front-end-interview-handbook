import type { BlogCategory } from 'contentlayer/generated';

import { allBlogCategories } from '~/../.contentlayer/generated/BlogCategory/_index.mjs';

export function getAllBlogCategories() {
  return (allBlogCategories as Array<BlogCategory>).sort(
    (a, b) => a.ranking - b.ranking,
  );
}
