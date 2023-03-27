import QuestionsSidebar from '~/components/questions/common/QuestionsSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="flex">
      <aside
        className="sticky z-20 hidden w-24 shrink-0 overflow-visible md:block"
        style={{
          height: `calc(100dvh - var(--navbar-height))`,
          top: `var(--navbar-height)`,
        }}>
        <QuestionsSidebar />
      </aside>
      <div className="relative w-0 grow">{children}</div>
    </div>
  );
}
