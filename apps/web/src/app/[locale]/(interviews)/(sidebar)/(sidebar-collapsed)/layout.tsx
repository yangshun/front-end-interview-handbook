import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import InterviewsSidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarCollapsedLayout({ children }: Props) {
  return (
    <div className="flex">
      <InterviewsSidebarContainer
        initialCollapsed={true}
        showNewSidebar={true}
      />
      <div className="relative w-0 grow">{children}</div>
      <FeedbackWidget bottomClassname="bottom-12" />
    </div>
  );
}
