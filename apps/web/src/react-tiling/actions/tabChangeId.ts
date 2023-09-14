import { TilesPanelConfig } from '../types';

export type TilesActionTabChangeId = Readonly<{
  type: 'tab-change-id';
  payload: Readonly<{
    oldTabId: string;
    newTabId: string;
  }>;
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
      tabs: newTabs,
      activeTabId:
        panel.activeTabId === oldTabId ? newTabId : panel.activeTabId,
    };
  }

  return {
    ...panel,
    items: panel.items.map((panel) =>
      tabChangeIdImpl(panel, oldTabId, newTabId),
    ),
  };
}
