'use client';

import clsx from 'clsx';
import type { Post } from 'contentlayer/generated';
import { useIntl } from 'react-intl';

import ArticleViewCard from '~/components/blog/BlogArticleViewCard';
import BlogCard from '~/components/blog/BlogCard';
import type { BlogMetadata, BlogViewField } from '~/components/blog/BlogTypes';
import EmptyState from '~/components/ui/EmptyState';

type Props = Readonly<{
  blogs: ReadonlyArray<BlogMetadata>;
  showSeriesTag?: boolean;
  view?: BlogViewField;
}>;

export default function BlogList({
  blogs,
  view = 'list',
  showSeriesTag = true,
}: Props) {
  const intl = useIntl();

  if (blogs.length === 0) {
    return (
      <div className="p-10">
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Try changing the filters',
            description:
              'Subtitle for empty state when no articles are returned from application of filters on blog list',
            id: 'EpJ74A',
          })}
          title={intl.formatMessage({
            defaultMessage: 'No articles',
            description:
              'Title for empty state when application of filters return no results',
            id: '78MOQL',
          })}
          variant="empty"
        />
      </div>
    );
  }

  return (
    <ul className={clsx('flex !list-none flex-col gap-y-4')}>
      {blogs.map((blog) => {
        return (
          <li key={blog.href}>
            {view === 'list' || !(blog as Post)?.body?.code ? (
              <BlogCard
                metadata={blog}
                showSeriesTag={showSeriesTag}
                titleLines={2}
                type="wide"
              />
            ) : (
              <ArticleViewCard blog={blog} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
