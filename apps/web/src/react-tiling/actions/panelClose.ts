import type { TilesPanelConfig } from '../types';
import prune from '../utils/prune';

export type TilesActionPanelClose<TabType> = Readonly<{
  payload: Readonly<{
    onTabsClose?: (tabIds: ReadonlyArray<TabType>) => void;
    panelId: string;
  }>;
  type: 'panel-close';
}>;

export default function panelClose<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionPanelClose<TabType>['payload'],
  shouldPrune = true,
): TilesPanelConfig<TabType> {
  const { onTabsClose, panelId } = payload;
  const closedTabs: Array<TabType> = [];
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

function panelCloseImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelIdToRemove: string,
  {
    onTabsClose,
  }: {
    onTabsClose?: (...tabIds: ReadonlyArray<TabType>) => void;
  } = {},
): TilesPanelConfig<TabType> | null {
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
