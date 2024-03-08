import { useEffect, useRef, useState } from 'react';

type CopyFn = (contents: string) => Promise<void>;

export default function useCopyToClipboardWithRevert(
  duration: number,
): [boolean, CopyFn] {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>();

  const onCopy: CopyFn = async (contents: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');

      return;
    }

    // Try to save to clipboard then save it in the state if worked.
    try {
      await navigator.clipboard.writeText(contents);
      setIsCopied(true);
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, duration);
    } catch (error) {
      console.error('Copy failed', error);
      setIsCopied(false);
    }
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(copyTimeout.current);
    };
  }, []);

  return [isCopied, onCopy];
}
