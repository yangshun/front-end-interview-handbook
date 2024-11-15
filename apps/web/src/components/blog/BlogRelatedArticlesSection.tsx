import clsx from 'clsx';
import type { RelatedPost } from 'contentlayer/generated';

import BlogRelatedArticleCard from '~/components/blog/articles/BlogRelatedArticleCard';
import { readBlogPostsAll } from '~/components/blog/data/BlogReader';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  relatedPosts: Array<RelatedPost>;
}>;

export default function BlogRelatedArticlesSection({ relatedPosts }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Related articles"
          description="Blog related articles section"
          id="Ia88Vb"
        />
      </Heading>
      <Section>
        <div className={clsx('grid gap-6 md:grid-cols-2')}>
          {relatedPosts.map(({ slug }, index) => {
            const post = readBlogPostsAll().find(
              (postItem) => postItem.slug === slug.trim(),
            )!;

            return (
              <div
                key={post.href}
                className={clsx(
                  index >= 2 && 'lg:col-span-2 xl:col-span-1 xl:block',
                )}>
                <BlogRelatedArticleCard metadata={post} />
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
