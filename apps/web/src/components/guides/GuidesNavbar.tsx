'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiListUnordered, RiMenu2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useIsSticky from '~/hooks/useIsSticky';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import SlideOutOld from '~/components/ui/SlideOutOld';
import { themeBorderColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { GuideNavigation } from './GuidesLayoutSidebar';
import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';

export default function GuidesNavbar({
  navigation,
  tableOfContents,
}: Readonly<{
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
        'z-sticky sticky border-b lg:hidden',
        [!isSticky && 'bg-white dark:bg-neutral-950/60', 'backdrop-blur'],
        themeBorderColor,
      )}
      style={{ top: 'var(--nav-top-offset)' }}>
      <Container className="flex h-10 items-center justify-between">
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
        {tableOfContents && (
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
        )}
      </Container>
      <SlideOutOld
        enterFrom="start"
        isShown={isLeftSidebarOpen}
        size="sm"
        title={navigation.title}
        onClose={() => setIsLeftSidebarOpen(false)}>
        <GuidesSidebar navigation={navigation} />
      </SlideOutOld>
      {tableOfContents && (
        <SlideOutOld
          enterFrom="end"
          isShown={isRightSidebarOpen}
          size="sm"
          onClose={() => setIsRightSidebarOpen(false)}>
          <GuidesTableOfContents tableOfContents={tableOfContents} />
        </SlideOutOld>
      )}
    </div>
  );
}
