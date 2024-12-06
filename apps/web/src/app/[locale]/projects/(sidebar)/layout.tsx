import { GlobalBannerProjects } from '~/components/global/banners/GlobalBannerProjects';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import ProjectsNavbar from '~/components/projects/common/layout/navbar/ProjectsNavbar';
import ProjectsSidebarContainer from '~/components/projects/common/layout/sidebar/ProjectsSidebarContainer';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsSidebarLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget />
      <GlobalBannerProjects />
      <div className="flex min-h-screen flex-col">
        <ProjectsNavbar hideOnDesktop={true} />
        <div className="flex">
          <ProjectsSidebarContainer />
          <div className="w-full lg:w-0 lg:grow">
            <Container className="py-4 md:py-6 lg:py-8 xl:py-16" width="app">
              {children}
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
