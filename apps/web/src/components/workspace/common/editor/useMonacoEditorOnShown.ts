import { useEffect } from 'react';

export default function useMonacoEditorOnShown(
  element?: HTMLDivElement | null,
  callback?: () => void,
) {
  useEffect(() => {
    if (!element) {
      return;
    }

    const resizeWatcher = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          // Shown.
          callback?.();
        }
      }
    });

    resizeWatcher.observe(element);

    return () => {
      resizeWatcher.disconnect();
    };
  }, [element, callback]);
}
