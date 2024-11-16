'use client';

import { useState } from 'react';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { BlogMetadata, BlogViewField } from '../BlogTypes';
import BlogViewDropdown from '../filters/BlogViewDropdown';
import BlogList from '../filters/items/BlogList';
import BlogCountLabel from '../metadata/BlogCountLabel';

export function BlogLatestPage({
  posts,
}: {
  posts: ReadonlyArray<BlogMetadata>;
}) {
  const [viewField, setViewField] = useState<BlogViewField>('article');

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-6">
        <Heading level="heading4">
          <FormattedMessage
            defaultMessage="What's new"
            description="Latest blog articles page title"
            id="nv3dMg"
          />
        </Heading>
        <Text
          className="block max-w-3xl"
          color="subtitle"
          size="body1"
          weight="medium">
          <FormattedMessage
            defaultMessage="Here you'll find curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing deep dive subject."
            description="Latest blog articles page subtitle"
            id="WelJgL"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-4">
          <BlogCountLabel count={posts.length} showIcon={true} />
          <BlogViewDropdown viewField={viewField} onChange={setViewField} />
        </div>
        <BlogList posts={posts} view={viewField} />
      </div>
    </div>
  );
}
