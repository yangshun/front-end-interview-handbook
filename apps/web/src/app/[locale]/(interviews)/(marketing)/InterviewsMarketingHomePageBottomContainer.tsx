'use client';

import type { InterviewsStudyList } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import useScrollToTop from '~/hooks/useScrollToTop';

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
  useScrollToTop([]);

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
