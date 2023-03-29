import { useEffect, useRef } from 'react';
import logEvent from '~/logging/logEvent';

export default function useQuestionLogEventCopyContents<
  T extends HTMLElement,
>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    async function logCopyEvent() {
      const selection = document.getSelection();
      const selectedContents = selection?.toString();

      logEvent('copy', {
        content: selectedContents?.slice(0, 50),
        length: selectedContents?.length,
      });
    }

    const domEl = ref.current;

    domEl?.addEventListener('copy', logCopyEvent);

    return () => {
      domEl?.removeEventListener('copy', logCopyEvent);
    };
  }, []);

  return ref;
}
