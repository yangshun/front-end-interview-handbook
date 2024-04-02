import ProjectsSidebarLayout from '~/components/projects/common/layout/sidebar/ProjectsSidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsSidebarLayout>{children}</ProjectsSidebarLayout>;
}
