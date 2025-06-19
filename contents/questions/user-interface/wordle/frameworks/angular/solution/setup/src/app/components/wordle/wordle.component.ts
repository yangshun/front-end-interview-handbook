import {
  Component,
  OnInit,
  Input,
  HostListener,
} from '@angular/core';
import {
  LetterGuessState,
  GameState,
  INITIAL_CURSOR_POSITION,
  GridState,
  LETTER_GUESS_STATE_PRIORITY,
  WORDS,
  A_KEYCODE,
  Z_KEYCODE,
} from '../../models';

@Component({
  selector: 'app-wordle',
  templateUrl: 'wordle.component.html',
})
export class WordleComponent implements OnInit {
  @Input()
  lettersPerWord = 5;

  @Input()
  maxAttempts = 2;

  wordOfTheDay!: string;
  gridState!: GridState[][];
  letterGuessState!: { [char: string]: LetterGuessState };
  gameState!: GameState;
  cursorPositionState!: number[];

  @HostListener('document:keydown', ['$event'])
  pressKey(event: KeyboardEvent) {
    this.onPressKey(event.key);
  }

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.gridState = this.getInitialGridState();
    this.cursorPositionState = INITIAL_CURSOR_POSITION;
    this.letterGuessState = {};
    this.gameState = GameState.IN_PROGRESS;
    this.wordOfTheDay = this.generateRandomWord();
  }

  onPressKey(key: string) {
    // Game has a conclusion.
    if (this.gameState !== GameState.IN_PROGRESS) {
      return;
    }

    // Ignore invalid input from user.
    if (!this.isValidKey(key)) {
      return;
    }

    switch (key) {
      case 'Enter':
        this.checkWord();
        break;
      case 'Backspace':
        this.deleteLetter();
        break;
      default:
        this.addLetter(key);
    }
  }

  addLetter(char: string) {
    const [row, col] = this.cursorPositionState;

    // Row is already fully filled.
    if (col + 1 === this.lettersPerWord) {
      return;
    }

    const newGridState: any = Array.from(this.gridState);
    newGridState[row][col + 1].char = char.toUpperCase();
    this.cursorPositionState = [row, col + 1];
    this.gridState = newGridState;
  }

  checkWord() {
    const [row, col] = this.cursorPositionState;

    // Not enough letters in the row yet.
    if (col + 1 < this.lettersPerWord) {
      return;
    }

    const newGridState = Array.from(this.gridState);
    const newLetterGuessState: any = {
      ...this.letterGuessState,
    };
    const word = this.gridState[row]
      .map(({ char }) => char)
      .join('');

    // Create a map of count of letters in original word to compare
    // with the word entered by user.
    const letterFreq = this.countLetterFreqInWord(
      this.wordOfTheDay,
    );
    const nonMatchingIndices = [];
    let matchCount = 0;

    // Update state for matching chars first.
    for (let i = 0; i < word.length; i++) {
      const currentChar: any = word[i];
      const currentActualChar = this.wordOfTheDay[i];

      if (currentChar === currentActualChar) {
        newGridState[row][i].state =
          LetterGuessState.CORRECT;
        newLetterGuessState[currentChar] =
          LetterGuessState.CORRECT;
        letterFreq.set(
          currentChar,
          letterFreq.get(currentChar) - 1,
        );
        matchCount++;
      } else {
        nonMatchingIndices.push(i);
      }
    }

    // Guessed correctly.
    if (matchCount === this.lettersPerWord) {
      this.letterGuessState = newLetterGuessState;
      this.gridState = newGridState;
      this.gameState = GameState.GUESSED_CORRECTLY;
      return;
    }

    // Update state for rest of the chars.
    nonMatchingIndices.forEach((idx) => {
      const char = word[idx];
      if (
        letterFreq.has(char) &&
        letterFreq.get(char) > 0
      ) {
        letterFreq.set(char, letterFreq.get(char) - 1);
        newGridState[row][idx].state =
          LetterGuessState.PRESENT;

        // Only change state if the new state is higher priority
        // than the current state.
        if (
          LETTER_GUESS_STATE_PRIORITY[
            LetterGuessState.PRESENT
          ] >
          LETTER_GUESS_STATE_PRIORITY[
            newLetterGuessState[char] ??
              LetterGuessState.INDETERMINATE
          ]
        ) {
          newLetterGuessState[char] =
            LetterGuessState.PRESENT;
        }
      } else {
        newGridState[row][idx].state =
          LetterGuessState.ABSENT;
        // Only change state if the new state is higher priority
        // than the current state.
        if (
          LETTER_GUESS_STATE_PRIORITY[
            LetterGuessState.ABSENT
          ] >
          LETTER_GUESS_STATE_PRIORITY[
            newLetterGuessState[char] ??
              LetterGuessState.INDETERMINATE
          ]
        ) {
          newLetterGuessState[char] =
            LetterGuessState.ABSENT;
        }
      }
    });

    this.letterGuessState = newLetterGuessState;
    this.gridState = newGridState;

    // User did not manage to guess the correct answer.
    if (row + 1 === this.maxAttempts) {
      this.gameState = GameState.NO_MORE_GUESSES;
      return;
    }

    // Move to next row.
    this.cursorPositionState = [row + 1, -1];
  }

  private countLetterFreqInWord(word: string) {
    const freq = new Map();

    for (let i = 0; i < word.length; ++i) {
      if (!freq.has(word[i])) {
        freq.set(word[i], 0);
      }

      freq.set(word[i], freq.get(word[i]) + 1);
    }

    return freq;
  }

  private generateRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  private getInitialGridState(): GridState[][] {
    return Array.from({ length: this.maxAttempts }, () =>
      Array.from({ length: this.lettersPerWord }, () => ({
        char: '',
        state: LetterGuessState.INDETERMINATE,
      })),
    );
  }

  private isValidKey(key: string) {
    return (
      key === 'Enter' ||
      key === 'Backspace' ||
      (key.length === 1 &&
        key.toUpperCase().charCodeAt(0) >= A_KEYCODE &&
        key.toUpperCase().charCodeAt(0) <= Z_KEYCODE)
    );
  }

  private deleteLetter() {
    const [row, col] = this.cursorPositionState;
    const newGridState = Array.from(this.gridState);

    if (col === -1) {
      return;
    }

    newGridState[row][col].char = '';
    this.cursorPositionState = [row, col - 1];
    this.gridState = newGridState;
  }
}
