import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

import gtag from '~/lib/gtag';

import type { SponsorsAdFormat } from '@prisma/client';

export default function useSponsorsAdImpressionLogging<T extends HTMLElement>(
  adFormat: SponsorsAdFormat,
  adId: string,
  adPlacement?: string | undefined,
) {
  const logged = useRef(false);
  const ref = useRef<T>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView || logged.current) {
      return;
    }

    logged.current = true;
    gtag.event({
      action: 'sponsors.ad.impression',
      extra: {
        adFormat,
        adId,
        adPlacement,
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
  }, [adFormat, adId, adPlacement, isInView]);

  return ref;
}
