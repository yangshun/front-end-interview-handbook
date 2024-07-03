import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-checkbox-item',
  template: `
    <div class="transfer-list__section__items__item">
      <input
        type="checkbox"
        [id]="uniqueId"
        #checkboxRef
        [checked]="checked"
        (change)="onInputChange(checkboxRef)" />
      <label [for]="uniqueId">{{ label }}</label>
    </div>
  `,
})
export class CheckboxItemComponent {
  uniqueId: string = `checkbox-item-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  @Input()
  label!: string;

  @Input()
  checked!: boolean;

  @Output()
  onChange = new EventEmitter<boolean>();

  onInputChange(element: HTMLInputElement) {
    this.onChange.emit(element.checked);
  }
}
