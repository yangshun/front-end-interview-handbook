import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-digit',
  template: `
    <div class="digit">
      <div
        class="digit-square digit-square-top"
        [ngClass]="NUMBER_TO_CLASSES[number]?.top"></div>
      <div
        class="digit-square digit-square-bottom"
        [ngClass]="NUMBER_TO_CLASSES[number]?.bottom"></div>
    </div>
  `,
})
export class DigitComponent {
  @Input()
  number!: number;

  ALL_SIDES = [
    'digit-square-border-top',
    'digit-square-border-left',
    'digit-square-border-right',
    'digit-square-border-bottom',
  ];

  NUMBER_TO_CLASSES: {
    [key: number]: { top: string[]; bottom: string[] };
  } = {
    0: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-right',
      ],
      bottom: [
        'digit-square-border-bottom',
        'digit-square-border-left',
        'digit-square-border-right',
      ],
    },
    1: {
      top: ['digit-square-border-right'],
      bottom: ['digit-square-border-right'],
    },
    2: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
    },
    3: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
    4: {
      top: [
        'digit-square-border-left',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-right',
        'digit-square-border-top',
      ],
    },
    5: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
    6: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: this.ALL_SIDES,
    },
    7: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
      ],
      bottom: ['digit-square-border-right'],
    },
    8: {
      top: this.ALL_SIDES,
      bottom: this.ALL_SIDES,
    },
    9: {
      top: this.ALL_SIDES,
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
  };
}
