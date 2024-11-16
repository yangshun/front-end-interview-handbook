'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import BlogArticle from '~/components/blog/articles/BlogArticle';
import BlogArticleJsonLd from '~/components/blog/articles/BlogArticleJsonLd';
import type {
  BlogArticleNavigationType,
  BlogMetadata,
} from '~/components/blog/BlogTypes';
import BlogMainLayout from '~/components/blog/layout/BlogMainLayout';
import SideNavigation from '~/components/common/SideNavigation';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
  metadata: BlogMetadata;
  seriesContents?: BlogArticleNavigationType | null;
}>;

export default function BlogArticleLayout({
  children,
  metadata,
  seriesContents,
}: Props) {
  const router = useRouter();
  const { pathname } = useI18nPathname();

  return (
    <>
      <BlogArticleJsonLd
        description={metadata.description}
        isAccessibleForFree={true}
        pathname={pathname}
        title={metadata.title}
      />
      <BlogMainLayout seriesContents={seriesContents}>
        <Container className={clsx('flex flex-col')} width="app">
          <div
            className={clsx(
              'flex gap-x-10 gap-y-8 md:gap-y-10 2xl:gap-y-12',
              !seriesContents && 'justify-center',
            )}>
            {metadata.isSeriesArticle && seriesContents && (
              <div
                className={clsx(
                  'hidden md:block',
                  'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
                  'w-[200px]',
                )}>
                {seriesContents.subseriesTitle && (
                  <Text color="secondary" size="body3" weight="bold">
                    {seriesContents.seriesTitle}
                  </Text>
                )}
                <div className="flex flex-col flex-wrap gap-3">
                  <Text size="body2" weight="bold">
                    {seriesContents.subseriesTitle ||
                      seriesContents.seriesTitle}
                  </Text>
                  <SideNavigation
                    activeValue={pathname}
                    items={seriesContents.items.map((item) => ({
                      label: item.label,
                      value: item.href,
                    }))}
                    onClick={(value) => {
                      router.push(value);
                    }}
                  />
                </div>
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
