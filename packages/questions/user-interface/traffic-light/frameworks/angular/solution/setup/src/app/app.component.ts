import { Component } from '@angular/core';
import { TrafficLightConfig } from './traffic-light.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config: TrafficLightConfig<'red' | 'yellow' | 'green'> = {
    red: {
      backgroundColor: 'red',
      duration: 4000,
      order: 3,
      next: 'green',
    },
    yellow: {
      backgroundColor: 'yellow',
      duration: 500,
      order: 2,
      next: 'red',
    },
    green: {
      backgroundColor: 'green',
      duration: 3000,
      order: 1,
      next: 'yellow',
    },
  };
}
