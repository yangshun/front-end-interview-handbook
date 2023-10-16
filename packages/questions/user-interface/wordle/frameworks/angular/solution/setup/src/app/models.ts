export enum LetterGuessState {
  INDETERMINATE = 'INDETERMINATE',
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
  CORRECT = 'CORRECT',
}

export enum GameState {
  IN_PROGRESS = 'IN_PROGRESS',
  GUESSED_CORRECTLY = 'GUESSED_CORRECTLY',
  NO_MORE_GUESSES = 'NO_MORE_GUESSES',
}

export const WORDS: string[] = [
  'APPLE',
  'BEAST',
  'FAINT',
  'FEAST',
  'FRUIT',
  'GAMES',
  'PAINT',
  'PASTE',
  'TOWER',
  'REACT',
];

export const A_KEYCODE = 65;
export const Z_KEYCODE = 90;

export const INITIAL_CURSOR_POSITION = [0, -1];

export interface GridState {
  char: string;
  state: LetterGuessState;
}

export const LETTER_GUESS_STATE_PRIORITY: {
  [key: string]: number;
} = Object.freeze({
  INDETERMINATE: 1,
  ABSENT: 2,
  PRESENT: 3,
  CORRECT: 4,
});
