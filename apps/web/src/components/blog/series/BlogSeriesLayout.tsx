'use client';

import clsx from 'clsx';

import BlogArticle from '~/components/blog/articles/BlogArticle';
import BlogArticleJsonLd from '~/components/blog/articles/BlogArticleJsonLd';
import type { BlogArticleNavigationType } from '~/components/blog/articles/BlogArticleSidebar';
import { BlogArticleSidebar } from '~/components/blog/articles/BlogArticleSidebar';
import BlogMainLayout from '~/components/blog/BlogMainLayout';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Container from '~/components/ui/Container';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
  metadata: BlogMetadata;
  navigation?: BlogArticleNavigationType | null;
}>;

export default function BlogSeriesLayout({
  children,
  metadata,
  navigation,
}: Props) {
  const { pathname } = useI18nPathname();

  return (
    <>
      <BlogArticleJsonLd
        description={metadata.description}
        isAccessibleForFree={true}
        pathname={pathname}
        title={metadata.title}
      />
      <BlogMainLayout seriesContents={navigation}>
        <Container
          className={clsx('flex flex-col', 'py-6 lg:py-8')}
          variant="normal">
          <div className="flex justify-center gap-x-10 gap-y-8 md:gap-y-10 2xl:gap-y-12">
            {metadata.isSeriesArticle && navigation && (
              <div
                className="sticky hidden xl:contents"
                style={{ top: 'var(--nav-top-offset)' }}>
                <BlogArticleSidebar navigation={navigation} />
              </div>
            )}
            <div className={clsx('w-full max-w-2xl')}>
              <BlogArticle metadata={metadata}>{children}</BlogArticle>
            </div>
          </div>
        </Container>
      </BlogMainLayout>
    </>
  );
}
