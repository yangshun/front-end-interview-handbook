import { Component } from '@angular/core';
import submitForm from './submitForm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  async submitForm(event: any) {
    submitForm(event);
  }
}
