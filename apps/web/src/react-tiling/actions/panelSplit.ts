import type { TilesPanelConfig, TilesPanelGroupDirection } from '../types';
import getUniqueId from '../utils/getUniqueId';

type TilesActionPanelSplitNewPanelOrder = 'after' | 'before';

export type TilesActionPanelSplit = Readonly<{
  payload: Readonly<{
    direction: TilesPanelGroupDirection;
    newPanelOrder: TilesActionPanelSplitNewPanelOrder;
    newTabCloseable?: boolean;
    newTabId?: string;
    onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
    panelId: string;
  }>;
  type: 'panel-split';
}>;

export default function panelSplit(
  tiles: TilesPanelConfig,
  payload: TilesActionPanelSplit['payload'],
) {
  const {
    direction,
    panelId,
    newPanelOrder,
    newTabId = null,
    newTabCloseable = true,
    onTabsOpen,
  } = payload;
  const addedTabs: Array<string> = [];
  const newTiles = panelSplitImpl(
    tiles,
    direction,
    panelId,
    newPanelOrder,
    {
      newTabCloseable,
      newTabId,
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

function panelSplitImpl(
  panel: TilesPanelConfig,
  direction: TilesPanelGroupDirection,
  panelIdToSplit: string,
  newPanelOrder: TilesActionPanelSplitNewPanelOrder,
  {
    newTabId,
    newTabCloseable,
  }: {
    newTabCloseable: boolean;
    newTabId: string | null;
  },
  {
    onTabsOpen,
  }: {
    onTabsOpen?: (...tabIds: ReadonlyArray<string>) => void;
  } = {},
): TilesPanelConfig {
  // Only items can be split.
  if (panel.type === 'item') {
    if (panel.id !== panelIdToSplit) {
      return panel;
    }

    const newTabId_ = newTabId ?? getUniqueId();

    onTabsOpen?.(newTabId_);

    const existingPanel = {
      ...panel,
      id: getUniqueId(),
      type: 'item',
    } as const;
    const newPanel = {
      activeTabId: newTabId_,
      id: getUniqueId(),
      tabs: [
        {
          closeable: newTabCloseable,
          id: newTabId_,
        },
      ],
      type: 'item',
    } as const;

    return {
      direction,
      id: panel.id,
      items:
        newPanelOrder === 'after'
          ? [existingPanel, newPanel]
          : [newPanel, existingPanel],
      type: 'group',
    };
  }

  const panelToSplitIndex = panel.items.findIndex(
    (item) => item.id === panelIdToSplit,
  );

  // Split within parent instead.
  if (panelToSplitIndex > -1 && panel.direction === direction) {
    const newTabId_ = newTabId ?? getUniqueId();

    onTabsOpen?.(newTabId_);

    const newPanel = {
      activeTabId: newTabId_,
      id: getUniqueId(),
      tabs: [
        {
          closeable: newTabCloseable,
          id: newTabId_,
        },
      ],
      type: 'item',
    } as const;
    const splitIndex =
      newPanelOrder === 'after' ? panelToSplitIndex + 1 : panelToSplitIndex;

    return {
      ...panel,
      items: [
        ...panel.items.slice(0, splitIndex),
        newPanel,
        ...panel.items.slice(splitIndex),
      ],
    };
  }

  return {
    ...panel,
    items: panel.items.map((item) =>
      panelSplitImpl(
        item,
        direction,
        panelIdToSplit,
        newPanelOrder,
        {
          newTabCloseable,
          newTabId,
        },
        {
          onTabsOpen,
        },
      ),
    ),
  };
}
