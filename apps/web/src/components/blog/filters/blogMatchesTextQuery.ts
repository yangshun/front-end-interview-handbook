import type { BlogMetadata } from '~/components/blog/BlogTypes';

export default function blogMatchesTextQuery(
  blog: BlogMetadata,
  query: string,
): boolean {
  return (
    blog.title.toLowerCase().includes(query.toLowerCase()) ||
    Boolean(blog.description?.toLowerCase().includes(query.toLowerCase()))
  );
}
