import { Component } from '@angular/core';

const DEFAULT_ITEMS_LEFT = [
  'HTML',
  'JavaScript',
  'CSS',
  'TypeScript',
];
const DEFAULT_ITEMS_RIGHT = [
  'React',
  'Angular',
  'Vue',
  'Svelte',
];

function generateItemsMap(
  items: string[],
): Map<string, boolean> {
  const map = new Map<string, boolean>();
  items.forEach((item) => {
    map.set(item, false);
  });
  return map;
}

export function determineListSelectionState(
  items: Map<string, boolean>,
): 'none' | 'partial' | 'all' {
  const selectedCount = Array.from(items.values()).filter(
    (value) => value,
  ).length;
  if (selectedCount === 0) {
    return 'none';
  } else if (selectedCount < items.size) {
    return 'partial';
  } else {
    return 'all';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  itemsLeft = generateItemsMap(DEFAULT_ITEMS_LEFT);
  itemsRight = generateItemsMap(DEFAULT_ITEMS_RIGHT);

  setItemsLeft = (newItems: Map<string, boolean>): void => {
    this.itemsLeft = new Map(newItems);
  };

  setItemsRight = (
    newItems: Map<string, boolean>,
  ): void => {
    this.itemsRight = new Map(newItems);
  };

  transferSelectedItems(
    from: Map<string, boolean>,
    setFromItems: (newItems: Map<string, boolean>) => void,
    to: Map<string, boolean>,
    setToItems: (newItems: Map<string, boolean>) => void,
  ): void {
    from.forEach((value, key) => {
      if (value) {
        to.set(key, value);
        from.delete(key);
      }
    });

    setFromItems(from);
    setToItems(to);
  }

  getListSelectionState(
    items: Map<string, boolean>,
  ): string {
    return determineListSelectionState(items);
  }
}
