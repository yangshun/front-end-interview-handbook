import { useInView } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import gtag from '~/lib/gtag';

import type { SponsorsAdFormat } from '@prisma/client';

export default function useSponsorsAdImpressionLogging<T extends HTMLElement>(
  adFormat: SponsorsAdFormat,
  adId: string,
  adPlacement?: string | undefined,
) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref);
  const pathname = usePathname();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    gtag.event({
      action: 'sponsors.ad.impression',
      extra: {
        ad_format: adFormat,
        ad_id: adId,
        ad_placement: adPlacement,
      },
    });
    fetch(`/ads/impression`, {
      body: JSON.stringify({
        a: adId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }, [adFormat, adId, adPlacement, isInView, pathname]);

  return ref;
}
