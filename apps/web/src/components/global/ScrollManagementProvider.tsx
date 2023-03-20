'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type ScrollManagementContextType = Readonly<{
  setShouldScrollToTop: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const ScrollManagementContext = createContext<ScrollManagementContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShouldScrollToTop: () => {},
});

export function useScrollManagement() {
  return useContext(ScrollManagementContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

// TODO: Remove this when Next.js 13 app directory
// doesn't have this bug.
export default function ScrollManagementProvider({ children }: Props) {
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  // Ok to use usePathname since it's for between pages and we want
  // to differentiate between different locales for the same page.
  const pathname = usePathname();

  const currentPathname = useRef<string | null>(pathname);

  useEffect(() => {
    if (currentPathname.current === pathname || !shouldScrollToTop) {
      return;
    }

    window.scrollTo({
      left: 0,
      top: 0,
    });
    setShouldScrollToTop(false);
    currentPathname.current = pathname;
  }, [pathname, shouldScrollToTop]);

  return (
    <ScrollManagementContext.Provider
      value={{
        setShouldScrollToTop,
      }}>
      {children}
    </ScrollManagementContext.Provider>
  );
}
