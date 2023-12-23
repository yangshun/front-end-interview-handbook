'use client';

import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogMetadataSection from '~/components/blog/metadata/BlogMetadataSection';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

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
        <div ref={ref} className="flex flex-col gap-5">
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
        </div>
        {metadata.imageUrl && (
          <img alt={metadata.title} loading="lazy" src={metadata.imageUrl} />
        )}
        {children}
      </div>
    );
  },
);

export default BlogArticle;
