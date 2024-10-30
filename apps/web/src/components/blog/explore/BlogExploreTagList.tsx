import { useState } from 'react';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import type { BlogFilterTab } from '~/components/blog/filters/BlogTypeTabs';
import BlogTypeTabs from '~/components/blog/filters/BlogTypeTabs';
import BlogListingWithFilters from '~/components/blog/listing/BlogListingWithFilters';

type Props = Readonly<{
  articles: ReadonlyArray<BlogMetadata>;
  series: ReadonlyArray<BlogMetadata>;
  tag: string;
}>;

export default function BlogExploreTagList({ articles, series, tag }: Props) {
  const [selectedTab, setSelectedTab] = useState<BlogFilterTab>('articles');

  const postsFilteredByTag = (
    selectedTab === 'articles' ? articles : series
  ).filter((postItem) => postItem.tags.includes(tag));

  return (
    <div className="flex flex-col gap-4">
      <BlogTypeTabs value={selectedTab} onSelect={setSelectedTab} />
      <BlogListingWithFilters
        key={selectedTab}
        filterNamespace={`explore-${selectedTab}-${tag}`}
        layout="explore"
        posts={postsFilteredByTag}
        showFilters={selectedTab === 'articles'}
        type={selectedTab}
      />
    </div>
  );
}
