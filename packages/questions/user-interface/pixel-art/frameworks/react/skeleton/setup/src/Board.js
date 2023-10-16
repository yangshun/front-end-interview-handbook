import { useState } from 'react';
import Cell from './Cell';

const size = 15;

export default function Board({ selectedColor, isDrawing }) {
  const grid = Array(size).fill(Array(size).fill(null));
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        const rowClassName = `grid__row ${
          rowIndex % 2 === 0 ? 'grid__row--even' : 'grid__row--odd'
        }`;
        return (
          <div
            className={rowClassName}
            key={rowIndex}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                isDragging={isDragging}
                isDrawing={isDrawing}
                selectedColor={selectedColor}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
