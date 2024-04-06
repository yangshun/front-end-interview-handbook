import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import FooterProjects from '~/components/projects/common/layout/ProjectsFooter';
import ProjectsNavbar from '~/components/projects/common/layout/ProjectsNavbar';
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
        <ProjectsNavbar />
        <div className="grow">{children}</div>
        <Section>
          <FooterProjects />
        </Section>
      </div>
    </>
  );
}
