import type { BlogSubseries } from 'contentlayer/generated';

import { allBlogSubseries } from '~/../.contentlayer/generated/BlogSubseries/_index.mjs';

export function getAllBlogSubseries() {
  return allBlogSubseries as Array<BlogSubseries>;
}
