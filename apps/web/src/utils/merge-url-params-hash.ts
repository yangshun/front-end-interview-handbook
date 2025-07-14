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

/**
 * Resolves the next URL based on the current pathname and next parameter.
 * If the current page is an auth page (like /login or /sign-up),
 * it checks for a 'next' parameter in the URL search. If not found, it
 * returns undefined. If the current page is not an auth page, it returns
 * the next URL or the current pathname.
 * @param next - The next URL to resolve.
 * @param pathname - The current pathname.
 * @param isClient - Whether the code is running on the client side.
 * @returns {string | undefined} - The resolved next URL or undefined.
 */
export function resolveNextParam({
  isClient,
  next,
  pathname,
}: {
  isClient: boolean;
  next?: string;
  pathname: string;
}): string | undefined {
  const resolvedNext = next || pathname;
  const normalizedNext = resolvedNext.replace(/\/+$/, '');
  const isAuthPage =
    normalizedNext === '/login' || normalizedNext === '/sign-up';

  if (!isAuthPage) {
    // To prevent hydration errors and add query params
    // when on the client
    return isClient
      ? mergeURLWithCurrentParamsHash(resolvedNext)
      : resolvedNext;
  }
  if (isClient) {
    // Already on login or sign-up, but check if current URL has a next param
    const searchParams = new URLSearchParams(window.location.search);
    const existingNext = searchParams.get('next');

    if (existingNext) {
      return existingNext;
    }
  }

  return undefined;
}
