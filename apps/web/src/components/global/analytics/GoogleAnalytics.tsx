'use client';

import { useUser } from '@supabase/auth-helpers-react';
import Script from 'next/script';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import { useI18nPathname } from '~/next-i18nostic/src';

export default function GoogleAnalytics() {
  const { pathname } = useI18nPathname();
  const user = useUser();

  useEffect(() => {
    if (pathname == null) {
      return;
    }

    gtag.pageview(pathname);
  }, [pathname]);

  useEffect(() => {
    function beforeUnload() {
      gtag.event({
        action: `exit`,
        category: 'engagement',
        label: 'Close window',
      });
    }

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, []);

  useEffect(() => {
    if (user == null) {
      return;
    }

    gtag.config(gtag.trackingID, {
      user_id: user.id,
    });
  }, [user]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.trackingID}`}
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.trackingID}', {
              page_path: window.location.pathname,
            });
            gtag('config', 'AW-11039716901');
          `,
        }}
        id="gtag-init"
        strategy="afterInteractive"
      />
    </>
  );
}
