'use client';

import clsx from 'clsx';
import type { BlogPost } from 'contentlayer/generated';

import type { BlogMetadata, BlogViewField } from '~/components/blog/BlogTypes';
import type { BlogFilterTab } from '~/components/blog/filters/BlogTypeTabs';
import BlogArticleViewCard from '~/components/blog/listing/BlogArticleViewCard';
import BlogPostCard from '~/components/blog/listing/BlogPostCard';
import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';

type Props = Readonly<{
  posts: ReadonlyArray<BlogMetadata>;
  showSeriesTag?: boolean;
  type?: Readonly<BlogFilterTab>;
  view?: BlogViewField;
}>;

export default function BlogList({
  posts,
  showSeriesTag = true,
  type = 'articles',
  view = 'list',
}: Props) {
  const intl = useIntl();

  if (posts.length === 0) {
    return (
      <div className="p-10">
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Try changing the filters',
            description:
              'Subtitle for empty state when no articles are returned from application of filters on blog list',
            id: 'EpJ74A',
          })}
          title={
            type === 'articles'
              ? intl.formatMessage({
                  defaultMessage: 'No articles',
                  description:
                    'Title for empty state when application of filters return no results',
                  id: '78MOQL',
                })
              : intl.formatMessage({
                  defaultMessage: 'No series',
                  description:
                    'Title for empty state when application of filters return no results',
                  id: 'tCiU5O',
                })
          }
          variant="empty"
        />
      </div>
    );
  }

  return (
    <ul className={clsx('flex w-full !list-none flex-col gap-y-4')}>
      {posts.map((post) => {
        return (
          <li key={post.href}>
            {view === 'list' || !(post as BlogPost)?.body?.code ? (
              <BlogPostCard
                metadata={post}
                showSeriesTag={showSeriesTag}
                titleLines={2}
                type="wide"
              />
            ) : (
              <BlogArticleViewCard metadata={post} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
