import type { TilesPanelConfig } from '../types';

export type TilesActionTabChangeId<TabType> = Readonly<{
  payload: Readonly<{
    newTabId: TabType;
    oldTabId: TabType;
  }>;
  type: 'tab-change-id';
}>;

export default function tabChangeId<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabChangeId<TabType>['payload'],
): TilesPanelConfig<TabType> {
  const { newTabId, oldTabId } = payload;

  return tabChangeIdImpl(tiles, oldTabId, newTabId);
}

function tabChangeIdImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  oldTabId: TabType,
  newTabId: TabType,
): TilesPanelConfig<TabType> {
  if (panel.type === 'item') {
    const index = panel.tabs.findIndex(({ id }) => id === oldTabId);

    // Non-existing tab ID, no-op.
    if (index < 0) {
      return panel;
    }

    const newTabs = panel.tabs.slice();

    newTabs[index] = {
      ...newTabs[index],
      id: newTabId,
    };

    return {
      ...panel,
      activeTabId:
        panel.activeTabId === oldTabId ? newTabId : panel.activeTabId,
      tabs: newTabs,
    };
  }

  return {
    ...panel,
    items: panel.items.map((panelItem) =>
      tabChangeIdImpl(panelItem, oldTabId, newTabId),
    ),
  };
}
