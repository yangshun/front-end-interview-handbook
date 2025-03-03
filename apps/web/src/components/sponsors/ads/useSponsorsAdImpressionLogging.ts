import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function useSponsorsAdImpressionLogging<T extends HTMLElement>(
  adId: string,
) {
  const logged = useRef(false);
  const ref = useRef<T>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView || logged.current) {
      return;
    }

    logged.current = true;
    fetch(`/ads/impression`, {
      body: JSON.stringify({
        a: adId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }, [adId, isInView]);

  return ref;
}
