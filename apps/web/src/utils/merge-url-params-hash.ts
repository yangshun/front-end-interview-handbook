import url from 'url';

/**
 * Merges the given URL with the current window location's search parameters and hash.
 * This is useful for ensuring that links maintain the current search state and hash.
 *
 * @param {string} href - The URL to merge with the current window location.
 * @returns {string} - The merged URL.
 */
export function mergeURLWithCurrentParamsHash(href: string) {
  if (typeof window === 'undefined') {
    return href;
  }

  const urlObj = new URL(
    href,
    'https://greatfrontend.com', // The domain is not used.
  );

  // Merge with search params
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    urlObj.searchParams.set(key, value);
  });

  // Merge with search params
  urlObj.hash ||= window.location.hash;

  return url.format({
    hash: urlObj.hash,
    pathname: urlObj.pathname,
    search: urlObj.search,
  });
}
