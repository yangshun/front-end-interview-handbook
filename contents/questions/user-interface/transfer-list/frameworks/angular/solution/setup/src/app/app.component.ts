import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  itemsLeft = this.generateItemsMap([
    'HTML',
    'JavaScript',
    'CSS',
    'TypeScript',
  ]);
  itemsRight = this.generateItemsMap([
    'React',
    'Angular',
    'Vue',
    'Svelte',
  ]);

  setItemsLeft(updatedItems: Map<string, boolean>) {
    this.itemsLeft = updatedItems;
  }

  setItemsRight(updatedItems: Map<string, boolean>) {
    this.itemsRight = updatedItems;
  }

  hasNoSelectedItems(items: Map<string, boolean>): boolean {
    return (
      Array.from(items.values()).filter((val) => val)
        .length === 0
    );
  }

  transferAllItems(
    src: Map<string, boolean>,
    dst: Map<string, boolean>,
  ): void {
    src.forEach((value, key) => {
      dst.set(key, value);
    });
    src.clear();
  }

  transferSelectedItems(
    src: Map<string, boolean>,
    dst: Map<string, boolean>,
  ): void {
    src.forEach((value, key) => {
      if (value) {
        dst.set(key, value);
        src.delete(key);
      }
    });
  }

  private generateItemsMap(
    items: string[],
  ): Map<string, boolean> {
    return new Map(items.map((label) => [label, false]));
  }
}
