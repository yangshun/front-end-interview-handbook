import { TilesPanelConfig } from '../types';
import getUniqueId from '../utils/getUniqueId';

type NewTabPosition = 'before' | 'after';

export type TilesActionTabOpen = Readonly<{
  type: 'tab-open';
  payload: Readonly<{
    panelId: string;
    tabId?: string; // Insertion point.
    newTabId?: string;
    newTabCloseable?: boolean;
    newTabPosition?: NewTabPosition;
    onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
  }>;
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
      newTabId,
      newTabCloseable,
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
    newTabId: string | null;
    newTabCloseable: boolean;
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
      return panel;
    }

    const newId = newTabId ?? getUniqueId();
    const newTab = {
      id: newId,
      closeable: newTabCloseable,
    };

    onTabsOpen?.(newId);
    const insertionIndex = panel.tabs.findIndex(({ id }) => id == tabId);
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
    items: panel.items.map((panel) =>
      tabOpenImpl(
        panel,
        panelId,
        tabId,
        { newTabId, newTabCloseable, newTabPosition },
        { onTabsOpen },
      ),
    ),
  };
}
