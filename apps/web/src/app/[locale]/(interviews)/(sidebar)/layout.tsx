import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import InterviewsNavbarEnd from '~/components/interviews/common/InterviewsNavbarEnd';
import InterviewsSidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar hideOnDesktop={true} />
        <div className="grow">
          <div className="flex">
            <InterviewsSidebarContainer />
            <div className="relative w-0 grow">
              <InterviewsNavbarEnd />
              {children}
            </div>
            <FeedbackWidget />
          </div>
        </div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
