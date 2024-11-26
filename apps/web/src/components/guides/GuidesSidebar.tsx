'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import GuidesDropdownMenu from './GuidesDropdownMenu';
import GuidesFocusModeToggle from './GuidesFocusModeToggle';
import type { GuideNavigation } from './types';
import SidebarLinksSection from '../global/sidebar/SidebarLinksSection';

import type { GuidebookItem } from '@prisma/client';

type Props = Readonly<{
  guide: GuidebookItem;
  isFocusMode?: boolean;
  mode?: 'navbar' | 'sidebar';
  navigation: GuideNavigation;
  sticky?: boolean;
  toggleFocusMode?: () => void;
}>;

export function GuidesSidebar({
  guide,
  sticky = false,
  navigation,
  mode = 'sidebar',
  isFocusMode = false,
  toggleFocusMode,
}: Props) {
  const isSidebar = mode === 'sidebar';

  return (
    <div
      className={clsx(
        'shrink-0',
        isSidebar ? (isFocusMode ? 'xl:w-60' : 'w-60') : 'w-full',
      )}>
      <nav
        className={clsx(
          'flex shrink-0 flex-col justify-end',
          isSidebar && ['border-e', themeBorderColor],
          isFocusMode ? 'w-[78px]' : 'w-full',
          sticky && 'sticky',
        )}
        style={{
          height: sticky
            ? 'calc(100vh - var(--global-sticky-height))'
            : undefined,
          top: 'calc(var(--global-sticky-height))',
        }}>
        {!isFocusMode && (
          <>
            <div
              className={clsx(
                'flex grow-0 flex-col gap-1',
                'w-full',
                'px-4 py-4',
                ['border-b', themeBorderColor],
              )}>
              <Text
                className="px-2"
                color="secondary"
                size="body3"
                weight="medium">
                <FormattedMessage
                  defaultMessage="Current guide"
                  description="Label for current guide title"
                  id="3wygra"
                />
              </Text>
              <GuidesDropdownMenu guide={guide} />
            </div>
            <div
              className={clsx(
                'flex grow overflow-hidden',
                isSidebar && 'vignette-scroll',
              )}>
              <ScrollArea viewportClass={clsx('p-4')}>
                <SidebarLinksSection
                  items={navigation.items}
                  size="sm"
                  type="multiple"
                />
              </ScrollArea>
            </div>
          </>
        )}
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
