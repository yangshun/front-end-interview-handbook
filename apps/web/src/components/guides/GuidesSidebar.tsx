'use client';

import type { GuidebookItem } from '@prisma/client';
import clsx from 'clsx';
import React, { memo } from 'react';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import SidebarLinksSection from '../global/sidebar/SidebarLinksSection';
import GuidesDropdownMenu from './GuidesDropdownMenu';
import GuidesFocusModeToggle from './GuidesFocusModeToggle';
import type { GuideNavigation } from './types';

type Props<GuideSlug extends string> = Readonly<{
  guide: GuidebookItem;
  isFocusMode?: boolean;
  mode?: 'navbar' | 'sidebar';
  navigation: GuideNavigation<GuideSlug>;
  onClose?: () => void;
  sticky?: boolean;
  toggleFocusMode?: () => void;
}>;

export function GuidesSidebar<GuideSlug extends string>({
  guide,
  isFocusMode = false,
  mode = 'sidebar',
  navigation,
  onClose,
  sticky = false,
  toggleFocusMode,
}: Props<GuideSlug>) {
  const isSidebar = mode === 'sidebar';

  return (
    <div
      className={clsx(
        'shrink-0',
        isSidebar
          ? isFocusMode
            ? null
            : 'w-[var(--guides-sidebar-width)]'
          : 'w-full',
      )}>
      <nav
        className={clsx(
          'flex shrink-0 flex-col justify-end',
          isSidebar && ['border-e', themeBorderColor],
          isFocusMode ? 'w-[var(--guides-sidebar-width-collapsed)]' : 'w-full',
          sticky && 'sticky',
        )}
        style={{
          height: sticky
            ? `calc(100vh - var(--global-sticky-height))`
            : undefined,
          top: 'calc(var(--global-sticky-height))',
        }}>
        <div
          className={clsx(
            'grow-0 flex-col gap-1',
            isFocusMode ? 'hidden' : 'flex',
            'w-full',
            'px-4 py-4',
            ['border-b', themeBorderColor],
          )}>
          <Text className="px-2" color="secondary" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="Current guide"
              description="Label for current guide title"
              id="3wygra"
            />
          </Text>
          <MemoizedGuidesDropdownMenu guide={guide} />
        </div>
        <div
          className={clsx(
            // Using native scrollbar instead of ScrollArea because when we expand links accordion
            // and when the scrollbar appear if the items are long it causes re-rendering of the ScrollArea
            // and performance issue in Safari due to it
            'thin-scrollbar overflow-y-auto',
            isFocusMode ? 'hidden' : 'flex grow',
            isSidebar && 'vignette-scroll',
          )}>
          <div className="w-full p-4">
            <MemoizedSidebarLinksSection
              defaultOpenSections={navigation.initialOpenSections}
              items={navigation.navigation.items}
              type="multiple"
              onItemClick={onClose}
            />
          </div>
        </div>
        {isSidebar && (
          <div
            className={clsx(
              'flex shrink-0 items-center justify-stretch',
              'w-full',
              'h-12 px-6',
              ['border-t', themeBorderColor],
            )}>
            <GuidesFocusModeToggle
              isFocusMode={isFocusMode}
              toggleFocusMode={toggleFocusMode}
            />
          </div>
        )}
      </nav>
    </div>
  );
}

const MemoizedSidebarLinksSection = memo(SidebarLinksSection);
const MemoizedGuidesDropdownMenu = memo(GuidesDropdownMenu);
