import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsNavbarEnd from '~/components/interviews/common/InterviewsNavbarEnd';
import InterviewsSidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
  subnav: React.ReactNode;
}>;

export default function SidebarExpandedLayout({ children, subnav }: Props) {
  return (
    <div className="flex">
      <InterviewsSidebarContainer />
      <div className="relative w-0 grow">
        <InterviewsNavbarEnd />
        {subnav}
        <Container className="py-8 xl:py-12" width="app">
          {children}
        </Container>
      </div>
      <FeedbackWidget />
    </div>
  );
}
