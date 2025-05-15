import type { TilesPanelConfig } from '../types';
import getUniqueId from '../utils/getUniqueId';

export type NewTabPosition = 'after' | 'before';

export type TilesActionTabOpen<TabType> = Readonly<{
  payload: Readonly<{
    newTabCloseable?: boolean;
    newTabId?: TabType;
    newTabPosition?: NewTabPosition;
    onTabsOpen?: (tabIds: ReadonlyArray<TabType>) => void;
    panelId: string;
    // Insertion point.
    tabId?: TabType;
  }>;
  type: 'tab-open';
}>;

export default function tabOpen<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabOpen<TabType>['payload'],
): TilesPanelConfig<TabType> {
  const {
    newTabCloseable = true,
    newTabId = null,
    newTabPosition = 'before',
    onTabsOpen,
    panelId,
    tabId,
  } = payload;
  const addedTabs: Array<TabType> = [];
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

function tabOpenImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelId: string,
  tabId: TabType | null,
  {
    newTabCloseable,
    newTabId,
    newTabPosition,
  }: {
    newTabCloseable: boolean;
    newTabId: TabType | null;
    newTabPosition: NewTabPosition;
  },
  {
    onTabsOpen,
  }: {
    onTabsOpen?: (...tabIds: ReadonlyArray<TabType>) => void;
  } = {},
): TilesPanelConfig<TabType> {
  if (panel.type === 'item') {
    if (panel.id !== panelId) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    const newId = newTabId ?? (getUniqueId() as TabType);
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
