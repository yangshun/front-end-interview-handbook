import { Pipe, PipeTransform } from '@angular/core';
import { Cell } from './tic-tac-toe.component';

@Pipe({
  name: 'statusMessage',
})
export class StatusMessagePipe implements PipeTransform {
  transform(
    board: Cell[],
    xIsPlaying: boolean,
    winner: string | null,
  ): string {
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  }
}
