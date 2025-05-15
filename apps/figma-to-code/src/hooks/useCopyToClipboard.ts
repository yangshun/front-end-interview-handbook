import { emit } from '@create-figma-plugin/utilities';
import { useCallback, useState } from 'preact/hooks';

import type { CopyHandler } from '../utils/types';

type CopiedValue = string | null;

type CopyFn = (text: string) => boolean;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback((text) => {
    // Navigator.clipboard is not available in the <iframe>,
    // have to use document.execCommand()...
    const textArea = document.createElement('textarea');

    textArea.value = text;
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    let success = true;

    // Try to save to clipboard then save it in the state if worked.
    try {
      document.execCommand('copy');
      setCopiedText(text);
    } catch (error) {
      success = false;
      console.warn('Copy failed', error);
      setCopiedText(null);
    }

    emit<CopyHandler>('COPY_TO_CLIPBOARD', success);
    document.body.removeChild(textArea);

    return success;
  }, []);

  return [copiedText, copy];
}
