import SidebarContainer from '~/components/interviews/common/InterviewsSidebarContainer';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarCollapsedLayout({ children }: Props) {
  return (
    <div className="flex">
      <SidebarContainer initialCollapsed={true} />
      <div className="relative w-0 grow">{children}</div>
    </div>
  );
}
