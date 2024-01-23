import ProjectsDashboardPage from '~/components/projects/dashboard/ProjectsDashboardPage';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <ProjectsDashboardPage>{children}</ProjectsDashboardPage>;
}
