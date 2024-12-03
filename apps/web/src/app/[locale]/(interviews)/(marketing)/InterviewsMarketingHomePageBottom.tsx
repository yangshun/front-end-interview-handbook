import type { InterviewsStudyList } from 'contentlayer/generated';
import { useMediaQuery } from 'usehooks-ts';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsMarketingCompaniesSection from '~/components/interviews/marketing/InterviewsMarketingCompaniesSection';
import InterviewsMarketingContactSection from '~/components/interviews/marketing/InterviewsMarketingContactSection';
import InterviewsMarketingDreamJobSection from '~/components/interviews/marketing/InterviewsMarketingDreamJobSection';
import InterviewsMarketingFAQSection from '~/components/interviews/marketing/InterviewsMarketingFAQSection';
import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingPracticeQuestionBankSection from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import InterviewsMarketingSolutionsByExInterviewersSection from '~/components/interviews/marketing/InterviewsMarketingSolutionsByExInterviewersSection';
import InterviewsMarketingTestCodeSection from '~/components/interviews/marketing/InterviewsMarketingTestCodeSection';
import InterviewsMarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialsSection';
import { useInterviewsMarketingTestimonials } from '~/components/interviews/marketing/testimonials/useInterviewsMarketingTestimonials';
import InterviewsPricingSectionLocalizedContainer from '~/components/interviews/purchase/InterviewsPricingSectionLocalizedContainer';
import MarketingCommunitySection from '~/components/marketing/contact/MarketingCommunitySection';

type Props = Readonly<{
  companyGuides: ReadonlyArray<InterviewsStudyList>;
  questions: QuestionBankDataType;
}>;

export default function InterviewsMarketingHomePageBottom({
  companyGuides,
  questions,
}: Props) {
  const { userProfile } = useUserProfile();
  const testimonials = useInterviewsMarketingTestimonials();
  const isMobileAndBelow = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <InterviewsMarketingPracticeQuestionBankSection questions={questions} />
      <InterviewsMarketingSolutionsByExInterviewersSection />
      <InterviewsMarketingTestCodeSection />
      <InterviewsMarketingCompaniesSection companyGuides={companyGuides} />
      {!(
        userProfile?.isInterviewsPremium && userProfile?.plan === 'lifetime'
      ) && <InterviewsPricingSectionLocalizedContainer />}
      <InterviewsMarketingTestimonialsSection
        testimonials={
          isMobileAndBelow ? testimonials.slice(0, 8) : testimonials
        }
        width="marketing"
      />
      <InterviewsMarketingFAQSection />
      <MarketingCommunitySection />
      <InterviewsMarketingContactSection />
      <InterviewsMarketingDreamJobSection />
    </>
  );
}
