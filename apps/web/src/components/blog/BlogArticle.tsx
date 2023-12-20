'use client';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogMetadataSection from '~/components/blog/metadata/BlogMetadataSection';
import Prose from '~/components/ui/Prose';
import Abstract from '~/components/ui/Prose/Abstract';
import Text from '~/components/ui/Text';
import { themeLineBackgroundColor } from '~/components/ui/theme';

type ArticleView = 'card' | 'default';

type Props = PropsWithChildren<
  Readonly<{
    metadata: BlogMetadata;
    view?: ArticleView;
  }>
>;

const BlogArticle = forwardRef<HTMLDivElement, Props>(
  ({ metadata, view = 'default', children }: Props, ref) => {
    return (
      <>
        <Prose ref={ref}>
          {metadata.isSeries && (
            <Text color="active" size="body2">
              <FormattedMessage
                defaultMessage="Series"
                description="Series tag for Article"
                id="xXXK+w"
              />
            </Text>
          )}
          <h1 className={clsx({ 'text-sm lg:text-xl': view === 'card' })}>
            {metadata.title}
          </h1>
          <Abstract>
            <div className={clsx({ '!text-sm': view === 'card' })}>
              {metadata.description}
            </div>
          </Abstract>
        </Prose>
        <BlogMetadataSection metadata={metadata} />
        <div className={clsx(themeLineBackgroundColor, 'my-5 h-[1px]')} />
        {children}
      </>
    );
  },
);

export default BlogArticle;
