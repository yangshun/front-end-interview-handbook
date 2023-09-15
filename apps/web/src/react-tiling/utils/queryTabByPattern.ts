import type { TilesPanelConfig } from '../types';

export default function queryTabByPattern(
  tiles: TilesPanelConfig,
  regex: RegExp,
): ReadonlyArray<Readonly<{ panelId: string, tabId: string; }>> {
  const matchedTabs: Array<Readonly<{ panelId: string, tabId: string; }>> = [];

  if (tiles.type === 'item') {
    tiles.tabs.forEach(({ id }) => {
      if (regex.test(id)) {
        matchedTabs.push({
          panelId: tiles.id,
          tabId: id,
        });
      }
    });

    return matchedTabs;
  }

  for (const item of tiles.items) {
    const tabs = queryTabByPattern(item, regex);

    matchedTabs.push(...tabs);
  }

  return matchedTabs;
}
