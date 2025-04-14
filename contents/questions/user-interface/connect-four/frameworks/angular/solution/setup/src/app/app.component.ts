import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-connect-four
      [rows]="6"
      [cols]="7"
      [countToWin]="4">
    </app-connect-four>
  `,
})
export class AppComponent {}
