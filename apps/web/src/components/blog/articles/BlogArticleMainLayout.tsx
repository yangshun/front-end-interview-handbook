'use client';

import type { BlogPost } from 'contentlayer/generated';

import BlogRelatedArticlesSection from '~/components/blog/BlogRelatedArticlesSection';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import { readBlogPostsForNavigation } from '~/components/blog/data/BlogReader';
import BlogCopyLinkButton from '~/components/blog/metadata/BlogCopyLinkButton';
import BlogShareButton from '~/components/blog/metadata/BlogShareButton';
import ArticlePagination from '~/components/common/ArticlePagination';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
  metadata: BlogMetadata;
}>;

export default function BlogArticleMainLayout({ children, metadata }: Props) {
  const { pathname } = useI18nPathname();

  const flatNavigationItems = readBlogPostsForNavigation({
    isSeriesArticle: metadata.isSeriesArticle,
    seriesSource: (metadata as BlogPost).series,
  }).map((post) => ({
    href: post.href,
    slug: post.slug,
    title: post.title,
  }));

  return (
    <div className="flex flex-col gap-y-16">
      <div>{children}</div>
      {!metadata.isSeries && (
        <>
          <div className="flex items-center justify-end gap-x-4">
            <BlogCopyLinkButton href={metadata.href} />
            <BlogShareButton metadata={metadata} />
          </div>
          <Section>
            <ArticlePagination
              activeItem={pathname ?? ''}
              items={flatNavigationItems}
            />
          </Section>
          {(metadata as BlogPost).relatedPosts && (
            <Section>
              <BlogRelatedArticlesSection
                relatedPosts={(metadata as BlogPost).relatedPosts || []}
              />
            </Section>
          )}
        </>
      )}
    </div>
  );
}