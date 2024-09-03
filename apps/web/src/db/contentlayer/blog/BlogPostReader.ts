import type { BlogPost } from 'contentlayer/generated';

import { allBlogPosts } from '~/../.contentlayer/generated/BlogPost/_index.mjs';

export function getAllBlogPost() {
  return allBlogPosts as Array<BlogPost>;
}
