import { useState } from 'react';

import type { BlogMetadata, BlogTagType } from '~/components/blog/BlogTypes';
import type { FilterTab } from '~/components/blog/filters/BlogTypeTabs';
import BlogTypeTabs from '~/components/blog/filters/BlogTypeTabs';
import BlogListingWithFilters from '~/components/blog/listing/BlogListingWithFilters';

type Props = Readonly<{
  articles: ReadonlyArray<BlogMetadata>;
  series: ReadonlyArray<BlogMetadata>;
  tag: string;
}>;

export default function BlogExploreTagList({ articles, series, tag }: Props) {
  const [selectedTab, setSelectedTab] = useState<FilterTab>('articles');

  const filteredByTagBlogs = (
    selectedTab === 'articles' ? articles : series
  ).filter((blog) => blog.tags.includes(tag));

  return (
    <div className="flex flex-col gap-4">
      <BlogTypeTabs value={selectedTab} onSelect={setSelectedTab} />
      <BlogListingWithFilters
        key={selectedTab}
        blogs={filteredByTagBlogs}
        layout="explore"
        namespace={`explore-${selectedTab}-${tag}`}
        showFilters={selectedTab === 'articles'}
        type={selectedTab}
      />
    </div>
  );
}
