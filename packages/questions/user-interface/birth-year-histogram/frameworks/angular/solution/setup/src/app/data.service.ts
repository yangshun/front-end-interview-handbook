import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly apiUrl =
    'https://www.random.org/integers/';
  private readonly COUNT = 200;
  private readonly MIN = 1950;
  private readonly MAX = 2019;

  private readonly http = inject(HttpClient);

  fetchYearsData(): Observable<number[]> {
    return this.http
      .get(
        `${this.apiUrl}?num=${this.COUNT}&min=${this.MIN}&max=${this.MAX}&col=1&base=10&format=plain&rnd=new`,
        { responseType: 'text' },
      )
      .pipe(
        first(),
        map((response: string) =>
          response.split('\n').filter(Boolean).map(Number),
        ),
      );
  }
}
