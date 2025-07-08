import jsCookie from 'js-cookie';
import { useEffect } from 'react';

const ALLOWLISTED_KEYS = new Set([
  'gnrs', // GFE normalized referral source
  'fpr', // First promoter query parameter
]);

// Aggregate a single value to track referral source, this is the order of importance
const NORMALIZED_REFERRAL_SOURCES = [
  'gnrs',
  'fpr',
  'utm_source',
  'utm_campaign',
];

export function shouldPersistQueryParam(key: string) {
  return key.startsWith('utm_') || ALLOWLISTED_KEYS.has(key);
}

export function getNormalizedReferralSource(
  searchParams: URLSearchParams,
): string | null {
  return NORMALIZED_REFERRAL_SOURCES.reduce(
    (value: string | null, currKey) => value || searchParams.get(currKey),
    null,
  );
}

export function useWriteSearchParamsToCookie() {
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const timestamp = new Date().toISOString();

      // Process referral sources first since
      // `gnrs` can also appear below
      // Log as the first-encountered normalized referral source
      const gnrsValue = getNormalizedReferralSource(searchParams);

      if (gnrsValue) {
        // Ignore if value already exists
        if (!jsCookie.get('gnrs')) {
          jsCookie.set(
            'gnrs',
            JSON.stringify({
              time: timestamp,
              value: gnrsValue,
            }),
            { expires: 365 },
          );
        }

        // Overwrite latest value
        jsCookie.set(
          'gnrs_latest',
          JSON.stringify({
            time: timestamp,
            value: gnrsValue,
          }),
          { expires: 365 },
        );
      }

      searchParams.forEach((value, key) => {
        if (!shouldPersistQueryParam(key)) {
          return;
        }

        // Ignore if value already exists.
        if (jsCookie.get(key)) {
          return;
        }

        jsCookie.set(
          key,
          JSON.stringify({
            time: timestamp,
            value,
          }),
          { expires: 365 },
        );
      });
    } catch {
      // Just in case.
    }
  }, []);
}
