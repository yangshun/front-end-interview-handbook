import { useEffect, useState } from 'react';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';
import type { TilesPanelConfig } from '~/react-tiling/types';

type LayoutType = 'desktop' | 'tablet' | null;

type UseTabletResponsiveLayoutParams<TabType extends string> = {
  getDesktopLayout: () => TilesPanelConfig<TabType>;
  getTabletLayout: () => TilesPanelConfig<TabType>;
  isUserAgentTablet: boolean;
};

const TABLET_BREAKPOINT = 1023;

export default function useTabletResponsiveLayout<TabType extends string>({
  getDesktopLayout,
  getTabletLayout,
  isUserAgentTablet,
}: UseTabletResponsiveLayoutParams<TabType>) {
  const {
    disableActiveTabScrollIntoView,
    resetActiveTabScrollIntoView,
    tilesDispatch,
  } = useTilesContext<TabType>();
  const [currentLayoutType, setCurrentLayoutType] = useState<LayoutType>(
    isUserAgentTablet ? 'tablet' : null,
  );

  useEffect(() => {
    function handleResize() {
      const newLayoutType =
        window.innerWidth <= TABLET_BREAKPOINT ? 'tablet' : 'desktop';

      const isTablet = newLayoutType === 'tablet';

      // Only dispatch layout change if the layout type actually changed
      if (currentLayoutType !== newLayoutType) {
        const layout = isTablet ? getTabletLayout() : getDesktopLayout();

        if (isTablet) {
          disableActiveTabScrollIntoView();
        } else {
          resetActiveTabScrollIntoView();
        }

        tilesDispatch({
          payload: {
            panels: layout,
          },
          type: 'layout-change',
        });

        setCurrentLayoutType(newLayoutType);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [
    currentLayoutType,
    disableActiveTabScrollIntoView,
    resetActiveTabScrollIntoView,
    tilesDispatch,
    getDesktopLayout,
    getTabletLayout,
  ]);

  return {
    currentLayoutType,
    isTablet: currentLayoutType === 'tablet',
  };
}
