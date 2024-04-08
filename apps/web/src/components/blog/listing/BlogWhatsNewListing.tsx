'use client';

import { useState } from 'react';

import type { BlogMetadata, BlogViewField } from '~/components/blog/BlogTypes';
import BlogViewDropdown from '~/components/blog/filters/BlogViewDropdown';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';

type Props = Readonly<{
  posts: ReadonlyArray<BlogMetadata>;
}>;

export default function BlogWhatsNewListing({ posts }: Props) {
  const [viewField, setViewField] = useState<BlogViewField>('article');

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-4">
        <BlogCountLabel count={posts.length} showIcon={true} />
        <BlogViewDropdown viewField={viewField} onChange={setViewField} />
      </div>
      <BlogList posts={posts} view={viewField} />
    </div>
  );
}
