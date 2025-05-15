import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import url from 'url';

export const queryParamActionKey = 'action';

type StrictObject<T extends string> = Record<T, string>;

export default function useQueryParamAction<T extends string>(
  actionName: string,
  handler: (params_?: Record<T, string>) => void,
  params?: ReadonlyArray<T>,
) {
  const hasRunRef = useRef(false);
  const pathname = usePathname();
  const { replace } = useRouter();

  const clearActionQueryParams = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);

    [queryParamActionKey, ...(params ?? [])].forEach((key) => {
      searchParams.delete(key);
    });
    replace(
      url.format({
        pathname,
        query: Object.fromEntries(searchParams),
      }),
    );
  }, [params, pathname, replace]);

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    // Read the parameter on-demand to avoid using useSearchParams.
    const searchParams = new URLSearchParams(window.location.search);
    const actionParamValue = searchParams.get(queryParamActionKey);

    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const actionQueryParams: { [key: string]: string } = {};

    params?.forEach((key) => {
      const value = searchParams.get(key);

      if (value) {
        actionQueryParams[key] = value;
      }
    });

    if (actionParamValue === actionName) {
      handler(params ? (actionQueryParams as StrictObject<T>) : undefined);
      clearActionQueryParams();
    }
  }, [actionName, clearActionQueryParams, handler, params]);

  function addQueryParamToPath(href: string, queryParams?: StrictObject<T>) {
    const urlObj = new URL(
      href,
      'https://greatfrontend.com', // The domain is not used.
    );

    urlObj.searchParams.set(queryParamActionKey, actionName);
    if (params && queryParams) {
      params.forEach((key: T) => {
        urlObj.searchParams.set(key, queryParams[key]);
      });
    }

    return url.format({
      pathname: urlObj.pathname,
      search: urlObj.search,
    });
  }

  return addQueryParamToPath;
}
