import type { PanelGroupProps } from 'react-resizable-panels';

import type { TilesPanelConfig } from '../types';
import getUniqueId from '../utils/getUniqueId';

type TilesActionPanelSplitNewPanelOrder = 'after' | 'before';

export type TilesActionPanelSplit<TabType> = Readonly<{
  payload: Readonly<{
    direction: PanelGroupProps['direction'];
    newPanelId?: string;
    newPanelOrder: TilesActionPanelSplitNewPanelOrder;
    newTabCloseable?: boolean;
    newTabId?: TabType;
    onTabsOpen?: (tabIds: ReadonlyArray<TabType>) => void;
    panelId: string;
  }>;
  type: 'panel-split';
}>;

export default function panelSplit<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionPanelSplit<TabType>['payload'],
) {
  const {
    direction,
    newPanelId,
    newPanelOrder,
    newTabCloseable = true,
    newTabId = null,
    onTabsOpen,
    panelId,
  } = payload;
  const addedTabs: Array<TabType> = [];
  const newTiles = panelSplitImpl(
    tiles,
    direction,
    panelId,
    newPanelOrder,
    {
      newPanelId,
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

function panelSplitImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  direction: PanelGroupProps['direction'],
  panelIdToSplit: string,
  newPanelOrder: TilesActionPanelSplitNewPanelOrder,
  {
    newPanelId,
    newTabCloseable,
    newTabId,
  }: {
    newPanelId?: string;
    newTabCloseable: boolean;
    newTabId: TabType | null;
  },
  {
    onTabsOpen,
  }: {
    onTabsOpen?: (...tabIds: ReadonlyArray<TabType>) => void;
  } = {},
): TilesPanelConfig<TabType> {
  // Only items can be split.
  if (panel.type === 'item') {
    if (panel.id !== panelIdToSplit) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    // TODO(workspace): Allow injected ID generation or a specific type.
    const newTabId_ = newTabId ?? (getUniqueId() as TabType);

    onTabsOpen?.(newTabId_);

    const existingPanel = {
      ...panel,
      fullScreen: false,
      id: getUniqueId(),
      type: 'item',
    } as const;
    const newPanel = {
      activeTabId: newTabId_,
      collapsible: true,
      id: newPanelId ?? getUniqueId(),
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
    // TODO(workspace): Allow injected ID generation or a specific type.
    const newTabId_ = newTabId ?? (getUniqueId() as TabType);

    onTabsOpen?.(newTabId_);

    const newPanel = {
      activeTabId: newTabId_,
      collapsible: true,
      id: newPanelId ?? getUniqueId(),
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
          newPanelId,
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
