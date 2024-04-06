import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import MarketingRecentPurchasesToasts from '~/components/interviews/marketing/MarketingRecentPurchasesToasts';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsMarketingLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        <div className="grow">{children}</div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
      <MarketingRecentPurchasesToasts />
    </>
  );
}
