import type { BlogSeries } from 'contentlayer/generated';

import { allBlogSeries } from '~/../.contentlayer/generated/BlogSeries/_index.mjs';

export function getAllBlogSeries() {
  return allBlogSeries as Array<BlogSeries>;
}

export function getBlogSeries(slug: string) {
  return allBlogSeries.find((content) => content.slug === slug) as
    | BlogSeries
    | undefined;
}
