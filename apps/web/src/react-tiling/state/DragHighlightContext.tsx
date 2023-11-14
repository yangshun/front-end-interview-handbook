import { createContext } from 'react';

export type Position = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export type DragHighlightContextType = {
  draggedItemId: string | null;
  parentRect: DOMRect | null;
  position: Position | null;
  setDraggedItemId: (id: string | null) => void;
  setParent: (element: HTMLElement | null) => void;
  setPosition: (position: Position | null) => void;
};

export const DragHighlightContext = createContext<DragHighlightContextType>({
  draggedItemId: null,
  parentRect: null,
  position: null,
  setDraggedItemId: () => {},
  setParent: () => {},
  setPosition: () => {},
});
