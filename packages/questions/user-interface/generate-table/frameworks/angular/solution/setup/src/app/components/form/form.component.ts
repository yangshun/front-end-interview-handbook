import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormState } from '../../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Output()
  readonly onFormSubmit = new EventEmitter<FormState>();

  submitForm(event: any): void {
    event.preventDefault();
    const data = new FormData(event.target);
    const rows = Number(data.get('rows'));
    const columns = Number(data.get('columns'));
    if (rows && columns) {
      this.onFormSubmit.emit({ rows, cols: columns });
    }
  }
}
