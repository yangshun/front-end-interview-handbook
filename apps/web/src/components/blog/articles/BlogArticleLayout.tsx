'use client';

import clsx from 'clsx';

import BlogArticle from '~/components/blog/articles/BlogArticle';
import BlogArticleJsonLd from '~/components/blog/articles/BlogArticleJsonLd';
import type {
  BlogArticleNavigationType,
  BlogMetadata,
} from '~/components/blog/BlogTypes';
import BlogMainLayout from '~/components/blog/layout/BlogMainLayout';
import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
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
          className={clsx('flex flex-col', 'py-6 lg:py-8')}
          width="7xl">
          <div
            className={clsx(
              'flex gap-x-10 gap-y-8 md:gap-y-10 2xl:gap-y-12',
              !navigation && 'justify-center',
            )}>
            {metadata.isSeriesArticle && navigation && (
              <div
                className={clsx(
                  'hidden xl:contents',
                  'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
                )}>
                <SidebarLinksList_DEPRECATED
                  navigation={[
                    {
                      items: navigation.items,
                      subtitle: navigation.subseriesTitle,
                      title: navigation.seriesTitle,
                    },
                  ]}
                />
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
