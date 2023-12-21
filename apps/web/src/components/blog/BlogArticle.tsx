'use client';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogMetadataSection from '~/components/blog/metadata/BlogMetadataSection';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';

import Heading from '../ui/Heading';

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
      <div className="flex flex-col gap-12">
        <div ref={ref} className={clsx('flex flex-col gap-3')}>
          {metadata.isSeries && (
            <Text color="active" display="block" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Series"
                description="Series tag for Article"
                id="xXXK+w"
              />
            </Text>
          )}
          <Heading level={view === 'card' ? 'heading6' : 'heading4'}>
            {metadata.title}
          </Heading>
          <Text
            color="secondary"
            display="block"
            size={view === 'card' ? 'body2' : 'body1'}>
            {metadata.description}
          </Text>
          <BlogMetadataSection metadata={metadata} />
          <Divider />
        </div>
        {children}
      </div>
    );
  },
);

export default BlogArticle;
