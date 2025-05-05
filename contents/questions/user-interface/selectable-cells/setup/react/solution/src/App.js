import { useEffect, useRef, useState } from 'react';

const ROWS = 10;
const COLS = 10;

function isOverlapping(rectA, rectB) {
  return (
    rectA.left < rectB.right &&
    rectA.right > rectB.left &&
    rectA.bottom > rectB.top &&
    rectA.top < rectB.bottom
  );
}

function drawSelectionBox(
  cursor,
  dragOrigin,
  selectionBoxEl,
) {
  // Update selection box position.
  selectionBoxEl.style.left =
    Math.min(cursor.x, dragOrigin.x) + 'px';
  selectionBoxEl.style.top =
    Math.min(cursor.y, dragOrigin.y) + 'px';

  const width = Math.abs(cursor.x - dragOrigin.x);
  const height = Math.abs(cursor.y - dragOrigin.y);

  // Update selection box size.
  selectionBoxEl.style.width = `${width}px`;
  selectionBoxEl.style.height = `${height}px`;
}

function findSelectedCells(gridEl, selectionBoxEl) {
  const selectedCells = new Set();

  const cells = gridEl.querySelectorAll('.grid__cell');

  // Check if each cell overlaps with selection box.
  for (let i = 0; i < cells.length; i++) {
    if (
      isOverlapping(
        selectionBoxEl.getBoundingClientRect(),
        cells[i].getBoundingClientRect(),
      )
    ) {
      selectedCells.add(i);
    }
  }

  return selectedCells;
}

export default function App() {
  const dragAreaRef = useRef();
  const selectionBoxRef = useRef();

  const [dragOrigin, setDragOrigin] = useState(null);
  const [selectedCells, setSelectedCells] = useState(
    new Set(),
  );

  useEffect(() => {
    function onMouseDown(event) {
      // Reset selected cells.
      setSelectedCells(new Set());

      // Use mouse coordinates relative to the entire page
      // as the contents can be larger than the viewport.
      const { pageX: x, pageY: y } = event;

      // Store the drag origin so that they can be referenced
      // during in the `mousemove` event.
      setDragOrigin({ x, y });
      // Start showing the selection box.
      selectionBoxRef.current.style.display = 'inherit';
    }

    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  useEffect(() => {
    if (dragOrigin == null) {
      return;
    }

    function onMouseMove(event) {
      const selectionBoxEl = selectionBoxRef.current;
      drawSelectionBox(
        {
          x: event.pageX,
          y: event.pageY,
        },
        dragOrigin,
        selectionBoxEl,
      );

      const newSelectedCells = findSelectedCells(
        dragAreaRef.current,
        selectionBoxEl,
      );
      setSelectedCells(newSelectedCells);
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [dragOrigin]);

  useEffect(() => {
    if (dragOrigin == null) {
      return;
    }

    function onMouseUp() {
      setDragOrigin(null);
      // Reset selection box style.
      selectionBoxRef.current.style = '';
    }

    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragOrigin]);

  return (
    <>
      <div ref={dragAreaRef} className="draggable-area">
        <div ref={selectionBoxRef} className="select-box" />
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}>
          {Array.from(
            { length: ROWS * COLS },
            (_, index) => (
              <div
                className={[
                  'grid__cell',
                  selectedCells.has(index) &&
                    'grid__cell--selected',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={index}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
}
