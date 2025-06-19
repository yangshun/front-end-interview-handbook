import { Component } from '@angular/core';

const NUMBER_OF_FACES = 6;
const MIN_NUMBER_OF_DICE = 1;
const MAX_NUMBER_OF_DICE = 12;

function rollDice(numberOfDice: number): number[] {
  return Array.from(
    { length: numberOfDice },
    () => Math.floor(Math.random() * NUMBER_OF_FACES) + 1,
  );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly MIN_NUMBER_OF_DICE = MIN_NUMBER_OF_DICE;
  readonly MAX_NUMBER_OF_DICE = MAX_NUMBER_OF_DICE;

  rolledDice: number[] = [];

  onSubmit(event: any) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const diceInput = form.elements.namedItem(
      'dice-input',
    ) as HTMLInputElement;
    if (diceInput) {
      const numberOfDice = Number(diceInput.value);
      if (!isNaN(numberOfDice)) {
        this.rolledDice = rollDice(numberOfDice);
      }
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
