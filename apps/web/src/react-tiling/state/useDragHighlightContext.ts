import { useContext } from 'react';

import { DragHighlightContext } from './DragHighlightContext';

export function useDragHighlightContext() {
  return useContext(DragHighlightContext);
}
