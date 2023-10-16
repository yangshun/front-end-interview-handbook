import { useState } from 'react';

export default function Cell({ isDragging, isDrawing, selectedColor }) {
  const [cellColor, setCellColor] = useState(null);

  function onCellMouseOver() {
    if (isDragging && isDrawing) {
      setCellColor(selectedColor);
    } else if (isDragging && !isDrawing) {
      setCellColor(null);
    }
  }

  function onCellClick() {
    if (isDrawing) {
      setCellColor(selectedColor);
    } else {
      setCellColor(null);
    }
  }

  const cellClassName = cellColor === null ? '' : cellColor;
  return (
    <button
      onMouseDown={onCellClick}
      onMouseOver={onCellMouseOver}
      className={`grid__cell ${cellClassName}`}
    />
  );
}
