import type { TilesPanelConfig } from '../types';

export type TilesActionTabChangeId = Readonly<{
  payload: Readonly<{
    newTabId: string;
    oldTabId: string;
  }>;
  type: 'tab-change-id';
}>;

export default function tabChangeId(
  tiles: TilesPanelConfig,
  payload: TilesActionTabChangeId['payload'],
): TilesPanelConfig {
  const { oldTabId, newTabId } = payload;

  return tabChangeIdImpl(tiles, oldTabId, newTabId);
}

function tabChangeIdImpl(
  panel: TilesPanelConfig,
  oldTabId: string,
  newTabId: string,
): TilesPanelConfig {
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
