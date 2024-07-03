import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  timer!: number;
  size = 300;
  hours!: number;
  minutes!: number;
  seconds!: number;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      const date = new Date();
      this.hours = date.getHours() % 12;
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
