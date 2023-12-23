import clsx from 'clsx';
import type { RelatedPost } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import BlogRelatedArticleCard from '~/components/blog/articles/BlogRelatedArticleCard';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { getAllPosts } from '~/contentlayer/utils';

type Props = Readonly<{
  relatedPosts: Array<RelatedPost>;
}>;

export default function BlogRelatedArticlesSection({ relatedPosts }: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="my-0 text-xl font-semibold" level="custom">
        <FormattedMessage
          defaultMessage="Related Articles"
          description="Blog related articles section"
          id="dZGFzA"
        />
      </Heading>
      <Section>
        <div className={clsx('grid gap-6 lg:grid-cols-2')}>
          {relatedPosts.map(({ slug }, index) => {
            const post = getAllPosts({ sort: true }).find(
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
