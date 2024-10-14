'use client';

import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

const InterviewsMarketingHomePageBottomNew = dynamic(
  () => import('./InterviewsMarketingHomePageBottomNew'),
  { ssr: false },
);

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsCompanyGuide>;
  questions: {
    algo: ReadonlyArray<QuestionMetadata>;
    js: ReadonlyArray<QuestionMetadata>;
    quiz: ReadonlyArray<QuestionMetadata>;
    'system-design': ReadonlyArray<QuestionMetadata>;
    ui: ReadonlyArray<QuestionMetadata>;
  };
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
