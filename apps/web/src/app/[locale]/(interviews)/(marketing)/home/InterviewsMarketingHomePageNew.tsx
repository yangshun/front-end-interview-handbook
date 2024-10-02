import InterviewsMarketingHeroNew from '~/components/interviews/marketing/InterviewsMarketingHeroNew';
import InterviewsMarketingOffersDontLieSection from '~/components/interviews/marketing/InterviewsMarketingOffersDontLieSection';
import InterviewsMarketingPrepResourcesByBigTechEngineers from '~/components/interviews/marketing/InterviewsMarketingPrepResourcesByBigTechEngineers';
import InterviewsMarketingSimulateRealInterviews from '~/components/interviews/marketing/InterviewsMarketingSimulateRealInterviews';
import InterviewsMarketingYangshunForeword from '~/components/interviews/marketing/InterviewsMarketingYangshunForeword';

export default function InterviewsMarketingHomePageNew() {
  return (
    <main>
      <InterviewsMarketingHeroNew />
      <InterviewsMarketingYangshunForeword />
      <InterviewsMarketingOffersDontLieSection />
      <InterviewsMarketingPrepResourcesByBigTechEngineers />
      <InterviewsMarketingSimulateRealInterviews />
    </main>
  );
}
