'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';

import { GuidesSidebar } from '~/components/guides/GuidesSidebar';

import type { GuideNavigation } from './types';

type GuidesContextType = Readonly<{
  collapsedToC: boolean;
  setCollapsedToC: (value: boolean) => void;
}>;

const GuidesContext = createContext<GuidesContextType>({
  collapsedToC: false,
  setCollapsedToC: () => {},
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
  navigation: GuideNavigation;
}>;

export default function GuidesLayout({ children, navigation }: Props) {
  const [isFocusMode, toggleFocusMode] = useToggle();
  const [collapsedToC, setCollapsedToC] = useState(isFocusMode);

  useEffect(() => {
    setCollapsedToC(isFocusMode);
  }, [isFocusMode]);

  return (
    <GuidesContext.Provider value={{ collapsedToC, setCollapsedToC }}>
      <div className="w-full">
        <div className="mx-auto flex">
          <div
            className={clsx(
              'hidden lg:contents',
              'sticky top-[var(--global-sticky-height)]',
            )}>
            <GuidesSidebar
              isFocusMode={isFocusMode}
              navigation={navigation}
              sticky={true}
              toggleFocusMode={toggleFocusMode}
            />
          </div>
          {children}
        </div>
      </div>
    </GuidesContext.Provider>
  );
}
