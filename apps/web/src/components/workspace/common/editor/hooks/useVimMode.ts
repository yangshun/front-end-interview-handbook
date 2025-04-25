import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const VIM_MODE_LOCAL_STORAGE_KEY = 'gfe-vim-mode-enabled';

export function useVimMode() {
  const [isVimModeEnabled, setIsVimModeEnabled] = useLocalStorage<boolean>(
    VIM_MODE_LOCAL_STORAGE_KEY,
    false,
  );

  const toggleVimMode = useCallback(() => {
    setIsVimModeEnabled((prev) => !prev);
  }, [setIsVimModeEnabled]);

  return { isVimModeEnabled, toggleVimMode };
}
