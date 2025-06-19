import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor',
})
export class FloorPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value);
  }
}
