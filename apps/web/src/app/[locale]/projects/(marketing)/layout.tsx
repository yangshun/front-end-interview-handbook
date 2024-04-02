import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import FooterProjects from '~/components/projects/common/layout/ProjectsFooter';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsMarketingLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        <div className="grow">{children}</div>
        <Section>
          <FooterProjects />
        </Section>
      </div>
    </>
  );
}
