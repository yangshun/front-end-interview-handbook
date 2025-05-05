import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
})
export class ClockComponent {
  @Input()
  hours!: number;

  @Input()
  minutes!: number;

  @Input()
  seconds!: number;

  @Input()
  size!: number;

  FULL_ROTATION_DEGREES = 360;

  get secondsPercentage(): number {
    return this.seconds / 60;
  }

  get minutesPercentage(): number {
    return (this.minutes + this.secondsPercentage) / 60;
  }

  get hoursPercentage(): number {
    return (
      ((this.hours % 12) + this.minutesPercentage) / 12
    );
  }

  get hourAngle(): number {
    return (
      this.hoursPercentage * this.FULL_ROTATION_DEGREES
    );
  }

  get minutesAngle(): number {
    return (
      this.minutesPercentage * this.FULL_ROTATION_DEGREES
    );
  }

  get secondsAngle(): number {
    return (
      this.secondsPercentage * this.FULL_ROTATION_DEGREES
    );
  }

  get dateTimeDisplay(): string {
    return `${this.padTwoDigit(
      this.hours,
    )}:${this.padTwoDigit(this.minutes)}:${this.padTwoDigit(
      this.seconds,
    )}`;
  }

  private padTwoDigit(number: number): string {
    return number >= 10 ? String(number) : `0${number}`;
  }
}
