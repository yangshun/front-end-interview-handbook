import { Component, Input, OnInit } from '@angular/core';

const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

function shuffle(array: any) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateCards(
  totalCount: number,
  matchCount: number,
) {
  const numGroups = totalCount / matchCount;
  if (numGroups > emojis.length) {
    throw new Error('Not enough emojis');
  }

  const emojisList = emojis.slice(0, numGroups);
  const cards = Array.from(
    { length: numGroups },
    () => null,
  )
    .map((_, idx) => idx)
    .map((idx) =>
      Array.from(
        { length: matchCount },
        () => emojisList[idx],
      ),
    )
    .flat();

  shuffle(cards);
  return cards;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
})
export class MemoryGameComponent implements OnInit {
  @Input()
  cols!: number;

  @Input()
  rows!: number;

  @Input()
  delay!: number;

  @Input()
  matchCount!: number;

  totalCount!: number;
  cards: string[] = [];
  flipped: number[] = [];
  matched = new Set<string>();
  gameCompleted: boolean = false;
  waitTimer: number = 0;

  ngOnInit() {
    this.totalCount = this.rows * this.cols;
    this.cards = generateCards(
      this.totalCount,
      this.matchCount,
    );
  }

  onFlip(index: number) {
    let currFlipped = this.flipped;

    if (this.waitTimer) {
      clearTimeout(this.waitTimer);
      this.waitTimer = 0;
      currFlipped = [];
    }

    const newFlipped = [...currFlipped, index];
    this.flipped = newFlipped;

    if (newFlipped.length < this.matchCount) {
      return;
    }

    const allFlippedAreSame = newFlipped.every(
      (i) => this.cards[newFlipped[0]] === this.cards[i],
    );

    if (allFlippedAreSame) {
      this.matched.add(this.cards[newFlipped[0]]);
      this.flipped = [];

      if (
        this.matched.size * this.matchCount ===
        this.totalCount
      ) {
        this.gameCompleted = true;
      }

      return;
    }

    this.waitTimer = setTimeout(() => {
      this.flipped = [];
    }, this.delay);
  }

  resetGame() {
    this.waitTimer = 0;
    this.cards = generateCards(
      this.totalCount,
      this.matchCount,
    );
    this.flipped = [];
    this.matched = new Set();
    this.gameCompleted = false;
  }
}
