'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { GuidesSidebar } from '~/components/guides/GuidesSidebar';

import GuidesPagination from './GuidesPagination';
import type { GuideNavigation } from './types';

import type { GuidebookItem } from '@prisma/client';

type GuidesContextType = Readonly<{
  collapsedToC: boolean;
  isMobileGuideMenuOpen: boolean;
  setCollapsedToC: (value: boolean) => void;
  setIsMobileGuideMenuOpen: (value: boolean) => void;
}>;

const GuidesContext = createContext<GuidesContextType>({
  collapsedToC: false,
  isMobileGuideMenuOpen: false,
  setCollapsedToC: () => {},
  setIsMobileGuideMenuOpen: () => {},
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
  const [isFocusMode, toggleFocusMode] = useToggle();
  const [collapsedToC, setCollapsedToC] = useState(isFocusMode);
  const [isMobileGuideMenuOpen, setIsMobileGuideMenuOpen] = useState(false);

  useEffect(() => {
    setCollapsedToC(isFocusMode);
  }, [isFocusMode]);

  return (
    <GuidesContext.Provider
      value={{
        collapsedToC,
        isMobileGuideMenuOpen,
        setCollapsedToC,
        setIsMobileGuideMenuOpen,
      }}>
      <div className="w-full">
        <div className="mx-auto flex">
          <div
            className={clsx(
              'hidden lg:contents',
              'sticky top-[var(--global-sticky-height)]',
            )}>
            <GuidesSidebar
              guide={guide}
              isFocusMode={isFocusMode}
              navigation={navigation}
              sticky={true}
              toggleFocusMode={toggleFocusMode}
            />
          </div>
          {children}
        </div>
        <GuidesPagination guide={guide} navigation={navigation} />
      </div>
    </GuidesContext.Provider>
  );
}
