import type { TilesPanelConfig } from '../types';

export default function getTabById<TabType>(
  tiles: TilesPanelConfig<TabType>,
  tabId: TabType,
): Readonly<{ panelId: string; tabId: TabType }> | null {
  if (tiles.type === 'item') {
    if (tiles.tabs.find(({ id }) => id === tabId)) {
      return {
        panelId: tiles.id,
        tabId,
      };
    }

    return null;
  }

  for (const item of tiles.items) {
    const result = getTabById(item, tabId);

    if (result) {
      return result;
    }
  }

  return null;
}
