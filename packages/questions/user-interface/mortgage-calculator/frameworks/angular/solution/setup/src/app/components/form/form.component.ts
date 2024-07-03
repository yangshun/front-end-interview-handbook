import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormState } from '../../models/form-state.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Output()
  readonly onFormSubmit = new EventEmitter<FormState>();

  onSubmit(form: FormState): void {
    this.onFormSubmit.emit(form);
  }
}
