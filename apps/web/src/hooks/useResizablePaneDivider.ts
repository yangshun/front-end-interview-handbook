import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect } from 'react';
import { useCallback, useRef, useState } from 'react';

type MousePosition = Readonly<{ x: number; y: number }>;

export function useResizablePaneDivider(
  initialValue: number,
  flipped = false,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  resizeRatio = 0.5,
  resizeContainerSizeFunction?: () => number,
) {
  const [size, setSize] = useState(initialValue);
  const [resizeSession, setResizeSession] = useState(0);
  const mouseStartingPosition = useRef<MousePosition | null>(null);

  const mouseDownListener = useCallback(
    (event: MouseEvent) => {
      event.preventDefault(); // Prevent other text from being highlighted.

      if (mouseStartingPosition.current == null) {
        return;
      }

      const { x, y } = mouseStartingPosition.current;
      const delta =
        direction === 'horizontal' ? event.clientX - x : event.clientY - y;

      setSize(Math.max(flipped ? size - delta : size + delta, 0));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeSession], // We only want this callback to update per resize session so as to preserve the starting left pane width.
  );

  const removeMouseListener = useCallback(() => {
    mouseStartingPosition.current = null;
    setResizeSession((session) => session + 1);

    document.removeEventListener('mousemove', mouseDownListener);
    document.removeEventListener('mouseup', removeMouseListener);
  }, [mouseDownListener]);

  function startDrag(event: ReactMouseEvent<HTMLElement>) {
    if (mouseStartingPosition.current != null) {
      return;
    }

    mouseStartingPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    document.addEventListener('mousemove', mouseDownListener);
    document.addEventListener('mouseup', removeMouseListener);
  }

  useEffect(() => {
    function resizeListener() {
      if (resizeContainerSizeFunction == null) {
        return;
      }

      const containerSize = resizeContainerSizeFunction();

      if (containerSize == null) {
        return;
      }

      setSize(resizeRatio * containerSize);
      // Increment resize session if value is set externally.
      setResizeSession((session) => session + 1);
    }

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [resizeContainerSizeFunction, resizeRatio, setSize]);

  return {
    isDragging: mouseStartingPosition.current != null,
    setSize: (val: number) => {
      setSize(val);
      // Increment resize session if value is set externally.
      setResizeSession((session) => session + 1);
    },
    size,
    startDrag,
  };
}
