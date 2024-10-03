'use client';

import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const InterviewsMarketingHomePageBottomNew = dynamic(
  () => import('./InterviewsMarketingHomePageBottomNew'),
  { ssr: false },
);

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsCompanyGuide>;
}>;

export default function InterviewsMarketingHomePageBottomContainer({
  companyGuides,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <>
      <div ref={loadBottomHalfMarkerRef} />
      {showBottomHalf ? (
        <InterviewsMarketingHomePageBottomNew companyGuides={companyGuides} />
      ) : (
        <div aria-hidden={true} className="h-screen" />
      )}
    </>
  );
}
