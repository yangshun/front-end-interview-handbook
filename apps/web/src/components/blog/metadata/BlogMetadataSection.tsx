import clsx from 'clsx';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogAuthor from '~/components/blog/metadata/BlogAuthor';
import BlogCategoryLabel from '~/components/blog/metadata/BlogCategoryLabel';
import BlogCopyLinkButton from '~/components/blog/metadata/BlogCopyLinkButton';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import BlogShareButton from '~/components/blog/metadata/BlogShareButton';
import BlogTags from '~/components/blog/metadata/BlogTags';
import type { TextSize } from '~/components/ui/Text';
import { themeLineBackgroundColor } from '~/components/ui/theme';

type Props = Readonly<{
  metadata: BlogMetadata;
  size?: TextSize;
}>;

export default function BlogMetadataSection({
  metadata,
  size = 'body3',
}: Props) {
  return (
    <div className={clsx(metadata.isSeries && 'lg:flex lg:justify-between')}>
      <section className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {metadata.level && (
          <BlogLevelLabel showIcon={true} size={size} value={metadata.level} />
        )}
        {metadata.category && metadata.isSeries && (
          <BlogCategoryLabel name={metadata.category.title} />
        )}
        {metadata.tags && !metadata.isSeries && (
          <BlogTags showAll={true} tags={metadata.tags} />
        )}
      </section>
      <div className={clsx(themeLineBackgroundColor, 'my-5 h-px')} />
      <section className="flex flex-wrap items-center justify-between gap-4">
        {metadata.author && <BlogAuthor metadata={metadata} />}
        <div className="flex items-center gap-x-4">
          <BlogCopyLinkButton href={metadata.href} />
          <BlogShareButton metadata={metadata} />
        </div>
      </section>
    </div>
  );
}
