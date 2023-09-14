import { TilesPanelConfig } from '../types';

export default function getTabById(
  tiles: TilesPanelConfig,
  tabId: string,
): Readonly<{ tabId: string; panelId: string }> | null {
  if (tiles.type === 'item') {
    if (tiles.tabs.find(({ id }) => id === tabId)) {
      return {
        tabId,
        panelId: tiles.id,
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
