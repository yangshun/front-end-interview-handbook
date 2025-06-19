'use client';

import Script from 'next/script';
import { useEffect } from 'react';

import { FB_PIXEL_ID, fbqGFE } from '~/lib/fbq';

import { useI18nPathname } from '~/next-i18nostic/src';

export default function MetaPixel() {
  const { pathname } = useI18nPathname();

  useEffect(() => {
    if (pathname == null) {
      return;
    }

    fbqGFE('track', 'PageView');
  }, [pathname]);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
        id="fb-pixel"
        strategy="afterInteractive"
      />
      <noscript>
        <img
          alt=""
          height="1"
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          style={{ display: 'none' }}
          width="1"
        />
      </noscript>
    </>
  );
}
