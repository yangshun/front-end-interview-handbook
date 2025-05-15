import type { TilesPanelConfig } from '../types';
import getTabById from '../utils/getTabById';
import queryTabByPattern from '../utils/queryTabByPattern';
import type { NewTabPosition } from './tabOpen';
import tabOpen from './tabOpen';
import tabSetActive from './tabSetActive';

export type TilesActionTabSetActiveOtherwiseOpen<TabType> = Readonly<{
  payload: Readonly<{
    // Fallback of no other tabs were given.
    fallbackNeighborTabId: TabType;
    newTabConfig?: {
      closeable?: boolean;
      position?: NewTabPosition;
    };
    // Open beside this tab.
    openBesideTabId?: TabType;
    // RegExp for tabs of the same category.
    tabCategoryPattern?: RegExp;
    tabId: TabType;
  }>;
  type: 'tab-set-active-otherwise-open';
}>;

export default function tabSetActiveOtherwiseOpen<TabType>(
  tiles: TilesPanelConfig<TabType>,
  {
    fallbackNeighborTabId,
    newTabConfig,
    openBesideTabId,
    tabId,
    tabCategoryPattern,
  }: TilesActionTabSetActiveOtherwiseOpen<TabType>['payload'],
) {
  const existingTab = getTabById(tiles, tabId);

  // Tab is already open. Just have to make it active.
  if (existingTab != null) {
    return tabSetActive(tiles, {
      tabId,
    });
  }

  // Open beside this tab.
  if (openBesideTabId != null) {
    const openBesideTab = getTabById(tiles, openBesideTabId);

    if (openBesideTab != null) {
      // Open in the same panel as the source file.
      tabOpen(tiles, {
        newTabCloseable: newTabConfig?.closeable,
        newTabId: tabId,
        newTabPosition: newTabConfig?.position,
        panelId: openBesideTab.panelId,
        tabId: openBesideTab.tabId,
      });
    }
  }

  // Open beside tabs of this category.
  if (tabCategoryPattern != null) {
    const sameCategoryTabs = queryTabByPattern(tiles, tabCategoryPattern);

    if (sameCategoryTabs.length > 0) {
      return tabOpen(tiles, {
        newTabCloseable: true,
        newTabId: tabId,
        panelId: sameCategoryTabs[0].panelId,
      });
    }
  }

  const fallbackNeighborTab = getTabById(tiles, fallbackNeighborTabId);

  if (fallbackNeighborTab != null) {
    return tabOpen(tiles, {
      newTabCloseable: true,
      newTabId: tabId,
      panelId: fallbackNeighborTab?.panelId,
    });
  }

  return tiles;
}
