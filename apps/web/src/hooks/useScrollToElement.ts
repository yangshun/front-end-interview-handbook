import { useEffect, useRef } from 'react';

import { useI18nPathname } from '~/next-i18nostic/src';

export default function useScrollToElement<T extends HTMLElement>(
  hash: string,
  delay: number,
) {
  const elementRef = useRef<T | null>(null);
  const pathname = useI18nPathname();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    if (window.location.hash === hash && elementRef != null) {
      timer = setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: elementRef?.current?.offsetTop,
        });
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return elementRef;
}
