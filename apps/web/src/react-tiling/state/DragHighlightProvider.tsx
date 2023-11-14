import { useState } from 'react';

import type { Position } from './DragHighlightContext';
import { DragHighlightContext } from './DragHighlightContext';

export default function DragHighlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parent, setParent] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  return (
    <DragHighlightContext.Provider
      value={{
        draggedItemId,
        parentRect: parent?.getBoundingClientRect() ?? null,
        position,
        setDraggedItemId,
        setParent,
        setPosition,
      }}>
      {children}
    </DragHighlightContext.Provider>
  );
}
