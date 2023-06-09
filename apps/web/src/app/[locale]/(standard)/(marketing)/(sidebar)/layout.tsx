import SidebarContainer from './SidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="flex">
      <SidebarContainer />
      <div className="relative w-0 grow">{children}</div>
    </div>
  );
}
