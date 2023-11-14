import type { TilesPanelDragItem, TilesPanelDragPanel } from '../types';

export default function isDragTab<TabType>(
  item: TilesPanelDragItem<TabType> | TilesPanelDragPanel,
): item is TilesPanelDragItem<TabType> {
  return (item as TilesPanelDragItem<TabType>).tabId !== undefined;
}
