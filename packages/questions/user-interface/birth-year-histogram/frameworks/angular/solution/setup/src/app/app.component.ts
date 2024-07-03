import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { DataService } from './data.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

const Y_AXIS_SCALE: number = 10;

export interface YearBucket {
  [bucket: number]: number;
}

export interface ChartData {
  frequency: YearBucket;
  maxYAxisValue: number;
}

@Pipe({
  name: 'yAxisValues',
})
export class YAxisValuesPipe implements PipeTransform {
  transform(maxYAxisValue: number): number[] {
    return Array.from(
      { length: maxYAxisValue / Y_AXIS_SCALE + 1 },
      (_, i) => i * Y_AXIS_SCALE,
    );
  }
}

@Pipe({
  name: 'barHeight',
})
export class BarHeightPipe implements PipeTransform {
  transform(count: number, maxYAxisValue: number): number {
    return (count / maxYAxisValue) * 100;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly BUCKET_SIZE = 10;
  private readonly COUNT = 200;
  private readonly dataService = inject(DataService);

  readonly buttonClickEvent$ = new ReplaySubject(1);

  bucketLabels: number[] = Array.from({
    length: Math.ceil((2019 - 1950) / this.BUCKET_SIZE),
  }).map((_, index) => 1950 + index * this.BUCKET_SIZE);

  bucketFrequency$!: Observable<ChartData>;

  ngOnInit() {
    this.refreshData();
    this.bucketFrequency$ = this.buttonClickEvent$.pipe(
      switchMap(() => this.dataService.fetchYearsData()),
      map((yearsData: number[]) =>
        this.groupIntoBuckets(yearsData),
      ),
      map((frequency: YearBucket) => {
        const maxBucketFrequency: number = Math.max(
          0,
          ...Object.values(frequency),
        );
        const maxYAxisValue: number = Math.min(
          Math.ceil(maxBucketFrequency / Y_AXIS_SCALE) *
            Y_AXIS_SCALE,
          this.COUNT,
        );
        return { frequency, maxYAxisValue };
      }),
    );
  }

  refreshData() {
    this.buttonClickEvent$.next(true);
  }

  private groupIntoBuckets(years: number[]): YearBucket {
    const frequency: YearBucket = {};
    years.forEach((year) => {
      const bucket: number =
        Math.floor(year / this.BUCKET_SIZE) *
        this.BUCKET_SIZE;
      frequency[bucket] = (frequency[bucket] || 0) + 1;
    });
    return frequency;
  }
}
