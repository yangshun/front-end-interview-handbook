import { Component, Input, OnInit } from '@angular/core';
import { Color, COLORS, Mode } from './colors';

interface Cell {
  color: Color | null;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements OnInit {
  @Input()
  selectedColor!: Color;

  @Input()
  mode!: Mode;

  initialRows: number = 15;
  initialColumns: number = 15;
  grid: Cell[][] = [];
  isDragging = false;
  COLORS = COLORS;

  ngOnInit() {
    this.createGrid();
  }

  createGrid(): void {
    this.grid = Array.from(
      { length: this.initialRows },
      () =>
        Array.from({ length: this.initialColumns }, () => ({
          color: null,
        })),
    );
  }

  onMark(rowIndex: number, cellIndex: number): void {
    const newGrid = this.grid.map((row) => [...row]);
    newGrid[rowIndex][cellIndex].color =
      this.mode === 'erase' ? null : this.selectedColor;
    this.grid = newGrid;
  }

  trackByFn(index: number) {
    return index;
  }
}
