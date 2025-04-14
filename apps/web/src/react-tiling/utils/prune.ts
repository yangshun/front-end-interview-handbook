import type { TilesPanelConfig } from '../types';

export default function prune<TabType>(
  panel: TilesPanelConfig<TabType>,
): TilesPanelConfig<TabType> | null {
  if (panel.type === 'item') {
    // This panel should be removed.
    if (panel.tabs.length === 0) {
      return null;
    }

    return panel;
  }

  const newPanelItems: Array<TilesPanelConfig<TabType>> = [];

  panel.items.forEach((item) => {
    const panelItem = prune(item);

    if (panelItem == null) {
      return;
    }

    if (panelItem.type === 'group' && panel.direction === panelItem.direction) {
      newPanelItems.push(...panelItem.items);

      return;
    }

    newPanelItems.push(panelItem);
  });

  // No more panels left in the group, no need for the group anymore.
  if (newPanelItems.length === 0) {
    return null;
  }

  // Flatten groups that only have a single child.
  if (newPanelItems.length === 1 && panel.id !== 'root') {
    return {
      ...newPanelItems[0], // Uses child's properties
      id: panel.id, // Uses parent's id
    };
  }

  // Usual case where there are still siblings left within parent after removal.
  return {
    ...panel,
    items: newPanelItems,
  };
}
