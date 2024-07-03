import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  @Input() profileImage!: string;
  @Input() name!: string;
  @Input() handle!: string;
  @Input() date!: string;
  @Input() message!: string;
  @Input() replyCount!: string;
  @Input() retweetCount!: string;
  @Input() likeCount!: string;
}
