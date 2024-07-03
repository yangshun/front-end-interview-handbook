import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

type FlightOption = 'one-way' | 'return';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly TODAY: string = this.formatDate(new Date());
  readonly DAY_IN_SECONDS = 24 * 60 * 60 * 1000;

  flightOption: FlightOption = 'one-way';
  departureDate: string = this.formatDate(
    new Date(Date.now() + this.DAY_IN_SECONDS),
  );
  returnDate: string = this.departureDate;

  onSubmit() {
    if (this.flightOption === 'one-way') {
      alert(
        `You have booked a one-way flight on ${this.departureDate}`,
      );
      return;
    }

    alert(
      `You have booked a return flight, departing on ${this.departureDate} and returning on ${this.returnDate}`,
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return [year, month, day].join('-');
  }
}
