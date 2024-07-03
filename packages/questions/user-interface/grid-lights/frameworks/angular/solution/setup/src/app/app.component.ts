import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  flattenedConfig = this.config.flat();

  order: number[] = [];
  isDeactivating = false;

  handleClick(index: number) {
    const newOrder = [...this.order, index];
    this.order = newOrder;

    if (
      newOrder.length ===
      this.flattenedConfig.filter(Boolean).length
    ) {
      this.deactivateCells();
    }
  }

  deactivateCells() {
    this.isDeactivating = true;
    const timer = setInterval(() => {
      const newOrder = this.order.slice();
      newOrder.pop();

      if (newOrder.length === 0) {
        clearInterval(timer);
        this.isDeactivating = false;
      }

      this.order = newOrder;
    }, 300);
  }
}
