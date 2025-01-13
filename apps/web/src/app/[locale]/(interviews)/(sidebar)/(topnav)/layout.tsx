import InterviewsNavbarEnd from '~/components/interviews/common/InterviewsNavbarEnd';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsSidebarTopNavLayout({ children }: Props) {
  return (
    <div className="relative w-0 grow">
      <InterviewsNavbarEnd />
      {children}
    </div>
  );
}
