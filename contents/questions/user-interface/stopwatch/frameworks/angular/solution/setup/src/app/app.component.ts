import {
  Component,
  Pipe,
  PipeTransform,
} from '@angular/core';

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR =
  MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timerId = 0;
  lastTickTiming = 0;
  totalDuration = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  startTimer() {
    this.lastTickTiming = Date.now();
    this.timerId = window.setInterval(() => {
      const now = Date.now();
      const timePassed = now - this.lastTickTiming;
      this.totalDuration += timePassed;
      this.lastTickTiming = now;

      if (this.totalDuration > MS_IN_HOUR) {
        this.hours = Math.floor(
          this.totalDuration / MS_IN_HOUR,
        );
        this.totalDuration %= MS_IN_HOUR;
      }

      if (this.totalDuration > MS_IN_MINUTE) {
        this.minutes = Math.floor(
          this.totalDuration / MS_IN_MINUTE,
        );
        this.totalDuration %= MS_IN_MINUTE;
      }

      if (this.totalDuration > MS_IN_SECOND) {
        this.seconds = Math.floor(
          this.totalDuration / MS_IN_SECOND,
        );
        this.totalDuration %= MS_IN_SECOND;
      }

      this.milliseconds = this.totalDuration;
    }, 1);
  }

  stopInterval() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
    this.timerId = 0;
  }

  resetTimer() {
    this.stopInterval();
    this.totalDuration = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
  }

  toggleTimer() {
    if (this.timerId) {
      this.stopInterval();
    } else {
      this.startTimer();
    }
  }
}
