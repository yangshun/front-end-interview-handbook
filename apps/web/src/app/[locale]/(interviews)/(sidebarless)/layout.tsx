import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarLessLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        <div className="grow">
          <div className="flex">
            <div className="relative w-0 grow">{children}</div>
            <FeedbackWidget bottomClassname="bottom-12" />
          </div>
        </div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
