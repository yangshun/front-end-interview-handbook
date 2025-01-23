'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { GuidesSidebar } from '~/components/guides/GuidesSidebar';

import type { GuideNavigation } from './types';

import type { GuidebookItem } from '@prisma/client';

type GuidesContextType = Readonly<{
  collapsedToC: boolean;
  focusMode: boolean;
  isMobileGuideMenuOpen: boolean;
  setCollapsedToC: (value: boolean) => void;
  setIsMobileGuideMenuOpen: (value: boolean) => void;
  toggleFocusMode: () => void;
}>;

const GuidesContext = createContext<GuidesContextType>({
  collapsedToC: false,
  focusMode: false,
  isMobileGuideMenuOpen: false,
  setCollapsedToC: () => {},
  setIsMobileGuideMenuOpen: () => {},
  toggleFocusMode: () => {},
});

export function useGuidesContext() {
  const context = useContext(GuidesContext);

  // TODO(interviews/study-list): define GuideContext for study-list mode.
  // if (context === undefined) {
  //   throw new Error(
  //     'useGuidesContext must be used within a GuidesContextProvider',
  //   );
  // }

  return context;
}

type Props = Readonly<{
  children: ReactNode;
  guide: GuidebookItem;
  navigation: GuideNavigation;
}>;

export default function GuidesLayout({ children, guide, navigation }: Props) {
  const [focusMode, toggleFocusMode] = useToggle();
  const [collapsedToC, setCollapsedToC] = useState(focusMode);
  const [isMobileGuideMenuOpen, setIsMobileGuideMenuOpen] = useState(false);

  useEffect(() => {
    setCollapsedToC(focusMode);
  }, [focusMode]);

  return (
    <GuidesContext.Provider
      value={{
        collapsedToC,
        focusMode,
        isMobileGuideMenuOpen,
        setCollapsedToC,
        setIsMobileGuideMenuOpen,
        toggleFocusMode,
      }}>
      <div
        className="flex w-full"
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          '--guides-sidebar-width': '240px',
          '--guides-sidebar-width-collapsed': '78px',
        }}>
        <div
          className={clsx(
            'hidden lg:contents',
            'sticky top-[var(--global-sticky-height)]',
          )}>
          <GuidesSidebar
            guide={guide}
            isFocusMode={focusMode}
            navigation={navigation}
            sticky={true}
            toggleFocusMode={toggleFocusMode}
          />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </GuidesContext.Provider>
  );
}
