import { useMemo, useState } from 'react';

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

  const value = useMemo(
    () => ({
      draggedItemId,
      parentRect: parent?.getBoundingClientRect() ?? null,
      position,
      setDraggedItemId,
      setParent,
      setPosition,
    }),
    // Implement granular dependency tracking of the position fields
    // to prevent unnecessary re-creation of context objects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      draggedItemId,
      parent,
      position?.height,
      position?.left,
      position?.top,
      position?.width,
    ],
  );

  return (
    <DragHighlightContext.Provider value={value}>
      {children}
    </DragHighlightContext.Provider>
  );
}
