import type {
  TilesPanelConfig,
  TilesPanelDropAreaSection,
  TilesPanelItemTab,
} from '../types';
import getUniqueId from '../utils/getUniqueId';
import panelClose from './panelClose';
import panelSplit from './panelSplit';

type PanelDropTarget<TabType> =
  | Readonly<{
      dropAreaSection: 'tab';
      panelId: string;
      tabId: TabType;
    }>
  | Readonly<{
      dropAreaSection: Exclude<TilesPanelDropAreaSection, 'tab'>;
      panelId: string;
    }>;

export type TilesActionPanelDrop<TabType> = Readonly<{
  payload: Readonly<{
    dst: PanelDropTarget<TabType>;
    srcPanelId: string;
  }>;
  type: 'panel-drop';
}>;

export default function panelDrop<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionPanelDrop<TabType>['payload'],
) {
  const { dst, srcPanelId } = payload;
  const newTiles = panelDropImpl(tiles, srcPanelId, dst);

  return newTiles;
}

function panelDropImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  srcPanelId: string,
  dst: PanelDropTarget<TabType>,
): TilesPanelConfig<TabType> {
  // Within same panel.
  if (srcPanelId === dst.panelId) {
    return panel;
  }

  const srcPanelTabs = getTabsInPanel(panel, srcPanelId);

  // Dropped on another panel's tab row.
  if (dst.dropAreaSection === 'tabs-row' || dst.dropAreaSection === 'center') {
    const newPanel = addTabsToPanel(panel, dst.panelId, srcPanelTabs);

    return panelClose(
      newPanel,
      {
        panelId: srcPanelId,
      },
      true,
    );
  }

  if (dst.dropAreaSection === 'tab') {
    const newPanel = addTabsToPanel(
      panel,
      dst.panelId,
      srcPanelTabs,
      dst.tabId,
    );

    return panelClose(
      newPanel,
      {
        panelId: srcPanelId,
      },
      true,
    );
  }

  const firstTab = srcPanelTabs[0];
  const remainingTabs = srcPanelTabs.slice(1);
  const newPanelId = getUniqueId();

  const withSplitPanels = panelSplit(panel, {
    direction:
      dst.dropAreaSection === 'left' || dst.dropAreaSection === 'right'
        ? 'horizontal'
        : 'vertical',
    newPanelId,
    newPanelOrder:
      dst.dropAreaSection === 'left' || dst.dropAreaSection === 'top'
        ? 'before'
        : 'after',
    newTabCloseable: firstTab.closeable,
    newTabId: firstTab.id,
    panelId: dst.panelId,
  });

  return panelClose(
    addTabsToPanel(withSplitPanels, newPanelId, remainingTabs),
    {
      panelId: srcPanelId,
    },
    true,
  );
}

function getTabsInPanel<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelId: string,
): ReadonlyArray<TilesPanelItemTab<TabType>> {
  if (panel.type === 'item') {
    if (panel.id === panelId) {
      return panel.tabs;
    }

    return [];
  }

  return panel.items.flatMap((item) => getTabsInPanel(item, panelId));
}

function addTabsToPanel<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelId: string,
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>,
  tabIdToInsertAt?: TabType,
): TilesPanelConfig<TabType> {
  if (panel.type === 'item') {
    if (panel.id === panelId) {
      const index =
        tabIdToInsertAt &&
        panel.tabs.findIndex(({ id }) => id === tabIdToInsertAt);

      const newTabs =
        index === undefined
          ? [...panel.tabs, ...tabs]
          : [
              ...panel.tabs.slice(0, index),
              ...tabs,
              ...panel.tabs.slice(index),
            ];

      return {
        ...panel,
        tabs: newTabs,
      };
    }

    return panel;
  }

  return {
    ...panel,
    items: panel.items.map((item) => {
      return addTabsToPanel(item, panelId, tabs, tabIdToInsertAt);
    }),
  };
}
