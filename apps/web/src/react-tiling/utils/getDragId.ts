import type { TilesPanelDragItem, TilesPanelDragPanel } from '../types';
import isDragTab from './isDragTab';

export default function getDragId(
  item: TilesPanelDragItem<unknown> | TilesPanelDragPanel,
) {
  if (isDragTab(item)) {
    return `tab:${item.tabId}`;
  }

  return `panel:${item.panelId}`;
}
