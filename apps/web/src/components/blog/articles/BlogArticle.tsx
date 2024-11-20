'use client';

import type { PropsWithChildren } from 'react';

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

export default function BlogArticle({
  metadata,
  view = 'default',
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Heading level={view === 'card' ? 'heading6' : 'heading4'}>
            {metadata.title}
          </Heading>
          <Text
            className="block"
            color="secondary"
            size={view === 'card' ? 'body2' : 'body1'}>
            {metadata.description}
          </Text>
        </div>
        <BlogMetadataSection metadata={metadata} />
      </div>
      {metadata.imageUrl && (
        <img
          alt={metadata.title}
          decoding="async"
          loading="lazy"
          src={metadata.imageUrl}
        />
      )}
      {children}
    </div>
  );
}
