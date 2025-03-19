import { useCallback } from 'react';

export function useAnchorClickHandler(onAnchorClick: () => void) {
  const handleAnchorItemClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the clicked element or its parent is an anchor
      if (target.tagName === 'A' || target.closest('a')) {
        onAnchorClick();
      }
    },
    [onAnchorClick],
  );

  return { handleAnchorItemClick };
}
