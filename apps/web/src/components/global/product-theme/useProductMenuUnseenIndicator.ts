import { useIsClient, useLocalStorage } from 'usehooks-ts';

// Increment number whenever the indicator is to be shown again.
const indicatorKey = 'gfe:product-menu-unseen-indicator:0';

// For now this should only be dismissed when the user
// navigates to /projects at least once.
export function useProductMenuUnseenIndicator() {
  const isClient = useIsClient();

  const [value, setValue] = useLocalStorage(indicatorKey, true);

  // Always return false on the server to prevent SSR mismatch.
  return [isClient ? value : false, setValue] as const;
}
