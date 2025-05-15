'use client';

import type { PropsWithChildren } from 'react';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogMetadataSection from '~/components/blog/metadata/BlogMetadataSection';
import Anchor from '~/components/ui/Anchor';
import Heading, { headingCVA } from '~/components/ui/Heading';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';

type ArticleView = 'card' | 'default';

type Props = PropsWithChildren<
  Readonly<{
    metadata: BlogMetadata;
    view?: ArticleView;
  }>
>;

export default function BlogArticle({
  children,
  metadata,
  view = 'default',
}: Props) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {view === 'card' ? (
            <Anchor
              className={headingCVA({
                level: 'heading6',
              })}
              href={metadata.href}>
              {metadata.title}
            </Anchor>
          ) : (
            <Heading level="heading4">{metadata.title}</Heading>
          )}

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
        <Img
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
