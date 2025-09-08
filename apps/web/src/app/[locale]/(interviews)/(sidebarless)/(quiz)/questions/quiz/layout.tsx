import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarlessQuizLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        {children}
        {/* Hide feedback widget in mobile because it block the quiz content */}
        <div className="hidden sm:block">
          <FeedbackWidget bottomClassname="bottom-12" />
        </div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
