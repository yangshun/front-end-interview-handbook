'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import BlogArticleJsonLd from '~/components/blog/articles/BlogArticleJsonLd';
import type {
  BlogArticleNavigationType,
  BlogMetadata,
} from '~/components/blog/BlogTypes';
import BlogMainLayout from '~/components/blog/layout/BlogMainLayout';
import BlogCategoryLabel from '~/components/blog/metadata/BlogCategoryLabel';
import BlogCopyLinkButton from '~/components/blog/metadata/BlogCopyLinkButton';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import BlogShareButton from '~/components/blog/metadata/BlogShareButton';
import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

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
                <SidebarLinksList
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
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                  <Text
                    color="active"
                    display="block"
                    size="body2"
                    weight="medium">
                    <FormattedMessage
                      defaultMessage="Series"
                      description="Series tag for Article"
                      id="xXXK+w"
                    />
                  </Text>
                  <Heading level="heading4">{metadata.title}</Heading>
                  <Text color="secondary" display="block" size="body1">
                    {metadata.description}
                  </Text>
                  <div className="flex justify-between flex-wrap gap-4">
                    <section className="flex flex-wrap items-center gap-x-6 gap-y-4">
                      {metadata.level && (
                        <BlogLevelLabel
                          showIcon={true}
                          value={metadata.level}
                        />
                      )}
                      {metadata.category && (
                        <BlogCategoryLabel name={metadata.category.title} />
                      )}
                    </section>
                    <section className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-x-4">
                        <BlogCopyLinkButton href={metadata.href} />
                        <BlogShareButton metadata={metadata} />
                      </div>
                    </section>
                  </div>
                  <Divider />
                </div>
                {children}
              </div>
            </div>
          </div>
        </Container>
      </BlogMainLayout>
    </>
  );
}
