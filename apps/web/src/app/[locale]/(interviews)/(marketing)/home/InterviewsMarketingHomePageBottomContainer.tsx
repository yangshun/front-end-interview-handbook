'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const InterviewsMarketingHomePageBottomNew = dynamic(
  () => import('./InterviewsMarketingHomePageBottomNew'),
  { ssr: false },
);

export default function InterviewsMarketingHomePageBottomContainer() {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <>
      <div ref={loadBottomHalfMarkerRef} />
      {showBottomHalf ? (
        <InterviewsMarketingHomePageBottomNew />
      ) : (
        <div aria-hidden={true} className="h-screen" />
      )}
    </>
  );
}
