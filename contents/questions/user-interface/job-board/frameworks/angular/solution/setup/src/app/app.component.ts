import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, forkJoin } from 'rxjs';
import { Job } from './models/job.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  allJobIds: number[] = [];
  jobs: Job[] = [];
  fetchingJobDetails = false;
  page = 0;

  PAGE_SIZE = 6;
  HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0';

  http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get<number[]>(
        `${this.HACKER_NEWS_API}/jobstories.json`,
      )
      .pipe(first())
      .subscribe((ids: number[]) => {
        this.allJobIds = ids;
        this.fetchJobs();
      });
  }

  fetchMoreJobs() {
    this.fetchJobs();
  }

  private fetchJobs() {
    const start = this.page * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const ids = this.allJobIds.slice(start, end);
    this.fetchingJobDetails = true;

    forkJoin(
      ids.map((id: number) =>
        this.http.get<Job>(
          `${this.HACKER_NEWS_API}/item/${id}.json`,
        ),
      ),
    )
      .pipe(first())
      .subscribe((jobs: Job[]) => {
        this.jobs = [...this.jobs, ...jobs];
        this.fetchingJobDetails = false;
        this.page++;
      });
  }
}
