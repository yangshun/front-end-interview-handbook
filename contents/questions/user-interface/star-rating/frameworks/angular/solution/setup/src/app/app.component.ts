import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <span
      *ngFor="let star of stars; let i = index"
      tabindex="0"
      (mouseenter)="setHoveredIndex(i)"
      (mouseleave)="setHoveredIndex(null)"
      (click)="setRating(i + 1)">
      <app-star [isFilled]="isFilled(i)" />
    </span>
  `,
})
export class AppComponent {
  max: number = 5;
  hoveredIndex: number | null = null;
  currentRating: number = 0;

  get stars(): number[] {
    return Array(this.max);
  }

  setHoveredIndex(index: number | null): void {
    this.hoveredIndex = index;
  }

  isFilled(index: number): boolean {
    return this.hoveredIndex != null
      ? index <= this.hoveredIndex
      : index < this.currentRating;
  }

  setRating(newRating: number): void {
    this.currentRating = newRating;
  }
}
