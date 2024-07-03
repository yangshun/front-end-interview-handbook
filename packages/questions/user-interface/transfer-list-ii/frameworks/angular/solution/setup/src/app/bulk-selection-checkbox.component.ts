import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-bulk-selection-checkbox',
  templateUrl: './bulk-selection-checkbox.component.html',
})
export class BulkSelectionCheckboxComponent
  implements OnChanges
{
  @Input()
  disabled!: boolean;

  @Input()
  state!: 'none' | 'partial' | 'all';

  @Input()
  selectedCount!: number;

  @Input()
  totalCount!: number;

  @Output()
  onChange = new EventEmitter<boolean>();

  @ViewChild('checkboxRef', { static: false })
  checkboxRef!: ElementRef<HTMLInputElement>;

  bulkSelectionId: string = `checkbox-item-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  checked = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('state' in changes) {
      switch (this.state) {
        case 'none':
          this.checked = false;
          this.setIndeterminate(false);
          break;
        case 'partial':
          this.checked = false;
          this.setIndeterminate(true);
          break;
        case 'all':
          this.checked = true;
          this.setIndeterminate(false);
          break;
      }
    }
  }

  onInputChange(element: HTMLInputElement): void {
    this.onChange.emit(element.checked);
  }

  private setIndeterminate(value: boolean): void {
    if (this.checkboxRef) {
      this.checkboxRef.nativeElement.indeterminate = value;
    }
  }
}
