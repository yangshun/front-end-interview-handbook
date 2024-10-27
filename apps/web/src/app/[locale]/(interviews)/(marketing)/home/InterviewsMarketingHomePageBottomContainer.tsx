'use client';

import type { InterviewsStudyList } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import InterviewsMarketingPlansSection from '~/components/interviews/marketing/InterviewsMarketingPlansSection';
import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';

const InterviewsMarketingHomePageBottomNew = dynamic(
  () => import('./InterviewsMarketingHomePageBottomNew'),
  { ssr: false },
);

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsStudyList>;
  questions: QuestionBankDataType;
}>;

export default function InterviewsMarketingHomePageBottomContainer({
  companyGuides,
  questions,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <>
      <div ref={loadBottomHalfMarkerRef} />
      <InterviewsMarketingPlansSection />
      <InterviewsMarketingSimulateRealInterviews />
      {showBottomHalf ? (
        <InterviewsMarketingHomePageBottomNew
          companyGuides={companyGuides}
          questions={questions}
        />
      ) : (
        <div aria-hidden={true} className="h-screen" />
      )}
    </>
  );
}
