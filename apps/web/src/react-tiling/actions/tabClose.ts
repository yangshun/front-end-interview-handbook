import type { TilesPanelConfig } from '../types';
import prune from '../utils/prune';

export type TilesActionTabClose<TabType> = Readonly<{
  payload: Readonly<{
    onTabsClose?: (tabIds: ReadonlyArray<TabType>) => void;
    tabId: TabType;
  }>;
  type: 'tab-close';
}>;

export default function tabClose<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabClose<TabType>['payload'],
  shouldPrune = true,
): TilesPanelConfig<TabType> {
  const { onTabsClose, tabId } = payload;
  const closedTabs: Array<TabType> = [];
  let newTiles = tabCloseImpl(tiles, tabId, {
    onTabsClose: (...tabIds) => {
      closedTabs.push(...tabIds);
    },
  });

  if (newTiles == null) {
    return tiles;
  }

  if (shouldPrune) {
    newTiles = prune(newTiles);
  }

  onTabsClose?.(closedTabs);

  return newTiles ?? tiles;
}

function tabCloseImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  tabId: TabType,
  {
    onTabsClose,
  }: {
    onTabsClose?: (...tabIds: ReadonlyArray<TabType>) => void;
  } = {},
): TilesPanelConfig<TabType> | null {
  if (panel.type === 'item') {
    if (panel.tabs.findIndex((tab) => tab.id === tabId) === -1) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    const newTabs = panel.tabs.filter((tab) => tab.id !== tabId);

    const newActiveTabId = (() => {
      if (panel.activeTabId !== tabId) {
        return panel.activeTabId;
      }

      const tabIndex = panel.tabs.findIndex((tab) => tab.id === tabId);

      return newTabs[Math.min(tabIndex, newTabs.length - 1)]?.id;
    })();

    onTabsClose?.(tabId);

    return {
      ...panel,
      activeTabId: newActiveTabId ?? newTabs[0]?.id ?? null,
      tabs: newTabs,
    };
  }

  // Usual case where there are still siblings left within parent after removal.
  return {
    ...panel,
    items: panel.items
      .map((item) => tabCloseImpl(item, tabId, { onTabsClose }))
      .filter((item): item is Exclude<typeof item, null> => item != null),
  };
}
