import { useLocalStorage } from 'usehooks-ts';

export function useGuidesAutoMarkAsComplete() {
  return useLocalStorage('gfe:guides:auto-mark-as-complete', false);
}
