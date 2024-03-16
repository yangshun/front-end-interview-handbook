import ProjectsProfileProgressTabs from '~/components/projects/profile/progress/ProjectsProfileProgressTabs';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  return (
    <>
      <ProjectsProfileProgressTabs baseUrl={`/projects/u/${params.username}`} />
      {children}
    </>
  );
}
