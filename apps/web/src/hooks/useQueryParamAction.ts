import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import url from 'url';

export const queryParamActionKey = 'action';

export default function useQueryParamAction(
  actionName: string,
  handler: () => void,
) {
  const hasRunRef = useRef(false);
  const pathname = usePathname();
  const { replace } = useRouter();

  const clearActionQueryParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    params.delete(queryParamActionKey);
    replace(
      url.format({
        pathname,
        query: Object.fromEntries(params),
      }),
    );
  }, [pathname, replace]);

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    // Read the parameter on-demand to avoid using useSearchParams.
    const params = new URLSearchParams(window.location.search);
    const actionParamValue = params.get(queryParamActionKey);

    if (actionParamValue === actionName) {
      handler();
      clearActionQueryParams();
    }
  }, [actionName, clearActionQueryParams, handler]);

  function addQueryParamToPath(href: string) {
    const urlObj = new URL(
      href,
      'https://greatfrontend.com', // The domain is not used.
    );

    urlObj.searchParams.set(queryParamActionKey, actionName);

    return url.format({
      pathname: urlObj.pathname,
      search: urlObj.search,
    });
  }

  return addQueryParamToPath;
}
