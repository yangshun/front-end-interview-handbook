import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  hours!: number;
  minutes!: number;
  seconds!: number;
  dateTimeDisplay!: string;
  intervalId!: number;

  ngOnInit() {
    // Kick off the timer.
    this.intervalId = window.setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      this.hours = hours === 0 ? 12 : hours;
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      this.dateTimeDisplay = `${this.padTwoDigit(
        date.getHours(),
      )}:${this.padTwoDigit(
        this.minutes,
      )}:${this.padTwoDigit(this.seconds)}`;
    }, 100);
  }

  // Clear the timer upon destroy.
  ngOnDestroy() {
    window.clearInterval(this.intervalId);
  }

  private padTwoDigit(number: number): string {
    return number >= 10 ? String(number) : `0${number}`;
  }
}
