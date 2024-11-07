'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';

import useIsSticky from '~/hooks/useIsSticky';

import type { BlogArticleNavigationType } from '~/components/blog/BlogTypes';
import type { BlogSeriesNavigationLink } from '~/components/blog/layout/BlogSidebar';
import BlogSidebar from '~/components/blog/layout/BlogSidebar';
import type { SideNavigationItems } from '~/components/common/SideNavigation';
import SideNavigation from '~/components/common/SideNavigation';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

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
  seriesContents?: BlogArticleNavigationType | null;
}>;

export default function BlogNavbar({ seriesContents }: Props) {
  const intl = useIntl();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const { pathname } = useI18nPathname();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);
  const router = useRouter();

  useEffect(() => {
    // Hide left sidebar when page changes.
    setIsLeftSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      ref={navbarRef}
      className={clsx(
        'lg:hidden',
        'z-sticky sticky top-[var(--global-sticky-height)]',
        [!isSticky && 'bg-white dark:bg-neutral-900/60', 'backdrop-blur'],
        [themeBorderColor, 'border-b'],
      )}>
      <Container className="flex h-10 items-center justify-between">
        <SlideOut
          enterFrom="start"
          isShown={isLeftSidebarOpen}
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Blog Menu',
            description: 'Blog navbar menu button label',
            id: 'thlYdk',
          })}
          trigger={
            <Button
              addonPosition="start"
              className="lg:invisible"
              icon={RiMenu2Line}
              label={intl.formatMessage({
                defaultMessage: 'Blog Menu',
                description: 'Blog navbar menu button label',
                id: 'thlYdk',
              })}
              size="xs"
              variant="secondary"
              onClick={() => {
                setIsLeftSidebarOpen(true);
              }}
            />
          }
          onClose={() => setIsLeftSidebarOpen(false)}>
          <BlogSidebar />
        </SlideOut>
        {seriesContents && (
          <SlideOut
            enterFrom="end"
            isShown={isRightSidebarOpen}
            size="sm"
            trigger={
              <Button
                addonPosition="start"
                icon={RiListUnordered}
                label={intl.formatMessage({
                  defaultMessage: 'Series Contents',
                  description: 'Series contents navigation menu button label',
                  id: 'KPn83+',
                })}
                size="xs"
                variant="secondary"
                onClick={() => {
                  setIsRightSidebarOpen(true);
                }}
              />
            }
            onClose={() => setIsRightSidebarOpen(false)}>
            <div
              key={seriesContents.seriesTitle || seriesContents.subseriesTitle}>
              {seriesContents.subseriesTitle && (
                <Text
                  className="text-neutral-700 dark:text-neutral-500"
                  size="body3"
                  weight="bold">
                  {seriesContents.seriesTitle}
                </Text>
              )}
              <div className="flex flex-col flex-wrap gap-3">
                <Text size="body2" weight="bold">
                  {seriesContents.subseriesTitle || seriesContents.seriesTitle}
                </Text>

                <SideNavigation
                  activeValue={pathname}
                  items={convertToSideNavigationItem(seriesContents.items)}
                  onClick={(value) => {
                    router.push(value);
                  }}
                />
              </div>
            </div>
          </SlideOut>
        )}
      </Container>
    </div>
  );
}
