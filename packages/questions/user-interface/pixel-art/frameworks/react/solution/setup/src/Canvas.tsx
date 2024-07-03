import { useState } from 'react';

import Cell from './Cell';
import { Color, Mode } from './colors';

type Props = Readonly<{
  selectedColor: Color;
  initialRows?: number;
  initialColumns?: number;
  mode: Mode;
}>;

export default function Canvas({
  selectedColor,
  mode,
  initialRows = 15,
  initialColumns = 15,
}: Props) {
  const [grid, setGrid] = useState<(Color | null)[][]>(
    Array.from({ length: initialRows }, () =>
      Array(initialColumns).fill(null),
    ),
  );
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="grid"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}>
      {grid.map((row, rowIndex) => (
        <div
          className={[
            'grid__row',
            rowIndex % 2 === 0
              ? 'grid__row--even'
              : 'grid__row--odd',
          ].join(' ')}
          key={rowIndex}>
          {row.map((cellColor, cellIndex) => (
            <Cell
              key={cellIndex}
              color={cellColor}
              isDragging={isDragging}
              onMark={() => {
                const newGrid = grid.map((row) => [...row]);
                newGrid[rowIndex][cellIndex] =
                  mode === 'erase' ? null : selectedColor;
                setGrid(newGrid);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
