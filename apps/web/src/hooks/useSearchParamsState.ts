import { useEffect, useRef, useState } from 'react';

/**
 * Some caveats:
 *
 * 1. This hook should not be used for components that requires SSR/SSG since window cannot be accessed on the server.
 * 2. Since URL is global state, *each* component on the page that use this hook will react to the query param. To prevent weird issues, use unique keys to prevent collisions and also as much as possible, don't render multiple hook consumers on a single page. Use different keys if necessary. If your hook consumer is a reusable component, it's best practice to make the key a component prop.
 */
export default function useSearchParamState<T extends string>(
  key: string,
  defaultValue: T,
) {
  function getSearchParam() {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const params = new URLSearchParams(window.location.search);

    return (params.get(key) || defaultValue) as T;
  }

  const getSearchParamRef = useRef(getSearchParam);

  // Parse the URL to get the initial value
  getSearchParamRef.current = getSearchParam;

  // State synced with the search param
  const [value, setValue] = useState<T>(getSearchParamRef.current);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value); // Add/update param
    } else {
      params.delete(key); // Remove param if value is empty
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState({}, '', newUrl); // Update URL without page reload
  }, [key, value]);

  // Sync state with URL on popstate (browser navigation)
  useEffect(() => {
    const onPopState = () => setValue(getSearchParamRef.current());

    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, [key]);

  return [value, setValue] as const;
}
