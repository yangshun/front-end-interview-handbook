import clsx from 'clsx';
import type { BlogPost } from 'contentlayer/generated';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogTags from '~/components/blog/metadata/BlogTags';
import BlogTimestamp from '~/components/blog/metadata/BlogTimestamp';
import Anchor from '~/components/ui/Anchor';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  metadata: BlogMetadata;
}>;

export default function BlogRelatedArticleCard({ metadata }: Props) {
  return (
    <div
      className={clsx(
        'group relative flex h-full flex-col justify-between gap-y-3 overflow-hidden rounded-lg p-4',
        themeBackgroundCardWhiteOnLightColor,
        themeGlassyBorder,
      )}>
      {metadata.imageUrl && (
        <Img
          alt={metadata.title}
          className="!m-0 h-[175px] w-full rounded object-cover"
          decoding="async"
          loading="lazy"
          src={metadata.imageUrl}
        />
      )}
      <div className="flex flex-col gap-y-2">
        <Anchor href={metadata.href} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text className="line-clamp-2" size="body1" weight="bold">
            {metadata.title}
          </Text>
        </Anchor>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Text
            className="inline-flex whitespace-nowrap"
            color="secondary"
            size="body3">
            <BlogTimestamp
              date={new Date((metadata as BlogPost).createdAt).getTime()}
            />
          </Text>
          {metadata.tags.length > 0 && (
            <BlogTags
              showMultiple={true}
              showTagCount={1}
              tags={metadata.tags}
            />
          )}
        </div>
      </div>
      {metadata.description && (
        <Text className={clsx('!line-clamp-3')} color="secondary" size="body2">
          {metadata.description}
        </Text>
      )}
    </div>
  );
}
