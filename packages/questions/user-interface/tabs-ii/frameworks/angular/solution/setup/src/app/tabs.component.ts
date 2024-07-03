import { Component, Input } from '@angular/core';

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
  }
}
