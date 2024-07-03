import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { determineListSelectionState } from './app.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnChanges {
  @Input()
  items = new Map<string, boolean>();

  @Output()
  itemsChange = new EventEmitter<Map<string, boolean>>();
  listState!: 'none' | 'partial' | 'all';

  ngOnChanges(): void {
    this.listState = determineListSelectionState(
      this.items,
    );
  }

  onSubmit(newItem: HTMLInputElement): void {
    const newItemValue = newItem.value.trim();
    if (newItemValue === '') {
      return;
    }
    const newItems = new Map(this.items);
    newItems.set(newItemValue, false);
    this.itemsChange.emit(newItems);
    newItem.value = '';
  }

  onBulkSelectionChange(): void {
    switch (this.listState) {
      case 'none':
      case 'partial':
        this.itemsChange.emit(
          this.setAllItemsSelectionState(this.items, true),
        );
        break;
      case 'all':
        this.itemsChange.emit(
          this.setAllItemsSelectionState(this.items, false),
        );
        break;
    }
  }

  onCheckboxChange(label: string): void {
    const newItems = new Map(this.items);
    newItems.set(label, !this.items.get(label));
    this.itemsChange.emit(newItems);

    this.listState = determineListSelectionState(
      this.items,
    );
  }

  countSelectedItems(items: Map<string, boolean>): number {
    return Array.from(items.values()).filter((value) =>
      Boolean(value),
    ).length;
  }

  setAllItemsSelectionState(
    items: Map<string, boolean>,
    state: boolean,
  ): Map<string, boolean> {
    const newItems = new Map(items);
    for (const key of newItems.keys()) {
      newItems.set(key, state);
    }
    return newItems;
  }

  trackByFn(index: number) {
    return index;
  }
}
