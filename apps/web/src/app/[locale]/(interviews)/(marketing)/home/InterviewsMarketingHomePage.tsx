'use client';

import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import InterviewsMarketingYangshunForeword from '~/components/interviews/marketing/InterviewsMarketingYangshunForeword';

export default function InterviewsMarketingHomePage() {
  return (
    <main>
      <InterviewsMarketingYangshunForeword />
      <InterviewsMarketingOffersDontLieSection />
      <InterviewsMarketingPrepResourcesByBigTechEngineers />
    </main>
  );
}
