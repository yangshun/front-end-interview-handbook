'use client';

import clsx from 'clsx';

import BlogArticle from '~/components/blog/BlogArticle';
import BlogArticleJsonLd from '~/components/blog/BlogArticleJsonLd';
import type { BlogArticleNavigationType } from '~/components/blog/BlogArticleSidebar';
import { BlogArticleSidebar } from '~/components/blog/BlogArticleSidebar';
import BlogMainLayout from '~/components/blog/BlogMainLayout';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Container from '~/components/ui/Container';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
  metadata: BlogMetadata;
  navigation?: BlogArticleNavigationType | null;
}>;

export default function BlogArticleLayout({
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
          className={clsx(
            'flex flex-col',
            'py-6 lg:py-8',
            'gap-y-8 md:gap-y-10 2xl:gap-y-12',
          )}
          variant="normal">
          <div className="flex justify-center gap-x-10">
            {metadata.isSeriesArticle && navigation && (
              <div
                className="sticky hidden md:contents"
                style={{ top: 'var(--nav-top-offset)' }}>
                <BlogArticleSidebar navigation={navigation} />
              </div>
            )}
            <div
              className={clsx(
                'w-full lg:!max-w-[calc(720px_-_1.5rem)] xl:!max-w-[calc(720px_-_1rem)]',
              )}>
              <BlogArticle metadata={metadata}>{children}</BlogArticle>
            </div>
          </div>
        </Container>
      </BlogMainLayout>
    </>
  );
}
