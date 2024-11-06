import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsNavbarEnd from '~/components/interviews/common/InterviewsNavbarEnd';
import InterviewsSidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarExpandedLayout({ children }: Props) {
  return (
    <div className="flex">
      <InterviewsSidebarContainer />
      <div className="relative w-0 grow">
        <InterviewsNavbarEnd />
        <Container className="py-8 xl:py-12" width="app">
          {children}
        </Container>
      </div>
      <FeedbackWidget />
    </div>
  );
}
