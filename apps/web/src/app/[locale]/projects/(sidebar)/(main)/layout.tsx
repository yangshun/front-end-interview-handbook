import ProjectsMainLayout from '~/components/projects/common/layout/ProjectsMainLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsMainLayout>{children}</ProjectsMainLayout>;
}
