import jsCookie from 'js-cookie';
import { useEffect } from 'react';

const ALLOWLISTED_KEYS = new Set([
  'gnrs', // GFE normalized referral source.
  'fpr', // First promoter query parameter.
]);

// Aggregate a single value to track referral source, this is the order of importance.
const NORMALIZED_REFERRAL_SOURCES = [
  'gnrs',
  'fpr',
  'utm_source',
  'utm_campaign',
];

export function shouldPersistQueryParam(key: string) {
  return key.startsWith('utm_') || ALLOWLISTED_KEYS.has(key);
}

export function useWriteSearchParamsToCookie() {
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const timestamp = new Date().toISOString();

      // Process referral sources first since `gnrs` can also
      // appear below.
      NORMALIZED_REFERRAL_SOURCES.forEach((key) => {
        const value = searchParams.get(key);

        // Ignore if value already exists.
        if (jsCookie.get('gnrs') || !value) {
          return;
        }

        const payload = {
          time: timestamp,
          value,
        };

        jsCookie.set('gnrs', JSON.stringify(payload), { expires: 14 });
      });

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
