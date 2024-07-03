import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: `./hand.component.html`,
})
export class HandComponent {
  @Input()
  height = 1;

  @Input()
  width = 1;

  @Input()
  angle!: number;
}
