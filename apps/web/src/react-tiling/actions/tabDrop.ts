import type { TilesPanelConfig, TilesPanelDropAreaSection } from '../types';
import prune from '../utils/prune';
import panelSplit from './panelSplit';
import tabClose from './tabClose';
import tabOpen from './tabOpen';

type PanelTab<TabType> = Readonly<{
  panelId: string;
  tabId: TabType;
}>;

type PanelTabCloseable<TabType> = PanelTab<TabType> &
  Readonly<{
    tabCloseable: boolean;
  }>;

export type PanelDropTarget<TabType> =
  | Readonly<{
      dropAreaSection: 'tab';
      panelId: string;
      tabId: TabType;
    }>
  | Readonly<{
      dropAreaSection: Exclude<TilesPanelDropAreaSection, 'tab'>;
      panelId: string;
    }>;

export type TilesActionTabDrop<TabType> = Readonly<{
  payload: Readonly<{
    dst: PanelDropTarget<TabType>;
    src: PanelTabCloseable<TabType>;
  }>;
  type: 'tab-drop';
}>;

export default function tabDrop<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabDrop<TabType>['payload'],
): TilesPanelConfig<TabType> {
  const newTiles = tabDropImpl(tiles, payload);

  return prune(newTiles) ?? tiles;
}

function tabDropImpl<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabDrop<TabType>['payload'],
): TilesPanelConfig<TabType> {
  const { dst, src } = payload;

  // Dropped on a tab item.
  if (dst.dropAreaSection === 'tab') {
    // Within same panel.
    if (src.panelId === dst.panelId) {
      return tabReorder(tiles, src, {
        panelId: dst.panelId,
        tabId: dst.tabId,
      });
    }

    // Transferring across panels.
    const newTiles = tabClose(tiles, src, false);

    return tabOpen(newTiles, {
      ...dst,
      newTabCloseable: src.tabCloseable,
      newTabId: src.tabId,
    });
  }

  // Dropped on the empty space in the tabs row.
  if (dst.dropAreaSection === 'tabs-row') {
    const newTiles = tabClose(tiles, src, false);

    return tabOpen(newTiles, {
      ...dst,
      newTabCloseable: src.tabCloseable,
      newTabId: src.tabId,
    });
  }

  if (dst.dropAreaSection === 'center') {
    // Dropping within the same panel, no-op.
    if (src.panelId === dst.panelId) {
      return tiles;
    }

    const newTiles = tabClose(tiles, src, false);

    return tabOpen(newTiles, {
      ...dst,
      newTabCloseable: src.tabCloseable,
      newTabId: src.tabId,
    });
  }

  return panelSplit(tabClose(tiles, src, false), {
    direction:
      dst.dropAreaSection === 'left' || dst.dropAreaSection === 'right'
        ? 'horizontal'
        : 'vertical',
    newPanelOrder:
      dst.dropAreaSection === 'left' || dst.dropAreaSection === 'top'
        ? 'before'
        : 'after',
    newTabCloseable: src.tabCloseable,
    newTabId: src.tabId,
    panelId: dst.panelId,
  });
}

function tabReorder<TabType>(
  panel: TilesPanelConfig<TabType>,
  src: PanelTabCloseable<TabType>,
  dst: PanelTab<TabType>,
): TilesPanelConfig<TabType> {
  const { panelId: srcPanelId, tabId: srcTabId } = src;
  const { tabId: dstTabId } = dst;

  if (panel.type === 'item') {
    if (panel.id !== srcPanelId) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    const srcTabIndex = panel.tabs.findIndex(({ id }) => id === srcTabId);
    const dstTabIndex = panel.tabs.findIndex(({ id }) => id === dstTabId);
    const newTabs = [...panel.tabs];
    const srcTab = newTabs[srcTabIndex];

    newTabs.splice(srcTabIndex, 1);
    newTabs.splice(dstTabIndex, 0, srcTab);

    return {
      ...panel,
      tabs: newTabs,
    };
  }

  return {
    ...panel,
    items: panel.items.map((panelItem) => tabReorder(panelItem, src, dst)),
  };
}
