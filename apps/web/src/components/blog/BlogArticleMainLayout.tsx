'use client';

import type { Post } from 'contentlayer/generated';

import BlogArticlePagination from '~/components/blog/BlogArticlePagination';
import BlogRelatedArticlesSection from '~/components/blog/BlogRelatedArticlesSection';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogCopyLinkButton from '~/components/blog/metadata/BlogCopyLinkButton';
import BlogShareButton from '~/components/blog/metadata/BlogShareButton';
import Section from '~/components/ui/Heading/HeadingContext';

import { getAllPostsForNavigation } from '~/contentlayer/utils';
import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
  metadata: BlogMetadata;
}>;

export default function BlogArticleMainLayout({ children, metadata }: Props) {
  const { pathname } = useI18nPathname();

  const flatNavigationItems = getAllPostsForNavigation().map((post) => ({
    href: post.href,
    slug: post.slug,
    title: post.title,
  }));

  return (
    <div className="mb-12 flex flex-col gap-y-16">
      <div>{children}</div>

      {!metadata.isSeries && (
        <>
          <div className="flex items-center justify-end gap-x-4">
            <BlogCopyLinkButton href={metadata.href} />
            <BlogShareButton metadata={metadata}/>
          </div>
          <Section>
            <BlogArticlePagination
              currentHref={pathname ?? ''}
              items={flatNavigationItems}
            />
          </Section>
          {(metadata as Post).related_posts && (
            <Section>
              <BlogRelatedArticlesSection
                relatedPosts={(metadata as Post).related_posts || []}
              />
            </Section>
          )}
        </>
      )}
    </div>
  );
}
