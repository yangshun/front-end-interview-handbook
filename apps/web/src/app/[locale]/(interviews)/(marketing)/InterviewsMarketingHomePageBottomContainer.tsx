'use client';

import type { InterviewsStudyList } from 'contentlayer/generated';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsMarketingCompaniesSection from '~/components/interviews/marketing/InterviewsMarketingCompaniesSection';
import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingPracticeQuestionBankSection from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import InterviewsMarketingSolutionsByExInterviewersSection from '~/components/interviews/marketing/InterviewsMarketingSolutionsByExInterviewersSection';
import InterviewsMarketingStudyPlansSection from '~/components/interviews/marketing/InterviewsMarketingStudyPlansSection';
import InterviewsMarketingTestCodeSection from '~/components/interviews/marketing/InterviewsMarketingTestCodeSection';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';

const InterviewsMarketingHomePageBottom = dynamic(
  () => {
    loadedBottom = true;

    return import('./InterviewsMarketingHomePageBottom');
  },
  { ssr: false },
);

type Props = Readonly<{
  companyGuides: ReadonlyArray<
    InterviewsStudyList & Readonly<{ questionCount: number }>
  >;
  questions: QuestionBankDataType;
}>;

// So that loaded state is persisted across navigations.
let loadedBottom = false;

export default function InterviewsMarketingHomePageBottomContainer({
  companyGuides,
  questions,
}: Props) {
  const { userProfile } = useUserProfile();

  const loadBottomHalfMarkerEarlyRef = useRef(null);
  const showBottomHalfEarly = useInView(loadBottomHalfMarkerEarlyRef, {
    amount: 'some',
    once: true,
  });
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <>
      <div ref={loadBottomHalfMarkerEarlyRef} />
      <InterviewsMarketingStudyPlansSection />
      <InterviewsMarketingSimulateRealInterviews />
      <InterviewsMarketingPracticeQuestionBankSection questions={questions} />
      <InterviewsMarketingSolutionsByExInterviewersSection />
      <InterviewsMarketingTestCodeSection />
      <InterviewsMarketingCompaniesSection companyGuides={companyGuides} />
      {!(
        userProfile?.isInterviewsPremium && userProfile?.plan === 'lifetime'
      ) && <InterviewsPricingSectionLocalizedContainer />}
      <div ref={loadBottomHalfMarkerRef} />
      {loadedBottom || showBottomHalfEarly || showBottomHalf ? (
        <InterviewsMarketingHomePageBottom />
      ) : (
        <div aria-hidden={true} className="h-screen" />
      )}
    </>
  );
}
