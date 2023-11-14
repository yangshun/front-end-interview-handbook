import isDragTab from './isDragTab';
import type { TilesPanelDragItem, TilesPanelDragPanel } from '../types';

export default function getDragId(
  item: TilesPanelDragItem<unknown> | TilesPanelDragPanel,
) {
  if (isDragTab(item)) {
    return `tab:${item.tabId}`;
  }

  return `panel:${item.panelId}`;
}
