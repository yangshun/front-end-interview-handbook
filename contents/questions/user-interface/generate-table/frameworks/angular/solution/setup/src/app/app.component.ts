import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormState } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  formState!: FormState;

  formSubmit(formState: FormState): void {
    this.formState = formState;
  }
}
