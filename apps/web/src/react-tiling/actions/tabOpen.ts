import type { TilesPanelConfig } from '../types';
import getUniqueId from '../utils/getUniqueId';

type NewTabPosition = 'after' | 'before';

export type TilesActionTabOpen = Readonly<{
  payload: Readonly<{
    newTabCloseable?: boolean;
    // Insertion point.
    newTabId?: string;
    newTabPosition?: NewTabPosition;
    onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
    panelId: string;
    tabId?: string;
  }>;
  type: 'tab-open';
}>;

export default function tabOpen(
  tiles: TilesPanelConfig,
  payload: TilesActionTabOpen['payload'],
): TilesPanelConfig {
  const {
    panelId,
    tabId,
    newTabId = null,
    newTabCloseable = true,
    newTabPosition = 'before',
    onTabsOpen,
  } = payload;
  const addedTabs: Array<string> = [];
  const newTiles = tabOpenImpl(
    tiles,
    panelId,
    tabId ?? null,
    {
      newTabCloseable,
      newTabId,
      newTabPosition,
    },
    {
      onTabsOpen: (...tabIds) => {
        addedTabs.push(...tabIds);
      },
    },
  );

  onTabsOpen?.(addedTabs);

  return newTiles;
}

function tabOpenImpl(
  panel: TilesPanelConfig,
  panelId: string,
  tabId: string | null,
  {
    newTabId,
    newTabCloseable,
    newTabPosition,
  }: {
    newTabCloseable: boolean;
    newTabId: string | null;
    newTabPosition: NewTabPosition;
  },
  {
    onTabsOpen,
  }: {
    onTabsOpen?: (...tabIds: ReadonlyArray<string>) => void;
  } = {},
): TilesPanelConfig {
  if (panel.type === 'item') {
    if (panel.id !== panelId) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    const newId = newTabId ?? getUniqueId();
    const newTab = {
      closeable: newTabCloseable,
      id: newId,
    };

    onTabsOpen?.(newId);

    const insertionIndex = panel.tabs.findIndex(({ id }) => id === tabId);
    // Either no tab to insert or tab to be inserted cannot be found.
    const shouldAppend = tabId == null || insertionIndex === -1;

    return {
      ...panel,
      activeTabId: newId,
      tabs: shouldAppend
        ? panel.tabs.concat(newTab)
        : newTabPosition === 'before'
        ? [
            ...panel.tabs.slice(0, insertionIndex),
            newTab,
            ...panel.tabs.slice(insertionIndex),
          ]
        : [
            ...panel.tabs.slice(0, insertionIndex + 1),
            newTab,
            ...panel.tabs.slice(insertionIndex + 1),
          ],
    };
  }

  return {
    ...panel,
    items: panel.items.map((panelItem) =>
      tabOpenImpl(
        panelItem,
        panelId,
        tabId,
        { newTabCloseable, newTabId, newTabPosition },
        { onTabsOpen },
      ),
    ),
  };
}
