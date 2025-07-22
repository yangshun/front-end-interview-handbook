import { useCallback, useEffect } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

const defaultBundlerURL = 'https://bundler.greatfrontend.io';
const fallbackBundlerURL = 'https://bundler.greatfrontend.com';

export function useSandpackBundlerURL(instance: string) {
  const [url, setUrl] = useGreatStorageLocal(
    'workspace:bundler-url', // Change the key if you want to reset the URL in local storage
    defaultBundlerURL,
    {
      ttl: 24 * 60 * 60 * 7, // 7 days
    },
  );

  const changeToFallbackUrl = useCallback(
    (reason: string) => {
      setUrl(fallbackBundlerURL);
      logEvent('sandpack.bundler_fallback', {
        instance,
        namespace: 'workspace',
        online: navigator.onLine,
        reason,
        url: fallbackBundlerURL,
      });
    },
    [instance, setUrl],
  );

  const pingBundlerURL = useCallback(async () => {
    try {
      const response = await fetch(new URL('version.txt', url).toString());

      await response.text();
      // Do nothing
    } catch (error: unknown) {
      const newUrl = fallbackBundlerURL;

      // Change to fallback URL if default URL fails
      setUrl(newUrl);
      logEvent('sandpack.bundler_fallback', {
        error: getErrorMessage(error),
        instance,
        namespace: 'workspace',
        online: navigator.onLine,
        reason: 'blocked',
        stack: error instanceof Error ? error.stack : null,
        url,
      });

      try {
        const response = await fetch(new URL('version.txt', newUrl).toString());

        await response.text();
        logEvent('sandpack.bundler_fallback.success', {
          instance,
          namespace: 'workspace',
          online: navigator.onLine,
          url: newUrl,
        });
      } catch (error_: unknown) {
        logEvent('sandpack.bundler_fallback.fail', {
          error: getErrorMessage(error_),
          instance,
          namespace: 'workspace',
          online: navigator.onLine,
          stack: error_ instanceof Error ? error_.stack : null,
          url: newUrl,
        });
      }
    }
  }, [instance, setUrl, url]);

  useEffect(() => {
    if (url !== defaultBundlerURL) {
      return;
    }

    pingBundlerURL();
  }, [url, pingBundlerURL]);

  return [url, changeToFallbackUrl] as const;
}
