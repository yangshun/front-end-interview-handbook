import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarlessGuidesLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        {children}
        <FeedbackWidget bottomClassname="bottom-12" />
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
