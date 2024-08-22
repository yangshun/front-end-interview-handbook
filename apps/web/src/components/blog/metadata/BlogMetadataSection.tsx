import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogAuthor from '~/components/blog/metadata/BlogAuthor';
import BlogCategoryLabel from '~/components/blog/metadata/BlogCategoryLabel';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import BlogTags from '~/components/blog/metadata/BlogTags';
import CopyLinkButton from '~/components/common/CopyLinkButton';
import ShareButton from '~/components/common/ShareButton';
import Divider from '~/components/ui/Divider';
import type { TextSize } from '~/components/ui/Text';

type Props = Readonly<{
  metadata: BlogMetadata;
  size?: TextSize;
}>;

export default function BlogMetadataSection({
  metadata,
  size = 'body3',
}: Props) {
  return (
    <div className="flex flex-col gap-5">
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
      <Divider />
      <section className="flex flex-wrap items-center justify-between gap-4">
        {metadata.author && <BlogAuthor metadata={metadata} />}
        <div className="flex items-center gap-x-4">
          <CopyLinkButton href={metadata.href} />
          <ShareButton metadata={metadata} />
        </div>
      </section>
      <Divider />
    </div>
  );
}
