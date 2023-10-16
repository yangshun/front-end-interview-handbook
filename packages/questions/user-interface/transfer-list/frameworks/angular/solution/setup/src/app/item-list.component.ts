import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ItemListComponent {
  @Input()
  items!: Map<string, boolean>;

  @Output()
  updateItems = new EventEmitter<Map<string, boolean>>();

  get itemsArray() {
    return Array.from(this.items.entries());
  }

  toggleItem(label: string) {
    const newItems = new Map(this.items);
    newItems.set(label, !this.items.get(label));
    this.updateItems.emit(newItems);
  }
}
