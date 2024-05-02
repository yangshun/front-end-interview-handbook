import { GlobalBannerProjects } from '~/components/global/banners/GlobalBannerProjects';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import ProjectsNavbar from '~/components/projects/common/layout/navbar/ProjectsNavbar';
import FooterProjects from '~/components/projects/common/layout/ProjectsFooter';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsMarketingLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBannerProjects />
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
