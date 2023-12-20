'use client';

import type { BlogTag } from '~/data/blog/Tag';

import BlogExploreTagList from '~/components/blog/BlogExploreTagList';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  articles: ReadonlyArray<BlogMetadata>;
  blogTag: BlogTag;
  series: ReadonlyArray<BlogMetadata>;
}>;

export default function BlogExploreTagPage({
  blogTag,
  articles,
  series,
}: Props) {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <Heading level="heading5">{blogTag.name}</Heading>
        <Text color="secondary" size="body1">
          {blogTag.description}
        </Text>
      </div>
      <Section>
        <BlogExploreTagList
          articles={articles}
          series={series}
          tagType={blogTag.type}
        />
      </Section>
    </div>
  );
}
