import type { TilesPanelConfig } from '../types';
import prune from '../utils/prune';

export type TilesActionTabClose = Readonly<{
  payload: Readonly<{
    onTabsClose?: (tabIds: ReadonlyArray<string>) => void;
    panelId: string;
    tabId: string;
  }>;
  type: 'tab-close';
}>;

export default function tabClose(
  tiles: TilesPanelConfig,
  payload: TilesActionTabClose['payload'],
  shouldPrune = true,
): TilesPanelConfig {
  const { panelId, tabId, onTabsClose } = payload;
  const closedTabs: Array<string> = [];
  let newTiles = tabCloseImpl(tiles, panelId, tabId, {
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

function tabCloseImpl(
  panel: TilesPanelConfig,
  panelId: string,
  tabId: string,
  {
    onTabsClose,
  }: {
    onTabsClose?: (...tabIds: ReadonlyArray<string>) => void;
  } = {},
): TilesPanelConfig | null {
  if (panel.type === 'item') {
    if (panel.id !== panelId) {
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

      return newTabs.at(tabIndex >= newTabs.length ? -1 : tabIndex)?.id;
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
      .map((item) => tabCloseImpl(item, panelId, tabId, { onTabsClose }))
      .filter((item): item is Exclude<typeof item, null> => item != null),
  };
}
