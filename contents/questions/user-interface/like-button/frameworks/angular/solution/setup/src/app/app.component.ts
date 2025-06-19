import { Component, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  liked = false;
  isPending = false;
  errorMessage: string | null = null;

  http = inject(HttpClient);

  likeUnlikeAction() {
    this.isPending = true;
    this.errorMessage = null;
    this.http
      .post(
        'https://questions.greatfrontend.com/api/questions/like-button',
        {
          action: this.liked ? 'unlike' : 'like',
        },
      )
      .subscribe({
        next: () => {
          this.isPending = false;
          this.liked = !this.liked;
        },
        error: (error: HttpErrorResponse) => {
          this.isPending = false;
          this.errorMessage = error.error.message;
        },
      });
  }
}
