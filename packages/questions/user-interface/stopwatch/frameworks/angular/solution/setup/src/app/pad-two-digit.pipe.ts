import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padTwoDigit',
})
export class PadTwoDigitPipe implements PipeTransform {
  transform(value: number): string {
    value = value / 10;
    return value >= 10 ? String(value) : `0${value}`;
  }
}
