import { useLocalStorage } from 'usehooks-ts';

export function useAuthSignedInBefore() {
  return useLocalStorage('gfe:auth:signed-in-before', false);
}
