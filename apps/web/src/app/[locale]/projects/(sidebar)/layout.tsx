import ProjectsSidebarLayout from './ProjectsSidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsSidebarLayout>{children}</ProjectsSidebarLayout>;
}
