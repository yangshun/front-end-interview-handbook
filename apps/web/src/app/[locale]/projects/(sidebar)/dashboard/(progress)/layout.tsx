import ProjectsProfileProgressTabs from '~/components/projects/profile/progress/ProjectsProfileProgressTabs';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return (
    <>
      <ProjectsProfileProgressTabs baseUrl="/projects/dashboard" />
      {children}
    </>
  );
}
