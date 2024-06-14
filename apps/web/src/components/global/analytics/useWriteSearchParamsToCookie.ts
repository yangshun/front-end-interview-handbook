import jsCookie from 'js-cookie';
import { useEffect } from 'react';

const ALLOWLISTED_KEYS = new Set([
  'fpr', // First promoter query parameter.
]);

export function shouldPersistQueryParam(key: string) {
  return key.startsWith('utm_') || ALLOWLISTED_KEYS.has(key);
}

export function useWriteSearchParamsToCookie() {
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const timestamp = new Date().toISOString();

      searchParams.forEach((value, key) => {
        if (!shouldPersistQueryParam(key)) {
          return;
        }

        // Ignore if value already exists.
        if (jsCookie.get(key)) {
          return;
        }

        const payload = {
          time: timestamp,
          value,
        };

        jsCookie.set(key, JSON.stringify(payload), { expires: 14 });
      });
    } catch {
      // Just in case.
    }
  }, []);
}
