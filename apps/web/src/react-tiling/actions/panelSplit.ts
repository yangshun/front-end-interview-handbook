import { TilesPanelConfig, TilesPanelGroupDirection } from '../types';
import getUniqueId from '../utils/getUniqueId';

type TilesActionPanelSplitNewPanelOrder = 'before' | 'after';

export type TilesActionPanelSplit = Readonly<{
  type: 'panel-split';
  payload: Readonly<{
    direction: TilesPanelGroupDirection;
    panelId: string;
    newPanelOrder: TilesActionPanelSplitNewPanelOrder;
    newTabId?: string;
    newTabCloseable?: boolean;
    onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
  }>;
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
      newTabId,
      newTabCloseable,
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
    newTabId: string | null;
    newTabCloseable: boolean;
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
      type: 'item',
      id: getUniqueId(),
    } as const;
    const newPanel = {
      activeTabId: newTabId_,
      type: 'item',
      id: getUniqueId(),
      tabs: [
        {
          id: newTabId_,
          closeable: newTabCloseable,
        },
      ],
    } as const;

    return {
      type: 'group',
      id: panel.id,
      direction,
      items:
        newPanelOrder === 'after'
          ? [existingPanel, newPanel]
          : [newPanel, existingPanel],
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
      type: 'item',
      id: getUniqueId(),
      tabs: [
        {
          id: newTabId_,
          closeable: newTabCloseable,
        },
      ],
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
          newTabId,
          newTabCloseable,
        },
        {
          onTabsOpen,
        },
      ),
    ),
  };
}
