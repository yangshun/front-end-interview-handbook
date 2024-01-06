import ProjectsMainLayout from '~/components/projects/common/ProjectsMainLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsMainLayout>{children}</ProjectsMainLayout>;
}
