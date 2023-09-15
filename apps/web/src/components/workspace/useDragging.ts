import { useCallback, useEffect, useRef, useState } from 'react';

type Coordinate = Readonly<{ x: number; y: number }>;

export type DraggingEvent = Readonly<{ clientX: number; clientY: number }>;

export default function useDragging(
  canDrag?: (event: DraggingEvent) => boolean,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Coordinate>({
    x: 0,
    y: 0,
  });
  const mouseStartingPosition = useRef<Coordinate | null>(null);
  const barOffset = useRef<Coordinate>({ x: 0, y: 0 });

  const onMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault(); // Prevent other text from being highlighted.

      if (mouseStartingPosition.current == null) {
        return;
      }

      if (canDrag && !canDrag?.(event)) {
        return;
      }

      const { x, y } = mouseStartingPosition.current;
      const deltaX = event.clientX - x;
      const deltaY = event.clientY - y;

      setDragOffset({
        x: barOffset.current.x + deltaX,
        y: barOffset.current.y + deltaY,
      });
    },
    [canDrag],
  );

  const stopDraggingAndBlur = useCallback(() => {
    setIsDragging(false);
    barOffset.current = dragOffset;
    mouseStartingPosition.current = null;
  }, [dragOffset]);

  const startDragging = useCallback((event: DraggingEvent) => {
    setIsDragging(true);
    mouseStartingPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onMove);
    document.addEventListener('contextmenu', stopDraggingAndBlur);
    window.addEventListener('mouseup', stopDraggingAndBlur);
    window.addEventListener('touchend', stopDraggingAndBlur);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onMove);
      document.removeEventListener('contextmenu', stopDraggingAndBlur);
      window.removeEventListener('mouseup', stopDraggingAndBlur);
      window.removeEventListener('touchend', stopDraggingAndBlur);
    };
  }, [isDragging, onMove, stopDraggingAndBlur]);

  return {
    dragOffset,
    isDragging,
    startDragging,
  };
}
