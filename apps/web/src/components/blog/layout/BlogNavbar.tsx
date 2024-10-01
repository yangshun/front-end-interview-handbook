'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';

import useIsSticky from '~/hooks/useIsSticky';

import type { BlogArticleNavigationType } from '~/components/blog/BlogTypes';
import BlogSidebar from '~/components/blog/layout/BlogSidebar';
import { SidebarLinksList } from '~/components/common/SidebarLinksList';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';
import { themeBorderColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

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
            <SidebarLinksList
              navigation={[
                {
                  items: seriesContents.items,
                  subtitle: seriesContents.subseriesTitle,
                  title: seriesContents.seriesTitle,
                },
              ]}
            />
          </SlideOut>
        )}
      </Container>
    </div>
  );
}
