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

  ngOnInit(): void {
    this.value = this.defaultValue ?? this.items[0].value;
  }

  setValue(newValue: string): void {
    this.value = newValue;
  }
}
