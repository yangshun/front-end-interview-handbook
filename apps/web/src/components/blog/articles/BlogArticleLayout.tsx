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
import type { BlogSeriesNavigationLink } from '~/components/blog/layout/BlogSidebar';
import type { SideNavigationItems } from '~/components/common/SideNavigation';
import SideNavigation from '~/components/common/SideNavigation';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

function convertToSideNavigationItem(
  tocItems: ReadonlyArray<BlogSeriesNavigationLink>,
): SideNavigationItems<string> {
  return tocItems.map((item) => ({
    label: item.label,
    value: item.href,
  }));
}
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
      <BlogMainLayout seriesContents={navigation}>
        <Container
          className={clsx('flex flex-col', 'py-6 lg:py-8')}
          width="app">
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
                <div key={navigation.seriesTitle || navigation.subseriesTitle}>
                  {navigation.subseriesTitle && (
                    <Text
                      className="text-neutral-700 dark:text-neutral-500"
                      size="body3"
                      weight="bold">
                      {navigation.seriesTitle}
                    </Text>
                  )}
                  <div className="flex flex-col flex-wrap gap-3">
                    <Text size="body2" weight="bold">
                      {navigation.subseriesTitle || navigation.seriesTitle}
                    </Text>

                    <SideNavigation
                      activeValue={pathname}
                      items={convertToSideNavigationItem(navigation.items)}
                      onClick={(value) => {
                        router.push(value);
                      }}
                    />
                  </div>
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
