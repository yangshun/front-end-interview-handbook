'use client';

import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import SlideOut from '~/components/ui/SlideOut';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { GuideNavigation } from './GuidesLayoutSidebar';
import { GuidesSidebar } from './GuidesSidebar';
import Button from '../ui/Button';

import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';

export default function GuidesNavbar({
  navigation,
}: Readonly<{
  navigation: GuideNavigation;
}>) {
  const intl = useIntl();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useI18nPathname();

  useEffect(() => {
    // Hide sidebar when page changes.
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div
      className="sticky z-30 border-b border-slate-200 bg-white lg:hidden"
      style={{ top: 'var(--navbar-height)' }}>
      <Container className="flex h-10 items-center">
        <Button
          addonPosition="start"
          icon={Bars3BottomLeftIcon}
          label={intl.formatMessage({
            defaultMessage: 'Menu',
            description: 'Guides navbar menu button label',
            id: 'oo7GzR',
          })}
          size="sm"
          variant="tertiary"
          onClick={() => {
            setIsSidebarOpen(true);
          }}
        />
      </Container>
      <SlideOut
        enterFrom="start"
        isShown={isSidebarOpen}
        size="sm"
        title={navigation.title}
        onClose={() => setIsSidebarOpen(false)}>
        <div className="p-4">
          <GuidesSidebar navigation={navigation} />
        </div>
      </SlideOut>
    </div>
  );
}
