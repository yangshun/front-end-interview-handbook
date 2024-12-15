import { useEffect, useRef } from 'react';

import logEvent from '~/logging/logEvent';

const MAXIMUM_LENGTH_FOR_LOGGING = 50;
const MAXIMUM_LENGTH_FOR_COPYING = 3000;

export default function useQuestionLogEventCopyContents<
  T extends HTMLElement,
>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    async function onCopy(event: ClipboardEvent) {
      const selection = document.getSelection();
      const selectedContents = selection?.toString();

      const copyContentsLength = selectedContents?.length ?? 0;

      if (copyContentsLength > MAXIMUM_LENGTH_FOR_COPYING) {
        event.preventDefault();
        event.clipboardData?.setData(
          'text/plain',
          selectedContents?.slice(0, MAXIMUM_LENGTH_FOR_COPYING) ?? '',
        );
      }

      logEvent('copy', {
        content: selectedContents?.slice(0, MAXIMUM_LENGTH_FOR_LOGGING),
        length: copyContentsLength,
        namespace: 'general',
      });
    }

    const domEl = ref.current;

    domEl?.addEventListener('copy', onCopy);

    return () => {
      domEl?.removeEventListener('copy', onCopy);
    };
  }, []);

  return ref;
}
