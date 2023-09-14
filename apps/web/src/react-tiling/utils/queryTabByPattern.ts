import { TilesPanelConfig } from '../types';

export default function queryTabByPattern(
  tiles: TilesPanelConfig,
  regex: RegExp,
): ReadonlyArray<Readonly<{ tabId: string; panelId: string }>> {
  const matchedTabs: Array<Readonly<{ tabId: string; panelId: string }>> = [];
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
