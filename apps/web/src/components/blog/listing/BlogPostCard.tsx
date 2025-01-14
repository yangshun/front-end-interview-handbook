import clsx from 'clsx';
import type { BlogPost } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import BlogSeriesLabel from '~/components/blog/metadata/BlogSeriesLabel';
import BlogTags from '~/components/blog/metadata/BlogTags';
import BlogTimestamp from '~/components/blog/metadata/BlogTimestamp';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
  themeTextFaintColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  metadata: BlogMetadata;
  showArrow?: boolean;
  showSeriesTag?: boolean;
  titleLines?: 1 | 2;
  type?: 'default' | 'wide';
}>;

export default function BlogPostCard({
  metadata,
  type = 'default',
  showArrow = true,
  titleLines = 1,
  showSeriesTag = true,
}: Props) {
  return (
    <div
      className={clsx(
        'group relative isolate',
        'flex h-full items-center justify-between',
        type === 'wide' && 'gap-x-6 px-8 py-5',
        type === 'default' && 'gap-x-4 py-6 pl-6 pr-4',
        'overflow-hidden rounded-lg',
        themeBackgroundCardWhiteOnLightColor,
        themeGlassyBorder,
      )}>
      {type === 'wide' && metadata.imageUrl && (
        <img
          alt={metadata.title}
          className="!m-0 hidden aspect-[15/8] h-20 shrink-0 rounded object-cover sm:block"
          decoding="async"
          loading="lazy"
          src={metadata.imageUrl}
        />
      )}
      <div className="flex h-full flex-1 flex-col gap-y-4">
        <div
          className={clsx(
            'flex w-full grow flex-col',
            type === 'default' && 'gap-y-2',
            type === 'wide' && 'gap-y-1',
          )}>
          <div className="flex items-center gap-x-3">
            {type === 'wide' && metadata.imageUrl && (
              <img
                alt={metadata.title}
                className="size-8 !m-0 shrink-0 rounded object-cover sm:hidden"
                decoding="async"
                loading="lazy"
                src={metadata.imageUrl}
              />
            )}
            <Anchor href={metadata.href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <div className="flex items-center gap-3">
                <Text
                  className={clsx(
                    titleLines === 1 && 'line-clamp-1',
                    titleLines === 2 && 'line-clamp-2',
                  )}
                  size={type === 'default' ? 'body1' : 'body0'}
                  weight="bold">
                  {metadata.title}
                </Text>
                {metadata.isSeries && showSeriesTag && <BlogSeriesLabel />}
              </div>
            </Anchor>
          </div>
          {metadata.description && (
            <Text
              className={clsx(type === 'default' && 'line-clamp-2')}
              color={type === 'default' ? 'subtitle' : 'secondary'}
              size="body2">
              {metadata.description}
            </Text>
          )}
        </div>
        <div
          className={clsx(
            'relative z-[1]',
            'flex w-full flex-wrap items-center gap-x-6 gap-y-2',
          )}>
          {type === 'wide' && (
            <BlogLevelLabel showIcon={true} value={metadata.level} />
          )}
          {(metadata as BlogPost).createdAt && !metadata.isSeries && (
            <Text
              className="block whitespace-nowrap"
              color="secondary"
              size="body3">
              <BlogTimestamp
                date={new Date((metadata as BlogPost).createdAt).getTime()}
              />
            </Text>
          )}
          {metadata.tags.length > 0 && (
            <BlogTags showMultiple={type === 'wide'} tags={metadata.tags} />
          )}
          {metadata.isSeries && (
            <BlogCountLabel count={metadata.articlesCount || 0} />
          )}
        </div>
      </div>
      {showArrow && (
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'size-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </div>
  );
}
