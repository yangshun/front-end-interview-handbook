import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { useI18nPathname } from '~/next-i18nostic/src';

type UpdateQueueItem = Record<string, ReadonlyArray<string> | string>;

export default function useFilterSearchParams() {
  const searchParams = useSearchParams();
  const { pathname } = useI18nPathname();
  const { replace } = useRouter();
  const updateQueue = useRef<Array<UpdateQueueItem>>([]);
  const shouldWaitUpdate = useRef<boolean>(false);

  const processUpdateQueue = useCallback(async () => {
    const current = new URLSearchParams(window.location.search);
    let search = '';

    for (const update of updateQueue.current) {
      Object.keys(update).map((key) => {
        const value = update[key];

        if (Array.isArray(value)) {
          if (value.length > 0) {
            current.set(key, value.join(','));
          } else {
            current.delete(key);
          }
        } else if (value) {
          current.set(key, value.toString());
        } else {
          current.delete(key);
        }
        search = current.toString();
      });

      // Cast to string
      search = current.toString();
    }

    const query = search ? `?${search}` : '';

    shouldWaitUpdate.current = false;
    updateQueue.current = [];

    const newUrl = `${pathname}${query}`;

    replace(newUrl);
  }, [pathname, replace]);

  function updateMultipleSearchParams(
    params: Record<string, ReadonlyArray<string> | string>,
  ) {
    // To handle asynchronous update of search params
    updateQueue.current = [...(updateQueue.current || []), params];
    if (shouldWaitUpdate.current) {
      return;
    }

    shouldWaitUpdate.current = true;
    setTimeout(() => {
      processUpdateQueue();
    }, 10);
  }

  function updateSearchParams(
    key: string,
    value: ReadonlyArray<string> | string,
  ) {
    // To handle asynchronous update of search params
    updateQueue.current = [...(updateQueue.current || []), { [key]: value }];
    if (shouldWaitUpdate.current) {
      return;
    }

    shouldWaitUpdate.current = true;
    setTimeout(() => {
      processUpdateQueue();
    }, 10);
  }

  function getArrayTypeSearchParams(key: string) {
    return searchParams?.get(key) ? searchParams?.get(key)?.split(',') : [];
  }

  function getStringTypeSearchParams(key: string) {
    return searchParams?.get(key) || null;
  }

  return {
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateMultipleSearchParams,
    updateSearchParams,
  };
}
