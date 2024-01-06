import ProjectsSidebarLayout from '~/components/projects/layout/sidebar/ProjectsSidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsSidebarLayout>{children}</ProjectsSidebarLayout>;
}
