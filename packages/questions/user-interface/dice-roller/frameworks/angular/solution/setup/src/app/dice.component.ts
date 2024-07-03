import { Component, Input } from '@angular/core';

const DICE_FACE_DOT_POSITIONS: { [key: number]: string[] } =
  {
    1: ['dot--center'],
    2: ['dot--top-right', 'dot--bottom-left'],
    3: [
      'dot--top-right',
      'dot--center',
      'dot--bottom-left',
    ],
    4: [
      'dot--top-left',
      'dot--top-right',
      'dot--bottom-left',
      'dot--bottom-right',
    ],
    5: [
      'dot--top-left',
      'dot--top-right',
      'dot--center',
      'dot--bottom-left',
      'dot--bottom-right',
    ],
    6: [
      'dot--top-left',
      'dot--top-right',
      'dot--center-left',
      'dot--center-right',
      'dot--bottom-left',
      'dot--bottom-right',
    ],
  };

@Component({
  selector: 'app-dice',
  template: `
    <div class="dice">
      <div class="dots">
        <div
          *ngFor="let dotPosition of dotPositions"
          class="dot {{ dotPosition }}"></div>
      </div>
    </div>
  `,
})
export class DiceComponent {
  @Input()
  value!: number;

  get dotPositions(): string[] {
    return DICE_FACE_DOT_POSITIONS[this.value];
  }
}
