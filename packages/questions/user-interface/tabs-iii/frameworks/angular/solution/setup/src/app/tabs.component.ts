import {
  Component,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input()
  items!: any[];

  @Input()
  defaultValue!: string;

  value = '';
  tabsId =
    'tabs-' + Math.random().toString(36).substring(2, 9);

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const currentIndex = this.items.findIndex(
      (item) => item.value === this.value,
    );
    switch (event.code) {
      case 'ArrowLeft':
        this.setValueViaIndex(
          (currentIndex - 1 + this.items.length) %
            this.items.length,
        );
        break;
      case 'ArrowRight':
        this.setValueViaIndex(
          (currentIndex + 1) % this.items.length,
        );
        break;
      case 'Home':
        this.setValueViaIndex(0);
        break;
      case 'End':
        this.setValueViaIndex(this.items.length - 1);
        break;
    }
  }

  ngOnInit(): void {
    this.value = this.defaultValue ?? this.items[0].value;
  }

  getTabListItemId(value: string): string {
    return `${this.tabsId}-tab-${value}`;
  }

  getTabPanelId(value: string): string {
    return `${this.tabsId}-tabpanel-${value}`;
  }

  setValue(newValue: string): void {
    this.value = newValue;
    const element = document.getElementById(
      this.getTabListItemId(newValue),
    );
    if (element) {
      element.focus();
    }
  }

  setValueViaIndex(index: number): void {
    const newValue = this.items[index].value;
    this.setValue(newValue);
  }
}
