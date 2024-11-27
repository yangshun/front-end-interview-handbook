'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';

import useIsSticky from '~/hooks/useIsSticky';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';
import { themeBorderColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type { GuideNavigation } from './types';

import type { GuidebookItem } from '@prisma/client';

export default function GuidesNavbar({
  guide,
  navigation,
  tableOfContents,
}: Readonly<{
  guide: GuidebookItem;
  navigation: GuideNavigation;
  tableOfContents: TableOfContents | undefined;
}>) {
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

  useEffect(() => {
    // Hide right sidebar when hash changes.
    const onHashChanged = () => {
      setIsRightSidebarOpen(false);
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  });

  return (
    <div
      ref={navbarRef}
      className={clsx(
        'lg:hidden',
        'z-sticky sticky top-[var(--global-sticky-height)]',
        !isSticky && 'bg-white dark:bg-neutral-900/60',
        'backdrop-blur',
        [themeBorderColor, 'border-b'],
      )}
      style={{ top: 'var(--global-sticky-height)' }}>
      <Container className="flex h-10 items-center justify-between">
        <SlideOut
          enterFrom="start"
          isShown={isLeftSidebarOpen}
          padding={false}
          size="sm"
          title={navigation.navigation.title}
          trigger={
            <Button
              addonPosition="start"
              icon={RiMenu2Line}
              label={intl.formatMessage({
                defaultMessage: 'Menu',
                description: 'Guides navbar menu button label',
                id: 'oo7GzR',
              })}
              size="xs"
              variant="secondary"
              onClick={() => {
                setIsLeftSidebarOpen(true);
              }}
            />
          }
          onClose={() => setIsLeftSidebarOpen(false)}>
          <GuidesSidebar guide={guide} mode="navbar" navigation={navigation} />
        </SlideOut>
        {tableOfContents && (
          <SlideOut
            enterFrom="end"
            isShown={isRightSidebarOpen}
            size="sm"
            trigger={
              <Button
                addonPosition="start"
                icon={RiListUnordered}
                label={intl.formatMessage({
                  defaultMessage: 'Table of Contents',
                  description: 'Guides table of contents menu button label',
                  id: 'WZy7m4',
                })}
                size="xs"
                variant="secondary"
                onClick={() => {
                  setIsRightSidebarOpen(true);
                }}
              />
            }
            onClose={() => setIsRightSidebarOpen(false)}>
            <GuidesTableOfContents tableOfContents={tableOfContents} />
          </SlideOut>
        )}
      </Container>
    </div>
  );
}
