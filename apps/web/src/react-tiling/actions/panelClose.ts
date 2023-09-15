import type { TilesPanelConfig } from '../types';
import prune from '../utils/prune';

export type TilesActionPanelClose = Readonly<{
  payload: Readonly<{
    onTabsClose?: (tabIds: ReadonlyArray<string>) => void;
    panelId: string;
  }>;
  type: 'panel-close';
}>;

export default function panelClose(
  tiles: TilesPanelConfig,
  payload: TilesActionPanelClose['payload'],
  shouldPrune = true,
): TilesPanelConfig {
  const { panelId, onTabsClose } = payload;
  const closedTabs: Array<string> = [];
  let newTiles = panelCloseImpl(tiles, panelId, {
    onTabsClose: (...tabIds) => {
      closedTabs.push(...tabIds);
    },
  });

  if (newTiles == null) {
    return tiles;
  }

  if (shouldPrune) {
    newTiles = prune(newTiles);
  }

  onTabsClose?.(closedTabs);

  return newTiles ?? tiles;
}

function panelCloseImpl(
  panel: TilesPanelConfig,
  panelIdToRemove: string,
  {
    onTabsClose,
  }: {
    onTabsClose?: (...tabIds: ReadonlyArray<string>) => void;
  } = {},
): TilesPanelConfig | null {
  if (panel.type === 'item') {
    if (panel.id === panelIdToRemove) {
      onTabsClose?.(...panel.tabs.map((tab) => tab.id));

      return null;
    }

    return panel;
  }

  // Usual case where there are still siblings left within parent after removal.
  return {
    ...panel,
    items: panel.items
      .map((item) => panelCloseImpl(item, panelIdToRemove, { onTabsClose }))
      .filter((item): item is Exclude<typeof item, null> => item != null),
  };
}
