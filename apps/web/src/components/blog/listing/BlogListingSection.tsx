import clsx from 'clsx';
import type { BlogSeries } from 'contentlayer/generated';

import { readBlogPostsAll } from '~/components/blog/data/BlogReader';
import BlogListWithFilters from '~/components/blog/listing/BlogListingWithFilters';
import BlogBrowseSeries from '~/components/blog/series/BlogBrowseSeries';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  allSeries: ReadonlyArray<BlogSeries>;
}>;

export default function BlogListingSection({ allSeries }: Props) {
  const posts = readBlogPostsAll();
  const sortedSeries = allSeries.slice().sort((a, b) => a.ranking - b.ranking);

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="text-xl font-semibold" level="custom">
        <FormattedMessage
          defaultMessage="Everything from the blog"
          description="Blog listing title for blog home page"
          id="hMx0CX"
        />
      </Heading>
      <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
        <div className="xl:col-span-9">
          <BlogListWithFilters
            filterNamespace="blog-listing"
            layout="embedded"
            posts={posts}
          />
        </div>
        <aside
          className={clsx(
            'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
          )}>
          <BlogBrowseSeries href="/blog/explore" seriesList={sortedSeries} />
        </aside>
      </div>
    </div>
  );
}
