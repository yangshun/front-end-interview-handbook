import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  celsius: string = '';
  fahrenheit: string = '';

  format(number: number | string): string {
    // Show 4 d.p. if number has more than 4 decimal places.
    return /\.\d{5}/.test(String(number))
      ? Number(number).toFixed(4)
      : String(number);
  }

  convert(
    value: string,
    setDestination: (val: string) => void,
    calculateValue: (val: number) => number,
  ): void {
    const numericValue = Number(value);
    const isValid =
      !Number.isNaN(numericValue) && Boolean(value);
    setDestination(
      isValid
        ? this.format(calculateValue(numericValue))
        : '',
    );
  }

  setCelsius(newValue: string) {
    this.celsius = newValue;
    this.convert(
      newValue,
      (val) => (this.fahrenheit = val),
      (value) => (value * 9) / 5 + 32,
    );
  }

  setFahrenheit(newValue: string) {
    this.fahrenheit = newValue;
    this.convert(
      newValue,
      (val) => (this.celsius = val),
      (value) => ((value - 32) * 5) / 9,
    );
  }
}
