'use client';

import clsx from 'clsx';

import type {
  BlogArticleNavigationType,
  BlogMetadata,
} from '~/components/blog/BlogTypes';
import BlogCategoryLabel from '~/components/blog/metadata/BlogCategoryLabel';
import BlogLevelLabel from '~/components/blog/metadata/BlogLevelLabel';
import CopyLinkButton from '~/components/common/CopyLinkButton';
import ShareButton from '~/components/common/ShareButton';
import { SidebarLinksList_DEPRECATED } from '~/components/global/sidebar/SidebarLinksList_DEPRECATED';
import { FormattedMessage } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

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
  return (
    <div className="flex justify-center gap-x-10 gap-y-8 md:gap-y-10 2xl:gap-y-12">
      {metadata.isSeriesArticle && navigation && (
        <div
          className={clsx(
            'hidden xl:contents',
            'sticky top-[var(--global-sticky-height)]',
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
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <Text className="block" color="active" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Series"
                description="Series tag for Article"
                id="xXXK+w"
              />
            </Text>
            <Heading level="heading4">{metadata.title}</Heading>
            <Text className="block" color="secondary" size="body1">
              {metadata.description}
            </Text>
            <div className="flex flex-wrap justify-between gap-4">
              <section className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {metadata.level && (
                  <BlogLevelLabel showIcon={true} value={metadata.level} />
                )}
                {metadata.category && (
                  <BlogCategoryLabel name={metadata.category.title} />
                )}
              </section>
              <section className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-x-4">
                  <CopyLinkButton href={metadata.href} />
                  <ShareButton metadata={metadata} />
                </div>
              </section>
            </div>
            <Divider />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
