'use client';

import type { InterviewsStudyList } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import InterviewsMarketingStudyPlansSection from '~/components/interviews/marketing/InterviewsMarketingStudyPlansSection';

const InterviewsMarketingHomePageBottom = dynamic(
  () => import('./InterviewsMarketingHomePageBottom'),
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
  // UseScrollToTop doesn't scroll to top when user come back to this page via browser back button due browser scroll restoration
  // Disable browser scroll restoration so that when user come back to this page
  // via browser back button, the page is scroll to the top again
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <>
      <div ref={loadBottomHalfMarkerRef} />
      <InterviewsMarketingStudyPlansSection />
      <InterviewsMarketingSimulateRealInterviews />
      {showBottomHalf ? (
        <InterviewsMarketingHomePageBottom
          companyGuides={companyGuides}
          questions={questions}
        />
      ) : (
        <div aria-hidden={true} className="h-screen" />
      )}
    </>
  );
}
