import { TilesPanelConfig, TilesPanelDropAreaSection } from '../types';
import prune from '../utils/prune';
import panelSplit from './panelSplit';
import tabClose from './tabClose';
import tabOpen from './tabOpen';

type PanelTab = Readonly<{
  panelId: string;
  tabId: string;
}>;
type PanelTabCloseable = PanelTab &
  Readonly<{
    tabCloseable: boolean;
  }>;

export type PanelDropTarget =
  | Readonly<{
      panelId: string;
      dropAreaSection: 'tab';
      tabId: string;
    }>
  | Readonly<{
      panelId: string;
      dropAreaSection: Exclude<TilesPanelDropAreaSection, 'tab'>;
    }>;

export type TilesActionTabDrop = Readonly<{
  type: 'tab-drop';
  payload: Readonly<{
    src: PanelTabCloseable;
    dst: PanelDropTarget;
  }>;
}>;

export default function tabDrop(
  tiles: TilesPanelConfig,
  payload: TilesActionTabDrop['payload'],
): TilesPanelConfig {
  const newTiles = tabDropImpl(tiles, payload);
  return prune(newTiles) ?? tiles;
}

function tabDropImpl(
  tiles: TilesPanelConfig,
  payload: TilesActionTabDrop['payload'],
): TilesPanelConfig {
  const { src, dst } = payload;

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
      newTabId: src.tabId,
      newTabCloseable: src.tabCloseable,
    });
  }

  // Dropped on the empty space in the tabs row.
  if (dst.dropAreaSection === 'tabs-row') {
    const newTiles = tabClose(tiles, src, false);
    return tabOpen(newTiles, {
      ...dst,
      newTabId: src.tabId,
      newTabCloseable: src.tabCloseable,
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
      newTabId: src.tabId,
      newTabCloseable: src.tabCloseable,
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
    panelId: dst.panelId,
    newTabId: src.tabId,
    newTabCloseable: src.tabCloseable,
  });
}

function tabReorder(
  panel: TilesPanelConfig,
  src: PanelTabCloseable,
  dst: PanelTab,
): TilesPanelConfig {
  const { tabId: srcTabId, panelId: srcPanelId } = src;
  const { tabId: dstTabId } = dst;

  if (panel.type === 'item') {
    if (panel.id !== srcPanelId) {
      return panel;
    }

    const srcTabIndex = panel.tabs.findIndex(({ id }) => id == srcTabId);
    const dstTabIndex = panel.tabs.findIndex(({ id }) => id == dstTabId);
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
    items: panel.items.map((panel) => tabReorder(panel, src, dst)),
  };
}
